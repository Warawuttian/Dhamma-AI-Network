# Dhamma AI Network — Session Summary

## Start server
```bash
cd /workspace/dhamma-ai-network
node server.js
```
Then open: http://localhost:3000

## Public URL (mobile)
```bash
npx localtunnel --port 3000
```

## Project Structure
```
dhamma-ai-network/
├── server.js                        # API + static server (port 3000)
├── agent.js                         # AI reasoning engine (Claude API)
├── selector.js                      # Concept detection + principle scoring + risk
├── adaptive_response.js             # Dhamma level detection + exposure formatting
├── public/
│   └── index.html                   # Full UI — EN/TH bilingual, 7 screens
└── data/
    ├── principles.json              # 47 Dhamma principles (v0.4) + SHA-256 hashes
    ├── concept_keywords.json        # 12 domains → EN+TH keyword lists
    ├── concept_to_principles.json   # 12 domains → primary/secondary/conditional principles
    ├── model_registry.json          # Model IDs + max_tokens per tier
    ├── engine_rules.json            # Selector + output + safety config
    ├── alias_map.json               # Signal → principle hash mappings (125 entries)
    ├── reasoning_examples.json      # Few-shot examples (EVAL_MODE only)
    └── interpretations.json         # Optional perspective injections
```

## Environment flags
- `DEV_MODE=true` — disables quota enforcement
- `DEV_DEEP_MODE=true` — allows 3 contextual principles (default: 2)
- `EVAL_MODE=true` — enables few-shot examples in prompt (default: off)

## API Endpoints
- GET  /health             → status + active session count
- GET  /principles         → all 47 principles
- GET  /principles/:hash   → single principle by hash
- GET  /search?tag=        → filter by tag
- GET  /random             → 1 random principle
- GET  /tags               → all unique tags
- POST /analyze            → AI analysis { optionA, optionB, context, userTier }
- POST /follow-up          → follow-up Q&A { sessionId, question, followupType }

## Dependencies
- `@anthropic-ai/sdk`, `express`, `jsonrepair`
- Node.js v20+
- Requires: `ANTHROPIC_API_KEY`

---

## Completed — previous session
- `principles.json` → v0.3: 32 principles, added layer/usage_mode/risk_relevance/behavior_instruction
- `adaptive_response.js` → Dhamma level detection, exposure formatting (plain/light/full)
- `selector.js` → risk-aware scoring (sycophancy/hallucination/harm), preferredPrincipleHash boost
- `agent.js` → base rules always injected, adaptive prompt exposure, risk guards, new output fields
- `server.js` → follow-up endpoint, session management, DEV_MODE flag
- `index.html` → principle explorer, follow-up UI, quota display, EN/TH bilingual
- `reasoning_examples.json` → v2.1: +6 examples (sycophancy, hallucination, identity, nihilism)

---

## Completed — 2026-04-30

### agent.js
- Installed `jsonrepair` and replaced all manual regex JSON repair with `jsonrepair(candidate)`
- `parseAgentResponse`: removed hard throw before repair; now tries extracted `{...}` block first, falls back to full raw text (fixes "Agent did not return valid JSON" when model returns plain text)
- Added `console.log("[agent] raw response:", raw)` before parsing for debug visibility
- Added CRITICAL format block to both system prompts: "You must respond with valid JSON only. No explanation, no markdown, no plain text. Start your response with { and end with }"
- OUTPUT FORMAT reordered: `summary → recommendation → perspective → option_a → option_b`
- CORE RULE 9: all five fields (`summary`, `recommendation`, `perspective`, `option_a`, `option_b`) explicitly required and non-empty
- CORE RULE 10 (revised per `revisedtk.md`): summary 1 sentence; recommendation 2 sentences max; perspective 2 bullets max; option fields 1 sentence each
- `option_a` and `option_b` sub-fields marked `(required)` inline in the OUTPUT FORMAT template
- `max_tokens` raised 350 → 600 to give `option_a`/`option_b` room to render fully
- Prompt now has two sections: **BASE PRINCIPLES** (always 4) and **CONTEXTUAL PRINCIPLES** (1–3 dynamic)
- `buildSystemPrompt` takes `basePrinciples` as first parameter; injects both sections separately
- `analyzeScenario` passes `base_principles` to prompt builder and attaches it to the result
- Removed redundant `principles_used_internally` field

