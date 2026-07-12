const fs = require("fs");
const path = require("path");

function loadPrinciples() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/principles.json"), "utf8")).principles;
}

function loadAliasMap() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/alias_map.json"), "utf8"));
}

function loadInterpretations() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/interpretations.json"), "utf8")).interpretations;
}

const conceptKeywords    = JSON.parse(fs.readFileSync(path.join(__dirname, "data/concept_keywords.json"), "utf8"));
const conceptToPrinciples = JSON.parse(fs.readFileSync(path.join(__dirname, "data/concept_to_principles.json"), "utf8"));
const engineRules        = JSON.parse(fs.readFileSync(path.join(__dirname, "data/engine_rules.json"), "utf8"));

const DEV_DEEP_MODE = process.env.DEV_DEEP_MODE === "true";

function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9฀-๿\s]/g, " ");
}

// Concept detection via concept_keywords.json (EN + TH)
function detectConcepts(text) {
  const lower = text.toLowerCase();
  const matched = [];
  for (const [domain, data] of Object.entries(conceptKeywords)) {
    const keywords = [
      ...data.keywords.en.split(","),
      ...data.keywords.th.split(","),
    ].map((k) => k.trim()).filter(Boolean);
    if (keywords.some((kw) => lower.includes(kw))) {
      matched.push(domain);
    }
  }
  return matched;
}

const CONDITIONAL_KEYWORDS = {
  wrong_view_or_dogma:         ["dogma", "doctrine", "sect", "wrong view", "orthodox", "heresy"],
  deep_ignorance:              ["avijja", "completely lost", "blind to", "no idea why", "don't know why"],
  life_or_death_decision:      ["life or death", "will die", "could die", "suicide", "terminal", "end my life", "fatal"],
  systemic_or_social_harm:     ["systemic", "structural harm", "social harm", "institutional"],
  deep_craving_or_aversion:    ["addicted", "can't stop wanting", "obsessed with", "deep aversion", "disgust"],
  identity_or_ego_pain:        ["who am i", "identity crisis", "lost my identity", "sense of self", "ego pain"],
  repeating_pattern_or_habit:  ["same pattern", "keep repeating", "again and again", "can't break", "habit"],
  root_ignorance:              ["root cause", "fundamental ignorance", "avijja"],
  status_or_pride:             ["reputation", "status", "prestige", "face", "honor", "pride"],
  fear_of_loss_or_death:       ["afraid to lose", "fear of death", "dread losing", "fear of losing"],
  sensory_obsession:           ["addicted to pleasure", "sensory craving", "can't resist", "obsessed with feeling"],
  deep_delusion:               ["completely deluded", "lost touch with reality", "totally confused"],
  bias_or_favoritism:          ["favoritism", "playing favorites", "unfair treatment", "bias"],
  toxic_or_manipulative_dynamic: ["toxic", "gaslighting", "manipulate me", "control me", "abusive"],
  indirect_or_systemic_harm:   ["indirect harm", "systemic harm", "structural", "side effect harm"],
  gratitude_or_debt:           ["owe them", "debt of gratitude", "they helped me", "feel obligated"],
  deep_absorption_or_jhana:    ["jhana", "deep meditation", "absorption", "samadhi state"],
  fear_of_death_or_urgency:    ["fear of death", "dying soon", "time is running out", "urgent", "emergency"],
  community_or_guidance:       ["need guidance", "teacher", "sangha", "mentor", "spiritual community"],
  faith_vs_blind_belief:       ["blind faith", "should i trust", "blindly believe", "faith vs reason"],
  deathless_or_transcendent:   ["nibbana", "nirvana", "transcend", "liberation", "deathless", "amata"],
  deep_ignorance_or_delusion:  ["deep delusion", "fundamental ignorance", "completely misguided", "avijja"],
  existential_despair:         ["hopeless", "meaningless", "no point", "existential", "life has no meaning", "despair"],
  self_hatred_or_worthlessness:["hate myself", "worthless", "useless person", "self-hatred", "self-loathing", "i'm nothing"],
};

