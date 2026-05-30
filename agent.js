const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
const { jsonrepair } = require("jsonrepair");
const { selectPrinciples, selectInterpretations, detectConcepts } = require("./selector");
const { detectUserDhammaLevel, getExposureLevel } = require("./adaptive_response");

const client = new Anthropic();

const modelRegistry = JSON.parse(fs.readFileSync(path.join(__dirname, "data/model_registry.json"), "utf8"));
const engineRules   = JSON.parse(fs.readFileSync(path.join(__dirname, "data/engine_rules.json"), "utf8"));

const EVAL_MODE = process.env.EVAL_MODE === "true";
const DEV_MODE = process.env.DEV_MODE === "true";
const DEFAULT_PROVIDER = process.env.DEFAULT_PROVIDER || "claude_haiku";
const THAILLM_API_KEY = process.env.THAILLM_API_KEY || "";
const THAILLM_BASE_URL = process.env.THAILLM_BASE_URL || "";
const THAILLM_MODEL = process.env.THAILLM_MODEL || "";

function getModel(userTier) {
  const key = userTier === "supporter" ? "sonnet" : "haiku";
  return modelRegistry[key]?.model || "claude-haiku-4-5-20251001";
}

function getMaxTokens(userTier) {
  const key = userTier === "supporter" ? "sonnet" : "haiku";
  return modelRegistry[key]?.max_tokens || 600;
}

function resolveProvider(requestedProvider, userTier) {
  if (DEV_MODE && requestedProvider && modelRegistry[requestedProvider]) {
    return requestedProvider;
  }
  return userTier === "supporter" ? "claude_sonnet" : DEFAULT_PROVIDER;
}

function getProviderConfig(providerKey) {
  const cfg = modelRegistry[providerKey] || modelRegistry["claude_haiku"];
  const model = cfg.model === "env:THAILLM_MODEL" ? THAILLM_MODEL : cfg.model;
  return { provider: cfg.provider, model, max_tokens: cfg.max_tokens };
}