### selector.js
- Added `BASE_PRINCIPLE_HASHES` constant (Yonisomanasikara, Five Precepts, Kalama Sutta, Appamada)
- `selectPrinciples` always builds `base_principles` from the fixed set of 4
- Contextual selection loop now skips base hashes → returns 1–3 non-base principles
- Removed Yonisomanasikara fallback (it's always in base)
- Return shape: `{ signals, base_principles, selected_principles, risk_flags }`

### server.js
- DEV_MODE quota fix: `followup_remaining` and `followup_max` sent as `null` (not `Infinity`) in DEV_MODE — `Infinity` serialised to `null` in JSON and broke the UI quota counter
- `session.followup_count` no longer incremented in DEV_MODE
- Follow-up route sends `null` for remaining/max when DEV_MODE

### index.html
- **Principles Used** section split into two subsections: "Base Operating Principles" (fixed 4) and "Contextual Principles" (dynamic 1–3)
- `renderResult`: renders `base_principles` in `#result-base-tags`; renders `selected_principles` in `#result-tags`
- Dev panel updated: `base: N | ctx: N` instead of `principles: N`
- Dev debug body: lists `base_principles` and `contextual_principles` separately
- `result-full` now starts `display:none`; shown by `renderResult` only after data is ready (fixes empty skeleton flash)
- Option rendering replaced with `renderOptionCard(obj, prefix)` helper — handles null `option_a`/`option_b`, adds `trade_offs` fallback for `tradeoffs`
- DEV_MODE quota: `updateFollowUpQuota` returns early with `∞` when `devMode`; `sendFollowUp` bypasses remaining-count gate when `devMode`

---

## Completed — 2026-05-10

### data/principles.json
- Appended 15 new principle objects — total is now **47 principles** (was 32)
- New principles added (no duplicates confirmed):
  - **Ethical/base**: ariya_dhana_7, agati_4, cetana_3, hiri_ottappa, ahimsa, tisarana
  - **Insight**: maranassati, sampajanna_4, samadhi, nivarana_5, samapatti_8
  - **Deep**: lokuttara_dhamma_9, nibbana, bodhi, amata

### data/concept_keywords.json (NEW)
- 12 concept domains: epistemic, ethical, emotional, causal, identity, craving, social, responsibility, meditative, refuge, awakening, crisis
- Each domain has EN + TH keyword lists for signal detection
- `crisis` domain has `"priority": "CRITICAL"` and `"response_mode": "crisis_first"`

### data/concept_to_principles.json (NEW)
- Maps each of the 12 domains → primary / secondary / conditional principles (by id)
- Conditional keys are context-triggered sub-cases (e.g. `"life_or_death_decision"`, `"deep_absorption_or_jhana"`)

### data/model_registry.json (NEW, corrected model IDs)
- `haiku` → `claude-haiku-4-5-20251001`, free tier, 600 max_tokens
- `sonnet` → `claude-sonnet-4-6`, supporter tier, 900 max_tokens

### data/engine_rules.json (NEW)
- selector: max 3 contextual principles, repetition_penalty 0.15
- output: max 3 perspective lines, max 4 recommendation lines, force_clear_recommendation
- safety: avoid_sycophancy, require_uncertainty_if_low_confidence

### data/alias_map.json
- Fully replaced — 125 signal entries (EN + TH)
- Includes hashes for all 15 new principles

---

## Completed — 2026-05-10 (second session)

### selector.js — concept detection + data file wiring
- Loads `concept_keywords.json`, `concept_to_principles.json`, `engine_rules.json` at startup
- `detectConcepts(text)` — scans EN+TH keyword lists across 12 domains, returns matched domain names
- `resolveConceptHashes()` — maps concept domains → principle hashes (primary before secondary)
- Scoring adds `concept_match` boost (0.25 decaying by position) on top of existing alias/signal scoring
- Crisis domain → `risk_flags.crisis = true` + `response_mode = "crisis_first"` (short-circuit)
- Max contextual: **2 normally**, 3 only if `DEV_DEEP_MODE=true` (reads from engine_rules)
- `base_principles` no longer include `prompt_injection` — they are for UI display only, not sent to LLM
- Returns `concepts` array in result

### agent.js — token reduction + model registry
- Loads `model_registry.json` + `engine_rules.json`; `getModel(userTier)` picks model by tier
- **4 short base rules** replace old 8-line `BASE_RULES` (doc spec)
- **`summary` field removed** from OUTPUT FORMAT — UI shows original user input instead
- Principle format in prompt: `- Name: behavior_instruction` only (no hash, tags, full JSON)
- Few-shot examples: **disabled by default**, on only with `EVAL_MODE=true`
- Hashes attached locally after LLM response — not generated by Claude
- `buildSystemPrompt` no longer takes `basePrinciples` param; reads output limits from engine_rules

### server.js
- `buildSessionSummary` uses `context` instead of removed `data.summary`
- Removed stale `analysis_summary` field from session object
- Fixed duplicate `tier` key in session object

---

## Completed — 2026-05-18

### index.html — fix result.summary references
- `currentInput = { optionA, optionB, context }` stored on submit
- "Situation Summary" section now renders original A/B/context instead of removed `result.summary` field
- Follow-up context header shows "A: … · B: …" instead of `data.summary`
- DEV_MODE error alert shows server `detail` message (parse error + raw snippet) instead of generic string

### agent.js — validation retry + principle_reasons + sub_principles + provider switcher + ThaiLLM fixes
- Retry once with repair prompt if `option_a`/`option_b` missing after first parse (Anthropic only)
- Principle format in prompt now includes `[id:xxx]` so LLM can reference IDs in `principle_reasons`
- LLM generates `principle_reasons: [{principle_id, reason}]` (1 sentence each); validated server-side against selected/base IDs
- Prompt rule added: LLM may mention 1–2 sub-principles under selected parents → `sub_principles_mentioned` output field; validated + capped at 2
- `resolveProvider(requestedProvider, userTier)` — in DEV_MODE uses `requestedProvider`; production ignores it
- `callWithProvider(providerKey, …)` — dispatches to Anthropic SDK or ThaiLLM (OpenAI-compatible fetch); times latency
- ThaiLLM call appends `"Return ONLY valid JSON. No <think>…"` to system prompt
- `THAILLM_MAX_TOKENS` env var overrides registry `max_tokens` for ThaiLLM calls
- `cleanModelJsonText(text)` — strips `<think>…</think>` blocks, extracts first `{…}`; applied universally in `parseAgentResponse`
- Parse error message now includes first 300 chars of raw response
- Result includes `provider_used`, `latency_ms`, `parse_success`

### agent.js — lightweight follow-up rewrite
- `analyzeFollowUp` rewritten with concept drift detection: low (reuse) / medium (add 1) / high (rerun selector)
- Compressed prompt: 4 base rules + original A/B/context + last recommendation + reused principles only
- Short output: `answer` (4 sentences), `principle_note` (2 bullets), `recommendation_update` (optional)
- DEV_MODE returns `_dev` object: `previous_concepts`, `followup_concepts`, `drift_level`, `reused_principles`, `added_principles`, `rerun_selector`
- Supporter sliding-window history replaced by drift-based approach

### selector.js — conditional sub-keys + mapping_trace + id field
- `CONDITIONAL_KEYWORDS` map (24 conditions) wired into `resolveConceptHashes` — sub-keys like `life_or_death_decision`, `deep_absorption_or_jhana` activate their principles at runtime
- `mapping_trace` returned in every `selectPrinciples` result: `input_terms_matched`, `detected_concepts` (with scores), `candidate_principles` (top 10 with weights), `final_contextual_principles`
- Selected principles now include `id` and renamed `reason` → `selector_reason`
- `detectConcepts` exported

### server.js — session refactor
- Session now stores `optionA`, `optionB`, `context`, `selected_principles`, `concepts`, `last_recommendation` (replaces text `summary`)
- `last_recommendation` updated after each follow-up if `recommendation_update` is present
- `requestedProvider` accepted from request body and passed to `analyzeScenario`
- Removed unused `buildSessionSummary`

### data/model_registry.json
- Added `claude_haiku`, `claude_sonnet`, `thaillm` provider entries

### index.html — DEV UI additions
- Provider dropdown (Claude Haiku / Sonnet / ThaiLLM) shown only in DEV_MODE; value sent as `requestedProvider`
- DEV panel now shows: `provider_used`, `latency_ms`, `parse_success` alongside existing fields
- Debug body shows provider metadata + sub-principles mentioned + full mapping trace
- Follow-up DEV debug appended inline after each answer: drift level, reused/added principles, rerun_selector flag
- "Why relevant: …" shown under each contextual principle tag (from `principle_reasons`)

---

## Next Steps (planned)
- Login system (Google OAuth or session-based)
- API usage limit (10/day per session)
- Blockchain logging (Stellar)
- AI-to-AI multi-agent system

---

## Completed — 2026-05-29

### docs/example_dilemmas.md — 3 new examples added (examples 4–6)

- **whistleblower_vs_loyalty**: Toxic waste dumping vs. protecting 500 colleagues' jobs
  - Principles: ahimsa, karma, hiri_ottappa
  - Biases: loyalty_bias, omission_bias, fear_of_consequences
- **end_of_life_autonomy**: Doctor assisting terminal patient in severe pain
  - Principles: brahmavihara_4 (karuna/upekkha sub-principles), maranassati, ahimsa
  - Confidence: low (genuine ethical ambiguity preserved)
- **surveillance_for_safety**: Government mass surveillance post-terrorism
  - Principles: middle_path, agati_4, kalama_sutta
  - Biases: fear_of_harm, false_security, authority_bias
- All 6 examples: TH + EN bilingual, full precomputed_result schema, claude-haiku-4-5-20251001

### data/example_dilemmas.json — 3 new entries appended

- File extended from 3 → 6 example groups
- Each group: `id`, `language_pair`, `examples` (TH + EN with full precomputed_result)
- `GET /examples` returns all 6 correctly

### index.html — examples screen fix (loadExamplesData never called)

- Root cause: `loadExamplesData()` defined but never invoked — `examplesData` stayed null
- Fix 1: Added `loadExamplesData()` call in init block (line 1126) — fetches on page load
- Fix 2: `showScreen('screen-examples')` now calls `renderExampleCards()` on every visit — handles language switches

### index.html — Edit_UI.md changes

**Back button on result screen**
- Added `← Back` button at top of `screen-result` using existing `.back-link` style
- Navigates to `screen-input` without clearing input values

**Clear × button inside each textarea**
- `input-a`, `input-b`, `input-context` each wrapped in `.input-wrap` (position: relative)
- `×` button positioned top-right inside wrapper; hidden by default (`display:none`)
- `oninput="updateClearBtn(this)"` shows/hides as user types
- `clearField(id)` guards against `el.disabled` — won't fire in example mode
- `tabindex="-1"` keeps × out of tab order
- Textarea padding-right bumped to 34px so text doesn't underlap button
- CSS added to `components.css`: `.input-wrap`, `.clear-btn`

## Completed — 2026-05-28

### Docs consolidation
- 9 .md files in docs/ grouped into 3 (59% token reduction)
  - `site_pages.md` — about.json + ideology.json + project.json
  - `example_dilemmas.md` — 3 example dilemmas + /examples wiring spec
  - `frontend_tasks.md` — layout, CSS refactor, analysis UI tasks

### Frontend tasks (all 3 from frontend_tasks.md)

**Task 3 — Analysis Result UI**
- `selector.js`: max contextual principles now always 3 (removed DEV_DEEP_MODE split)
- `index.html`: `fu-context` + `fu-context-tradeoff` hidden from Continue Thinking UI
- `index.html`: sub-principles rendered under "Sub-principles mentioned" label in Principles Used section

**Task 1 — Layout & Header**
- Fixed top header (gold background): chakra logo + title, lang toggle, Dark/Light button
- Left sidebar (200px): Home, Ideology, Project, Principles, About Us nav + Multi Agent System (coming soon)
- `data/site_content.json` created — page content for ideology/project/about pages
- `GET /site_content.json` route added to server.js
- New screens: screen-ideology, screen-project, screen-about (rendered from site_content.json)
- Removed Today's Principle section and `loadDailyPrinciple()` init call
- Dark/light mode toggle wired up

**Task 2 — CSS Refactor**
- `public/styles/variables.css` — CSS variables
- `public/styles/base.css` — reset, typography, shared classes (.section-heading, .section-body)
- `public/styles/layout.css` — header, sidebar, layout, responsive
- `public/styles/components.css` — all component styles
- `public/styles/darkmode.css` — dark mode overrides
- Inline `<style>` block removed from index.html

## Completed — 2026-05-28

### docs/site_pages.md — full implementation

Created `data/about.json`, `data/ideology.json` (without research_focus), `data/project.json`.

Added server routes: `GET /about.json`, `GET /ideology.json`, `GET /project.json`.

Upgraded frontend renderer in `index.html`:
- Replaced simple `renderPage()` with full type-dispatched renderer
- Fetches from individual JSON files (`/about.json`, `/ideology.json`, `/project.json`)
- Caches fetched data in `pageCache` (re-renders on language change without re-fetch)
- Handles all section types: `hero_text`, `text_section`, `feature_grid`, `research_grid`, `layer_stack`, `image_section`, `comparison`, `status_table`, `supporters`
- Expanded `sections` arrays (about/ideology pattern) alongside direct properties (project pattern)

Added CSS for new components in `public/styles/components.css`:
- `.feature-grid`, `.research-grid`, `.layer-stack`, `.comparison-grid`, `.status-table`, `.supporters-list`, `.page-hero-image`, `.image-caption`, `.page-tags`

Fixed orphaned `</style>` tag in index.html head.
Removed unused `siteContent` variable and `loadSiteContent()`.
Updated `docs/site_pages.md` to remove research_focus from ideology section.