// Resolve concept domains → ordered principle hashes (primary, secondary, then matched conditionals)
function resolveConceptHashes(concepts, principleById, text) {
  const lower = (text || "").toLowerCase();
  const seen = new Set();
  const hashes = [];
  for (const domain of concepts) {
    const mapping = conceptToPrinciples[domain];
    if (!mapping) continue;
    for (const id of [...(mapping.primary || []), ...(mapping.secondary || [])]) {
      const p = principleById[id];
      if (p && !seen.has(p.hash)) {
        seen.add(p.hash);
        hashes.push(p.hash);
      }
    }
    if (mapping.conditional) {
      for (const [condKey, ids] of Object.entries(mapping.conditional)) {
        const kws = CONDITIONAL_KEYWORDS[condKey] || [];
        if (kws.some((kw) => lower.includes(kw))) {
          for (const id of ids) {
            const p = principleById[id];
            if (p && !seen.has(p.hash)) {
              seen.add(p.hash);
              hashes.push(p.hash);
            }
          }
        }
      }
    }
  }
  return hashes;
}

const SIGNAL_KEYWORDS = {
  harm:         ["harm", "hurt", "damage", "violence", "kill", "destroy", "abuse", "exploit", "punish", "injure"],
  truth:        ["lie", "lying", "lied", "honest", "truth", "deceive", "deception", "false", "fake", "manipulate", "mislead"],
  uncertainty:  ["uncertain", "unsure", "doubt", "unclear", "confused", "maybe", "not sure", "don t know", "wonder", "not know"],
  suffering:    ["suffer", "pain", "stress", "anxiety", "depressed", "unhappy", "sad", "miserable", "stuck", "trapped", "overwhelm", "burnout"],
  pattern:      ["repeat", "pattern", "habit", "keep doing", "loop", "again and again", "cycle", "same thing", "keep happening", "always do"],
  anger:        ["angry", "anger", "rage", "furious", "irritated", "frustrated", "resentment", "livid", "mad"],
  greed:        ["greed", "greedy", "profit", "want more", "selfish", "materialism"],
  fear:         ["fear", "afraid", "scared", "anxious", "worry", "terrified"],
  emotional:    ["emotion", "feelings", "upset", "overwhelm", "hurt feelings", "feel bad"],
  relationship: ["friend", "family", "colleague", "partner", "boss", "trust", "relationship", "coworker", "loved one", "spouse"],
  extreme:      ["quit", "all or nothing", "extreme", "drastic", "radical", "either", "or else", "never again", "forever"],
  belief:       ["believe", "belief", "claim", "authority", "conspiracy", "i heard", "they say", "expert says", "official", "told me"],
  attachment:   ["lose", "loss", "hold on", "let go", "identity", "cling", "clinging", "afraid of losing", "can t let go"],
  compassion:   ["compassion", "kindness", "help", "empathy", "support", "care for"],
  risk:         ["risk", "regret", "long term", "consequence", "mistake", "careful", "careless", "ignore the problem"],
  knowledge:    ["know", "read", "learned", "study", "theory", "experience", "confident", "expertise", "research says"],
  fairness:     ["fair", "unfair", "justice", "equality", "equity", "deserve", "discrimination", "diversity"],
  systems:      ["system", "organization", "conditions", "factors", "environment", "many reasons", "complex"],
  obligation:   ["obligation", "owe", "helped me", "debt", "loyal", "loyalty", "gratitude"],
};

function extractSignals(text) {
  const normalized = normalizeText(text);
  const detected = [];
  for (const [signal, keywords] of Object.entries(SIGNAL_KEYWORDS)) {
    if (keywords.some((kw) => normalized.includes(kw))) {
      detected.push(signal);
    }
  }
  return detected;
}

const BASE_PRINCIPLE_HASHES = new Set([
  "2858eadfff8ffb874c7d1bea1e99bb1149d912cc434b9ad40f603e541d6c1086", // Yonisomanasikara
  "b35af3a160895a58778fa58d7fd538440e009dbdd979d46e0552c1c0094c8552", // Five Precepts
  "a8ebce51b59b7ba16fbdd7302b07f5266f944b80f1abb9eefd98efddaa7e36cd", // Kalama Sutta
  "e43d44658d45531d53208a215bc130c45d5550cc5adff3ca29718a19224a8d89", // Appamada
]);