async function callWithProvider(providerKey, { model, maxTokens, systemPrompt, userMessage }) {
  const cfg = getProviderConfig(providerKey);
  const t0 = Date.now();

  if (cfg.provider === "thaillm") {
    if (!THAILLM_API_KEY || !THAILLM_BASE_URL || !THAILLM_MODEL) {
      throw new Error("ThaiLLM not configured — set THAILLM_API_KEY, THAILLM_BASE_URL, THAILLM_MODEL");
    }
    const effectiveMaxTokens = Number(process.env.THAILLM_MAX_TOKENS) || maxTokens;
    const thaiSystemPrompt = systemPrompt + "\n\nReturn ONLY valid JSON. No <think>, no markdown, no explanations outside JSON.";
    const res = await fetch(`${THAILLM_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${THAILLM_API_KEY}` },
      body: JSON.stringify({
        model: cfg.model,
        max_tokens: effectiveMaxTokens,
        messages: [{ role: "system", content: thaiSystemPrompt }, { role: "user", content: userMessage }],
      }),
    });
    if (!res.ok) throw new Error(`ThaiLLM HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    const usage = data.usage || {};
    return {
      text,
      tokenUsage: { input: usage.prompt_tokens || 0, output: usage.completion_tokens || 0 },
      latency_ms: Date.now() - t0,
      provider_used: "thaillm",
      model_used: cfg.model,
    };
  }

  // Anthropic
  const response = await client.messages.create({
    model: model || cfg.model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });
  return {
    text: response.content[0].text,
    tokenUsage: { input: response.usage.input_tokens, output: response.usage.output_tokens },
    latency_ms: Date.now() - t0,
    provider_used: providerKey,
    model_used: model || cfg.model,
  };
}

// In-memory response cache
const responseCache = new Map();
const CACHE_TTL = 30 * 60 * 1000;

function makeCacheKey(optionA, optionB, context, principleHashes, model) {
  const input = [optionA, optionB, context].map((s) => s.trim().toLowerCase()).join("|");
  const principles = [...principleHashes].sort().join(",");
  return `${model}::${principles}::${input}`;
}

function pruneCache() {
  const now = Date.now();
  for (const [k, v] of responseCache) {
    if (now - v.ts > CACHE_TTL) responseCache.delete(k);
  }
}
setInterval(pruneCache, 10 * 60 * 1000);

function loadExamples() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/reasoning_examples.json"), "utf8")).examples;
}

function detectLanguage(text) {
  return /[฀-๿]/.test(text) ? "th" : "en";
}

function buildFewShotExamples(examples) {
  return examples
    .slice(0, 3)
    .map(
      (e) =>
        `Example — ${e.title}:
Question: ${e.question}
Signals: ${e.signals.join(", ")}
Principles: ${e.expected_principles.join(", ")}
Reasoning:
  Intention: ${e.reasoning_pattern.intention}
  Harm: ${e.reasoning_pattern.harm}
  Trade-offs: ${e.reasoning_pattern.tradeoffs}
Recommendation: ${e.reasoning_pattern.recommendation}`
    )
    .join("\n\n---\n\n");
}

// 4 compressed base rules (per doc: lower token target)
const BASE_RULES = `BASE RULES:
1. Think carefully; separate facts from assumptions.
2. Avoid harm, deception, exploitation, and reckless action.
3. Do not claim certainty without evidence.
4. Consider foreseeable consequences.`;

function formatPrincipleCompact(p) {
  return `- [id:${p.id}] ${p.name_en || p.name}: ${p.behavior_instruction || ""}`;
}

function buildSystemPrompt(selectedPrinciples, interpretations, lang, fewShot, riskFlags) {
  const langInstruction =
    lang === "th"
      ? `LANGUAGE: The user wrote in Thai. Respond entirely in Thai (ภาษาไทย). All JSON string values must be in Thai. Keep JSON keys in English.`
      : `LANGUAGE: Respond in English.`;

  const principleInjections =
    selectedPrinciples.length > 0
      ? selectedPrinciples.map(formatPrincipleCompact).join("\n")
      : "None selected — rely on base rules.";

  const interpretationBlock =
    interpretations.length > 0
      ? `\nOPTIONAL PERSPECTIVES (phrase as "One perspective is..." or "Another way to see this is..."):
${interpretations.map((i) => `- "${i.text}": ${i.meaning}`).join("\n")}`
      : "";

  const sycophancyGuard = riskFlags?.sycophancy_risk
    ? `\nSYCOPHANCY GUARD: Do not simply agree. Respectfully challenge harmful or self-serving assumptions.`
    : "";

  const hallucinationGuard = riskFlags?.hallucination_risk || riskFlags?.overconfidence_risk
    ? `\nHALLUCINATION GUARD: Do not make unsupported factual claims. State uncertainty clearly.`
    : "";

  const fewShotBlock = fewShot ? `\nREASONING EXAMPLES:\n${fewShot}` : "";

  const maxPerspective = engineRules.output.max_perspective_lines;
  const maxRecommendation = engineRules.output.max_recommendation_lines;

  return `You are a Dhamma AI moral reasoning assistant. Help humans think through decisions with clarity — illuminate ethical dimensions, do not command.

${langInstruction}

${BASE_RULES}
${sycophancyGuard}${hallucinationGuard}

CORE RULES:
1. Apply the selected principles below in every analysis
2. Never tell the user what to do — offer perspective, not commands
3. Tone: "If your priority is X, option A aligns more with..." (Thai: "ถ้าสิ่งที่คุณให้ความสำคัญคือ X ตัวเลือก A สอดคล้องมากกว่า...")
4. Be honest about trade-offs, including uncomfortable ones
5. If the dilemma is trivial or not a genuine moral decision, set is_meaningful_dilemma to false
6. Detect emotional bias (anger, fear, greed) and name it in detected_bias
7. Confidence: "high" if principles clearly apply, "medium" if ambiguous, "low" if genuinely unclear
8. Do NOT use curly quotes (" " ' ') inside JSON strings
9. recommendation, perspective, option_a, and option_b MUST always be present and non-empty
10. Length: recommendation ${maxRecommendation} sentences max; perspective ${maxPerspective} bullet points max; option fields 1 sentence each
11. For each contextual principle listed, add one entry to principle_reasons explaining in plain language (1 sentence) why it is relevant to this specific situation

CONTEXTUAL PRINCIPLES (selected for this situation):
${principleInjections}

SUB-PRINCIPLES: You may mention up to 2 relevant sub-principles only if they are clearly nested under the selected principles above. Do not introduce unrelated Dhamma concepts.
${interpretationBlock}
${fewShotBlock}

RESPONSE FORMAT — CRITICAL:
You must respond with valid JSON only. No explanation, no markdown, no plain text. Start your response with { and end with }

OUTPUT FORMAT:
{
  "is_meaningful_dilemma": true,
  "recommendation": "2 sentences max (required)",
  "perspective": ["bullet 1", "bullet 2 (${maxPerspective} max, required)"],
  "option_a": { "intention": "one sentence (required)", "harm": "one sentence (required)", "tradeoffs": "one sentence (required)" },
  "option_b": { "intention": "one sentence (required)", "harm": "one sentence (required)", "tradeoffs": "one sentence (required)" },
  "detected_bias": [],
  "principles_used": ["PrincipleName1", "PrincipleName2"],
  "principle_reasons": [{"principle_id": "id_from_list", "reason": "1 sentence connecting this principle to the situation"}],
  "sub_principles_mentioned": [{"name_en": "", "name_th": "", "parent_principle_id": "id_from_list", "why_relevant": "1 sentence"}],
  "confidence": "high",
  "follow_up_suggestions": ["What if I...", "How do I handle..."]
}

If not a meaningful dilemma:
{ "is_meaningful_dilemma": false, "message": "This space is for decisions that genuinely matter. Try asking about a difficult choice, conflict, responsibility, or uncertainty." }`;
}

async function analyzeScenario({ optionA, optionB, context = "", userTier = "free", preferredPrincipleHash, requestedProvider }) {
  const lang = detectLanguage(optionA + optionB + context);

  const { signals, concepts, base_principles, selected_principles, risk_flags, response_mode, mapping_trace } = selectPrinciples(
    { optionA, optionB, context },
    userTier,
    preferredPrincipleHash
  );
  const interpretations = selectInterpretations({ optionA, optionB, context }, selected_principles, userTier);

  const userDhammaLevel = detectUserDhammaLevel(optionA + " " + optionB + " " + context);
  const exposureLevel = getExposureLevel(userDhammaLevel);

  // Few-shot only in EVAL_MODE to save tokens
  const fewShot = EVAL_MODE ? buildFewShotExamples(loadExamples()) : null;

  const systemPrompt = buildSystemPrompt(selected_principles, interpretations, lang, fewShot, risk_flags);
  const userMessage = `Option A: ${optionA}\nOption B: ${optionB}${context ? `\nContext: ${context}` : ""}`;

  const providerKey = resolveProvider(requestedProvider, userTier);
  const providerCfg = getProviderConfig(providerKey);
  const model = providerCfg.model;
  const maxTokens = providerCfg.max_tokens;

  const principleHashes = selected_principles.map((p) => p.hash);
  const cacheKey = makeCacheKey(optionA, optionB, context, principleHashes, `${providerKey}:${model}`);
  const cached = responseCache.get(cacheKey);

  let result, tokenUsage, cacheHit, latency_ms, parse_success;
  if (cached) {
    result = { ...cached.result };
    tokenUsage = cached.tokenUsage;
    cacheHit = true;
    latency_ms = 0;
    parse_success = true;
  } else {
    let raw, callMeta;
    try {
      callMeta = await callWithProvider(providerKey, { model, maxTokens, systemPrompt, userMessage });
      raw = callMeta.text;
      tokenUsage = callMeta.tokenUsage;
      latency_ms = callMeta.latency_ms;
    } catch (providerErr) {
      // Do not silently fall back — surface the error
      throw new Error(`Provider [${providerKey}] failed: ${providerErr.message}`);
    }

    try {
      result = parseAgentResponse(raw);
      parse_success = true;
    } catch (parseErr) {
      parse_success = false;
      throw parseErr;
    }

    // Retry once if option_a or option_b are missing or incomplete (Anthropic only — ThaiLLM has no multi-turn)
    if (parse_success && result.is_meaningful_dilemma !== false && (!result.option_a?.intention || !result.option_b?.intention) && providerCfg.provider === "anthropic") {
      const repairResponse = await client.messages.create({
        model,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          { role: "user", content: userMessage },
          { role: "assistant", content: raw },
          { role: "user", content: "Your response is missing option_a or option_b. Return the complete JSON including option_a {intention, harm, tradeoffs} and option_b {intention, harm, tradeoffs}." },
        ],
      });
      result = parseAgentResponse(repairResponse.content[0].text);
      tokenUsage.input += repairResponse.usage.input_tokens;
      tokenUsage.output += repairResponse.usage.output_tokens;
    }

    cacheHit = false;
    responseCache.set(cacheKey, { result: { ...result }, tokenUsage, ts: Date.now() });
  }

  // Attach hashes locally — not generated by LLM
  result.principle_hashes = principleHashes;

  // Validate principle_reasons and sub_principles_mentioned against selected/base principle IDs
  const validIds = new Set([
    ...selected_principles.map((p) => p.id),
    ...base_principles.map((p) => p.id),
  ].filter(Boolean));

  if (Array.isArray(result.principle_reasons)) {
    result.principle_reasons = result.principle_reasons.filter((r) => validIds.has(r.principle_id));
  }

  if (Array.isArray(result.sub_principles_mentioned)) {
    result.sub_principles_mentioned = result.sub_principles_mentioned
      .filter((s) => validIds.has(s.parent_principle_id))
      .slice(0, 2);
  }

  result.lang = lang;
  result.signals = signals;
  result.concepts = concepts;
  result.base_principles = base_principles;
  result.selected_principles = selected_principles;
  result.risk_flags = risk_flags;
  result.user_dhamma_level = userDhammaLevel;
  result.exposure_level = exposureLevel;
  result.provider_used = providerKey;
  result.model_used = model;
  result.token_usage = tokenUsage;
  result.latency_ms = latency_ms ?? 0;
  result.parse_success = parse_success ?? true;
  result.cache_hit = cacheHit;
  result.mapping_trace = mapping_trace;
  if (response_mode) result.response_mode = response_mode;
  if (interpretations.length > 0) {
    result.interpretations_used = interpretations.map((i) => i.hash);
    result.interpretation_objects = interpretations;
  }
  return result;
}

async function analyzeFollowUp({
  optionA = "", optionB = "", context = "",
  previousPrinciples = [],
  previousConcepts = [],
  lastRecommendation = "",
  followUpQuestion,
  tier = "free",
}) {
  const lang = detectLanguage(followUpQuestion);
  const model = getModel(tier);
  const DEV_MODE_ON = process.env.DEV_MODE === "true";

  // Concept drift check
  const followupConcepts = detectConcepts(followUpQuestion);
  const prevSet = new Set(previousConcepts);
  const newConcepts = followupConcepts.filter((c) => !prevSet.has(c));
  const overlap = followupConcepts.filter((c) => prevSet.has(c));

  let driftLevel;
  if (newConcepts.length === 0 || followupConcepts.length === 0) {
    driftLevel = "low";
  } else if (newConcepts.length === 1 && overlap.length > 0) {
    driftLevel = "medium";
  } else {
    driftLevel = "high";
  }

  let reusedPrinciples = previousPrinciples;
  let addedPrinciples = [];
  let rerunSelector = false;

  if (driftLevel === "high") {
    rerunSelector = true;
    const fresh = selectPrinciples({ optionA: followUpQuestion, optionB: "", context: `${optionA} ${optionB}` }, tier);
    reusedPrinciples = fresh.selected_principles;
  } else if (driftLevel === "medium") {
    const fresh = selectPrinciples({ optionA: followUpQuestion, optionB: "", context: "" }, tier);
    const prevHashes = new Set(previousPrinciples.map((p) => p.hash));
    const newP = fresh.selected_principles.find((p) => !prevHashes.has(p.hash));
    if (newP) {
      addedPrinciples = [newP];
      reusedPrinciples = [...previousPrinciples, newP];
    }
  }

  const principlesBlock = reusedPrinciples.map(formatPrincipleCompact).join("\n") || "None — rely on base rules.";

  const langInstruction =
    lang === "th"
      ? `LANGUAGE: Respond entirely in Thai (ภาษาไทย). Keep JSON keys in English.`
      : `LANGUAGE: Respond in English.`;

  const systemPrompt = `You are a Dhamma AI moral reasoning assistant continuing a conversation.

${langInstruction}

${BASE_RULES}

ORIGINAL DILEMMA:
A: ${optionA}
B: ${optionB}${context ? `\nContext: ${context}` : ""}

PREVIOUS RECOMMENDATION: ${lastRecommendation}

CONTEXTUAL PRINCIPLES:
${principlesBlock}

RULES:
- Answer the follow-up directly. Do not repeat the original analysis.
- Stay within the selected principles above.
- Do NOT use curly quotes inside JSON strings.

RESPONSE FORMAT — CRITICAL:
You must respond with valid JSON only. No explanation, no markdown. Start with { and end with }

OUTPUT FORMAT:
{
  "answer": "direct response, max 4 sentences",
  "principle_note": ["insight 1 (max 2 bullets, omit array if not needed)"],
  "recommendation_update": "optional revised guidance max 2 sentences — omit key if unchanged",
  "confidence": "high | medium | low"
}`;

  const response = await client.messages.create({
    model,
    max_tokens: 250,
    system: systemPrompt,
    messages: [{ role: "user", content: followUpQuestion }],
  });

  const result = parseAgentResponse(response.content[0].text);
  result.lang = lang;
  result.model_used = model;
  result.token_usage = { input: response.usage.input_tokens, output: response.usage.output_tokens };

  if (DEV_MODE_ON) {
    result._dev = {
      previous_concepts: previousConcepts,
      followup_concepts: followupConcepts,
      drift_level: driftLevel,
      reused_principles: reusedPrinciples.map((p) => p.name),
      added_principles: addedPrinciples.map((p) => p.name),
      rerun_selector: rerunSelector,
    };
  }

  return result;
}

function cleanModelJsonText(text) {
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }
  return cleaned;
}

function parseAgentResponse(raw) {
  console.log("[agent] raw response:", raw);
  const cleaned = cleanModelJsonText(raw);
  try {
    return JSON.parse(jsonrepair(cleaned));
  } catch (e) {
    throw new Error(`JSON parse failed: ${e.message}\nRaw (first 300): ${raw.slice(0, 300)}`);
  }
}

module.exports = { analyzeScenario, analyzeFollowUp };