const HASH = {
  FivePrecepts:         "b35af3a160895a58778fa58d7fd538440e009dbdd979d46e0552c1c0094c8552",
  Yonisomanasikara:     "2858eadfff8ffb874c7d1bea1e99bb1149d912cc434b9ad40f603e541d6c1086",
  TenDefilements:       "12889bcab4b15fe3ba789abfadacfdd4e1b14708c1f26fb6a983c631739c7a7d",
  Satipatthana:         "e28b6be5b493c58cffd57495b3dc342cbeded9df1aacf2c590a8a503a1d0a927",
  Brahmavihara:         "686f3084889980a52d558841c3290d4a50a9302bea950be3b17271f247339377",
  FourNobleTruths:      "842adcaffe0dde5d6ee29f8243fd72583c53601c43d8ac85aa65ef12f2547eda",
  KalamaSutta:          "a8ebce51b59b7ba16fbdd7302b07f5266f944b80f1abb9eefd98efddaa7e36cd",
  Paticcasamuppada:     "7d8bf06db6d8595f2b41fd3fd492a3d0956b2444b635a477a1bb458b1ab40335",
  MiddlePath:           "75505ad7c6ca3b4f3de19fbe19bb23493721e2f8964faca336cf50a736ad8d58",
  ThreeCharacteristics: "a019314e1954f55e6c6c96515e51b481269d23639dddfd92ded619e8e6a680c1",
  Kalyanamitta:         "c02b285a93de22da03fbd72d440fb677701bed6b54ddf70dcf57b4b12745b969",
  Appamada:             "e43d44658d45531d53208a215bc130c45d5550cc5adff3ca29718a19224a8d89",
  Panna3:               "8cb16d23ebdbeb099c799b32ce7bd0808faa8cf353017677ef735078778454cd",
  Idappaccayata:        "fe1ce9d19caa900da84c8897c5aa9925b2439d58bcd99b411ff854702daeee03",
  NobleEightfoldPath:   "d879e0e05e214890b1482950be94952c1a6f18385ecc57149dd55272df181e4f",
};

const RISK_KEYWORDS = {
  sycophancy:    ["agree with me", "you agree", "just tell me", "validate me", "isn't it okay", "everyone does it", "i know this is fine", "just confirm", "tell me i'm right", "i'm right, right", "just say yes"],
  hallucination: ["citation", "cite a source", "find sources", "give me papers", "statistics show", "latest news", "current events", "factual proof", "legal advice", "medical advice", "financial advice", "answer definitively", "just guess", "make one up", "make up a source", "if you're not sure just"],
  overconfidence:["i know for sure", "it's obviously", "everyone knows", "definitely true", "100% certain", "no question about it", "undeniably", "there's no doubt"],
  harm:          ["help me lie", "help me deceive", "hide the truth from", "help me manipulate", "want revenge on", "make them suffer", "hurt them", "exploit them", "blackmail"],
};

function detectRiskFlags(text) {
  const normalized = text.toLowerCase();
  return {
    sycophancy_risk:    RISK_KEYWORDS.sycophancy.some((kw) => normalized.includes(kw)),
    hallucination_risk: RISK_KEYWORDS.hallucination.some((kw) => normalized.includes(kw)),
    overconfidence_risk:RISK_KEYWORDS.overconfidence.some((kw) => normalized.includes(kw)),
    harm_risk:          RISK_KEYWORDS.harm.some((kw) => normalized.includes(kw)),
  };
}

const RISK_BOOSTS = [
  { flag: "sycophancy_risk",    hashes: [HASH.FivePrecepts, HASH.KalamaSutta, HASH.Yonisomanasikara, HASH.NobleEightfoldPath], boost: 0.20 },
  { flag: "hallucination_risk", hashes: [HASH.KalamaSutta, HASH.Panna3, HASH.Yonisomanasikara, HASH.Appamada],                 boost: 0.20 },
  { flag: "overconfidence_risk",hashes: [HASH.KalamaSutta, HASH.Panna3, HASH.Yonisomanasikara],                                boost: 0.18 },
  { flag: "harm_risk",          hashes: [HASH.FivePrecepts, HASH.NobleEightfoldPath, HASH.Brahmavihara, HASH.TenDefilements],  boost: 0.20 },
];

const SIGNAL_BOOSTS = [
  { signal: "emotional",   hashes: [HASH.TenDefilements, HASH.Satipatthana, HASH.Brahmavihara], boost: 0.10 },
  { signal: "anger",       hashes: [HASH.TenDefilements, HASH.Satipatthana, HASH.Brahmavihara], boost: 0.10 },
  { signal: "greed",       hashes: [HASH.TenDefilements], boost: 0.10 },
  { signal: "fear",        hashes: [HASH.TenDefilements, HASH.Satipatthana], boost: 0.10 },
  { signal: "harm",        hashes: [HASH.FivePrecepts], boost: 0.15 },
  { signal: "truth",       hashes: [HASH.FivePrecepts], boost: 0.15 },
  { signal: "uncertainty", hashes: [HASH.Yonisomanasikara, HASH.KalamaSutta], boost: 0.15 },
  { signal: "belief",      hashes: [HASH.KalamaSutta, HASH.Yonisomanasikara], boost: 0.15 },
  { signal: "suffering",   hashes: [HASH.FourNobleTruths], boost: 0.15 },
  { signal: "pattern",     hashes: [HASH.Paticcasamuppada], boost: 0.15 },
  { signal: "extreme",     hashes: [HASH.MiddlePath], boost: 0.15 },
  { signal: "attachment",  hashes: [HASH.ThreeCharacteristics], boost: 0.15 },
  { signal: "relationship",hashes: [HASH.Kalyanamitta], boost: 0.15 },
  { signal: "risk",        hashes: [HASH.Appamada], boost: 0.15 },
  { signal: "knowledge",   hashes: [HASH.Panna3], boost: 0.15 },
  { signal: "compassion",  hashes: [HASH.Brahmavihara], boost: 0.10 },
  { signal: "systems",     hashes: [HASH.Idappaccayata], boost: 0.15 },
  { signal: "obligation",  hashes: [HASH.Kalyanamitta], boost: 0.12 },
  { signal: "fairness",    hashes: [HASH.FivePrecepts, HASH.Brahmavihara], boost: 0.10 },
];

const CONFLICT_PAIRS = [
  { a: HASH.Idappaccayata,    b: HASH.Paticcasamuppada,      exception: (s) => s.includes("pattern") && s.includes("systems") },
  { a: HASH.Satipatthana,     b: HASH.Yonisomanasikara,      exception: (s) => s.includes("emotional") && s.includes("uncertainty") },
  { a: HASH.FourNobleTruths,  b: HASH.ThreeCharacteristics,  exception: (s) => s.includes("suffering") && s.includes("attachment") },
];

const KNOWN_SIGNALS = new Set(Object.keys(SIGNAL_KEYWORDS));

function detectUnknownTerms(tokens, aliasMap) {
  const knownTerms = new Set([...KNOWN_SIGNALS, ...Object.keys(aliasMap)]);
  const socialTerms = ["equality", "equity", "diversity", "justice", "autonomy", "freedom", "rights", "agency"];
  const unknown = [];
  for (const term of socialTerms) {
    if (tokens.includes(term) && !knownTerms.has(term)) unknown.push(term);
  }
  return unknown;
}

function scorePrinciples(signals, principles, aliasMap, riskFlags, preferredPrincipleHash, conceptHashes) {
  return principles.map((p) => {
    let score = p.weight;
    const reasons = [];

    // Concept-domain boost: primary principles ranked first get highest boost
    const conceptIdx = conceptHashes.indexOf(p.hash);
    if (conceptIdx !== -1) {
      const boost = Math.max(0.05, 0.25 - conceptIdx * 0.02);
      score += boost;
      reasons.push("concept_match");
    }

    // Alias map match
    for (const signal of signals) {
      const aliasHashes = aliasMap[signal] || aliasMap[signal.replace(/-/g, "_")] || [];
      if (aliasHashes.includes(p.hash)) {
        score += 0.15;
        reasons.push(`alias:${signal}`);
      }
    }

    // Signal boosts
    for (const rule of SIGNAL_BOOSTS) {
      if (signals.includes(rule.signal) && rule.hashes.includes(p.hash)) {
        score += rule.boost;
        reasons.push(`signal:${rule.signal}`);
      }
    }

    // Risk-aware boosts
    if (riskFlags) {
      for (const rule of RISK_BOOSTS) {
        if (riskFlags[rule.flag] && rule.hashes.includes(p.hash)) {
          score += rule.boost;
          reasons.push(`risk:${rule.flag}`);
        }
      }
    }

    if (preferredPrincipleHash && p.hash === preferredPrincipleHash) {
      score += 0.12;
      reasons.push("preferred");
    }

    return { ...p, score, reasons };
  });
}

function hasConflict(hash, selectedHashes, signals) {
  for (const pair of CONFLICT_PAIRS) {
    if (hash !== pair.a && hash !== pair.b) continue;
    const other = hash === pair.a ? pair.b : pair.a;
    if (!selectedHashes.has(other)) continue;
    if (pair.exception(signals)) return false;
    return true;
  }
  return false;
}

function selectPrinciples(input, userTier = "free", preferredPrincipleHash = null) {
  const principles = loadPrinciples();
  const aliasMap = loadAliasMap();

  const combined = `${input.optionA || ""} ${input.optionB || ""} ${input.context || ""}`;
  const signals = extractSignals(combined);
  const risk_flags = detectRiskFlags(combined);

  // Concept detection — primary selection mechanism
  const concepts = detectConcepts(combined);
  const isCrisis = concepts.includes("crisis");
  if (isCrisis) risk_flags.crisis = true;

  // Build id → principle lookup
  const principleById = {};
  for (const p of principles) principleById[p.id] = p;

  // Resolve concept-based priority hashes (crisis handled separately)
  const conceptHashes = resolveConceptHashes(concepts.filter((c) => c !== "crisis"), principleById, combined);

  // Mapping trace — collected for DEV_MODE UI; never sent to LLM
  const _traceTerms = [];
  const _traceConcepts = [];
  const _lower = combined.toLowerCase();
  for (const [domain, data] of Object.entries(conceptKeywords)) {
    const kws = [...data.keywords.en.split(","), ...data.keywords.th.split(",")].map((k) => k.trim()).filter(Boolean);
    const matched = kws.filter((kw) => kw && _lower.includes(kw));
    if (matched.length > 0) {
      _traceConcepts.push({ concept: domain, score: matched.length, matched_terms: matched });
      matched.forEach((term) => _traceTerms.push({ term, source: "concept_keywords", concept: domain, matched_text: term }));
    }
  }
  for (const signal of signals) {
    if (!_traceTerms.some((t) => t.term === signal)) {
      _traceTerms.push({ term: signal, source: signal in aliasMap ? "alias_map" : "pattern", concept: signal, matched_text: signal });
    }
  }

  // Unknown term fallback
  const tokens = normalizeText(combined).split(/\s+/);
  const unknownTerms = detectUnknownTerms(tokens, aliasMap);
  if (unknownTerms.length > 0) {
    if (!signals.includes("uncertainty")) signals.push("uncertainty");
    if (!signals.includes("belief")) signals.push("belief");
  }

  const scored = scorePrinciples(signals, principles, aliasMap, risk_flags, preferredPrincipleHash, conceptHashes);
  scored.sort((a, b) => b.score - a.score);

  const _traceCandidates = scored.slice(0, 10).map((p) => ({
    principle_id: p.id,
    name: p.name,
    base_weight: Math.round((p.weight || 0) * 100) / 100,
    final_score: Math.round(Math.min(1.0, p.score) * 100) / 100,
    reasons: p.reasons,
  }));

  // Base principles for API response (display only — not sent to LLM prompt)
  const base_principles = [HASH.Yonisomanasikara, HASH.FivePrecepts, HASH.KalamaSutta, HASH.Appamada]
    .map((hash) => {
      const p = principles.find((p) => p.hash === hash);
      return p ? { hash: p.hash, name: p.name, name_en: p.name_en, thai: p.thai } : null;
    })
    .filter(Boolean);

  const maxCtx = engineRules.selector.max_contextual_principles;
  const selected = [];
  const selectedHashes = new Set();

  for (const p of scored) {
    if (selected.length >= maxCtx) break;
    if (BASE_PRINCIPLE_HASHES.has(p.hash)) continue;
    if (hasConflict(p.hash, selectedHashes, signals)) continue;
    selected.push({
      id: p.id,
      hash: p.hash,
      name: p.name,
      name_en: p.name_en || p.name,
      name_th: p.name_th || "",
      thai: p.thai,
      behavior_instruction: p.behavior_instruction,
      behavior_instruction_th: p.behavior_instruction_th || "",
      score: Math.round(Math.min(1.0, p.score) * 100) / 100,
      selector_reason: formatReasons(p.reasons),
    });
    selectedHashes.add(p.hash);
  }

  const result = {
    signals,
    concepts,
    base_principles,
    selected_principles: selected,
    risk_flags,
    mapping_trace: {
      input_terms_matched: _traceTerms,
      detected_concepts: _traceConcepts,
      candidate_principles: _traceCandidates,
      final_contextual_principles: selected.map((p) => p.name),
    },
  };

  if (isCrisis) result.response_mode = "crisis_first";

  if (unknownTerms.length > 0) {
    result._unknown_terms = unknownTerms.map((term) => ({
      unknown_term: term,
      input_excerpt: combined.slice(0, 120),
      suggested_principles: selected.slice(0, 2).map((p) => p.name),
      needs_review: true,
    }));
  }

  return result;
}

function formatReasons(arr) {
  const unique = [...new Set(arr)];
  return unique.slice(0, 3).join(", ") || "base weight";
}

function selectInterpretations(input, selectedPrinciples, userTier = "free") {
  const interpretations = loadInterpretations();
  const combined = `${input.optionA || ""} ${input.optionB || ""} ${input.context || ""}`;
  const signals = extractSignals(combined);

  const maxInterps = userTier === "supporter" ? 2 : 1;

  const TAG_TO_SIGNALS = {
    compassion:      ["compassion", "emotional", "suffering"],
    "non-harm":      ["harm"],
    truth:           ["truth", "belief"],
    mindfulness:     ["anger", "emotional"],
    balance:         ["extreme"],
    wisdom:          ["uncertainty", "knowledge"],
    karma:           ["pattern", "risk"],
    peace:           ["anger", "relationship"],
    "non-attachment":["attachment", "fear"],
    integrity:       ["truth", "fairness"],
    selflessness:    ["obligation", "compassion"],
    "well-being":    ["suffering"],
    morality:        ["fairness", "harm"],
    intention:       ["anger", "emotional", "ethics"],
    service:         ["obligation"],
    "means-ends":    ["harm", "fairness"],
    freedom:         ["attachment", "extreme"],
  };

  const scored = interpretations.map((i) => {
    let matchCount = 0;
    for (const tag of i.tags || []) {
      const relatedSignals = TAG_TO_SIGNALS[tag] || [tag];
      if (relatedSignals.some((s) => signals.includes(s))) matchCount++;
    }
    return { ...i, matchCount };
  });

  return scored
    .filter((i) => i.matchCount > 0 && i.priority >= 7)
    .sort((a, b) => b.priority - a.priority || b.matchCount - a.matchCount)
    .slice(0, maxInterps)
    .map((i) => ({ hash: i.hash, text: i.text, meaning: i.meaning, tags: i.tags }));
}

module.exports = { selectPrinciples, selectInterpretations, extractSignals, detectRiskFlags, detectConcepts };
