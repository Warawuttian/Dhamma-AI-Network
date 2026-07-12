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

## Completed — 2026-05-31

### docs/index.html — GitHub Pages fetch path fixes
- `fetch('/' + pageId + '.json')` → `fetch('./data/' + pageId + '.json')`
- `fetch('/principles')` → `fetch('./data/principles.json')`
- `fetch('/examples')` → `fetch('./data/example_dilemmas.json')`
- Root cause: GitHub Pages serves from `/Dhamma-AI-Network/` base; absolute paths failed

### docs/styles/layout.css + public/styles/layout.css — mobile sidebar
- Added `transition: transform 0.25s ease` to `.app-sidebar`
- Added `.btn-hamburger`, `.sidebar-close`, `.sidebar-overlay` classes (hidden on desktop)
- Mobile breakpoint: replaced `display:none` with `transform: translateX(-100%)` + `.open` state
- `.sidebar-overlay.open` shows dark backdrop; `z-index` ordering: overlay 99, sidebar 150

### docs/index.html + public/index.html — hamburger menu
- `☰` button in header-left (hidden on desktop via CSS)
- `<div class="sidebar-overlay">` before app layout — closes sidebar on tap outside
- `id="app-sidebar"` added to `<nav>`; `✕` close button inside sidebar
- `toggleSidebar()` / `closeSidebar()` JS functions added
- `showScreen()` calls `closeSidebar()` — sidebar auto-closes on any navigation

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

## Completed — 2026-06-06

### Docs reorganized
- Merged 6 active docs in /docs into 4 (removed duplication of 3-tier access rules, joined abuse config split)
- `auth_and_models.md` — Auth + model system (merged from 2 files)
- `abuse_protection.md` — Rate limits + config.js spec (merged from 2 files)
- Kept: `To improve Thai language.md`, `Support us_json.md`

### Task 1: config.js + Abuse Protection
- Created `config.js` — central config module, all limits from .env with defaults
- Rewrote `server.js` abuse protection: IP-based rate limiting, cooldown, role-aware (anon/user/admin)
- Removed old `TIER_LIMITS` / follow-up quota system
- Error codes: `rate_limit_minute`, `guest_daily_limit`, `user_daily_limit`
- Localized messages from `data/messages.json`

### Task 2: Model System Cleanup
- `agent.js`: removed `THAILLM_MAX_TOKENS` env override — each model uses its own `max_tokens` from registry
- `agent.js`: removed `THAILLM_MODEL` env var (model names now live in model_registry.json)
- `agent.js`: `resolveProvider` now respects `dev_only` flag
- `agent.js`: analyzeScenario returns `display_name` + `organization` fields
- `server.js`: added `GET /models` endpoint (filters by dev_only + requires_login)
- Frontend: DEV panel now shows `Model: <display_name>` / `By: <organization>`
- Frontend: provider dropdown populated dynamically from `/models`

### Task 3: Thai Language Pipeline
- `agent.js`: `pickField()` helper selects Thai fields (`_th`) when lang=th with fallback
- `agent.js`: `formatPrincipleCompact(p, lang)` — Thai label order: `name_th || thai || name || name_en`
- `agent.js`: `buildSystemPrompt` — interpretations use `text_th`/`meaning_th` for Thai
- `adaptive_response.js`: `formatPrincipleForPrompt(principle, exposureLevel, lang)` — full Thai field precedence
- `selector.js`: selected principles now include `name_th` and `behavior_instruction_th` fields

### Task 4: Support Us Page
- Created `data/support_us.json` — bilingual EN/TH, page_type support-us
- `server.js`: `GET /support_us.json` route
- Frontend: `screen-support_us` screen, sidebar nav button, i18n keys (`nav_support`)
- Frontend: `renderSocialLinks()` renderer for `social_links` type sections
- `components.css`: `.social-links-row` + `.social-link-item` styles

## Completed — 2026-06-06 (Google OAuth)

- Installed: `passport`, `passport-google-oauth20`, `express-session`
- Created `auth.js`: Google strategy, user model `{ id, email, name, picture, role }`, admin role via `ADMIN_EMAILS` env var, exports `AUTH_ENABLED` flag
- `server.js`: session middleware (`SESSION_SECRET` from .env), passport init, auth routes:
  - `GET /auth/google` — redirect to Google (only if AUTH_ENABLED)
  - `GET /auth/google/callback` — callback, redirects to `/`
  - `GET /auth/logout` — logout, redirects to `/`
  - `GET /auth/me` — returns `{ loggedIn, user }` for frontend
  - `GET /config` — now includes `authEnabled`
- Frontend: Login button visible only when `authEnabled=true` + not logged in; logged-in state shows avatar + name with dropdown (email + Logout link); `applyAuthState()` called after `/auth/me`; `/models` fetched after auth check so role is correct; `currentUser` set globally
- `layout.css`: `.user-menu`, `.user-menu-toggle`, `.user-avatar`, `.user-dropdown` styles
- `auth_and_models.md` moved to `docs/Done/`

## Completed — 2026-06-15 (Debug Panel, Home Page, Follow-up Counter)

### Debug Panel — always visible, read-only when not in DEV_MODE
- Debug panel now shows regardless of `DEV_MODE` (was: hidden when `DEV_MODE=false`)
- When `DEV_MODE=true`: full panel with model switching (unchanged)
- When `DEV_MODE=false`: read-only explainability panel — shows model, provider/organization, tokens in/out, latency, cache status, principle count; no model switching
- Model selection rules unchanged: anonymous gets OpenThaiGPT only; logged-in users get OpenThaiGPT + Pathumma + Typhoon + THaLLE + Qwen 3.6 35B; Claude models remain DEV-only

### Home Page — "Before You Begin" section + footer notice
- Added compact "Before You Begin" section above the analysis form (visible only when not logged in)
- Two cards: "Choose Your Language" and "Please Sign in for More Analyses and More Models"
- Lists available models per user tier (anonymous vs logged-in)
- Footer notice added: "Dhamma AI Network provides ethical reasoning and educational reflection. It is not a substitute for professional legal, medical, mental health, or emergency services." (EN/TH bilingual)
- Section auto-hides when user logs in; subtle, unobtrusive design; no popup

### Follow-up daily limits — remaining counter fixed
- Follow-up remaining counter now uses actual backend usage data instead of hardcoded value
- Counter updates immediately after each successful follow-up
- Refreshes correctly after page reload (reads from session state)
- Example: limit=3 → shows 3, 2, 1, 0 as follow-ups are consumed

## Completed — 2026-06-15

### data/model_registry.json — added 9arm Qwen 3.6 35B model
- New entry: `qwen35b` with `provider: "9arm"`, `requires_login: true`, `max_tokens: 2000`
- Visible to logged-in users and admins; not visible to anonymous users

### agent.js — 9arm provider support
- Added `NINEARM_API_KEY` and `NINEARM_BASE_URL` env var loading
- Added `callWithProvider` branch for `provider === "9arm"` — OpenAI-compatible `fetch` to `${NINEARM_BASE_URL}/chat/completions`
- Same pattern as ThaiLLM: system prompt + user message, Bearer auth, usage extraction

### agent.js — Continue Thinking (follow-up) refactor
- `analyzeFollowUp` now accepts `requestedProvider` parameter
- Uses `resolveProvider(requestedProvider, tier)` + `getProviderConfig` + `callWithProvider` instead of hardcoded `getModel(tier)` + direct Anthropic SDK call
- Result includes `provider_used`, `latency_ms`, `model_used` (same as initial analysis)
- Follow-up now works with any configured model (OpenThaiGPT, Pathumma, Typhoon, THaLLE, Qwen 3.6 35B, Claude models in DEV)

### server.js — pass requestedProvider to follow-up
- `/follow-up` route now extracts `requestedProvider` from request body
- Passes it to `analyzeFollowUp()`

### public/index.html — follow-up sends selected model + removed DEV_MODE gate
- `sendFollowUp()` now reads model select and sends `requestedProvider` (same as analysis)
- Removed `!devMode && followupRemaining <= 0` gate — follow-up now works for all users
- Rate limiting handled by server-side `checkRateLimit` (returns 429)

### .env — 9arm credentials added
- `NINEARM_API_KEY`, `NINEARM_BASE_URL`, `NINEARM_MODEL` added with real values

### 9arm 524 error analysis (docs/Error1.md + Agent error Provider [qwen35b] fail.md)
- Cloudflare 524 = origin server timeout, not a code bug
- Verified: `qwen3.6-35b-a3b` is a supported model on 9arm (confirmed via /models endpoint)
- Full system prompt payload: ~3,700 chars (~925 tokens) + 200 char user message = ~4,258 chars total
- Payload structure identical to ThaiLLM (OpenAI-compatible /chat/completions)
- Replay test: same full prompt completed in 14.8s on 9arm — 524 was transient infrastructure issue
- No code changes needed for the 524; only improvement would be fetch timeout (deferred)

## Completed — 2026-06-16 (Home Page UX Revision + Language Selector + Dark Mode Icon)

### Home Page UX Revision (docs/Home Page UX Revision.md)
- Removed "Before You Begin" two-card section from screen-input (was: language card + sign-in card)
- Added compact inline notice (`#home-notice`) in top-right of landing screen (screen-landing)
- Notice text: EN="Before you start, please select your language and login for full version." / TH="ก่อนเริ่ม โปรดเลือกภาษาและเข้าส่อระบบเพื่่อใช้งานฉบับเต็ม"
- Notice visible only on landing screen when NOT logged in; disappears after login
- `updateHomeNotice(loggedIn)` function added; called from `showScreen()` and `applyAuthState()`
- Removed old `byb_*` i18n keys from both EN and TH sections

### Footer Disclaimer (docs/Home Page UX Revision.md)
- Added `#footer-notice` section with `data-i18n="footer_disclaimer"` span
- EN: "Dhamma AI Network provides ethical reflection and educational reasoning. It is not a substitute for legal, medical, mental-health, or emergency services."
- TH: corrected Unicode combining characters in Thai text
- CSS: `.footer-notice` — centered, smaller typography, muted styling

### Language Selector UX (docs/Language selector UX.md)
- Replaced EN/TH toggle buttons with compact dropdown (`#lang-dropdown`)
- Desktop: "🌐 Language ▼" toggle button; Mobile: "🌐" icon only (text/arrow hidden via media query)
- Dropdown items: 🇹🇭 ไทย and 🇬🇧 English
- `toggleLangMenu()` / `closeLangMenu()` functions added; click-outside handler closes dropdown
- `setLang()` updated to use dropdown active state + lang label
- CSS: `.lang-dropdown`, `.lang-dropdown-toggle`, `.lang-dropdown-menu`, `.lang-option` in components.css
- Old `.lang-toggle` / `.lang-btn` CSS removed from layout.css

### Dark Mode Icon Toggle (docs/Language selector UX.md)
- Replaced "Dark"/"Light" text button with 🌙/☀️ icon toggle
- `toggleDark()` now sets `textContent` to emoji instead of text
- `.header-btn-icon` class added for compact icon button styling

### CSS cleanup
- Removed `.byb-title`, `.byb-grid`, `.byb-card` styles from components.css
- Added `.home-notice-text`, `.lang-dropdown*`, `.header-btn-icon` styles

## Completed — 2026-06-16 (Error Fixes — Rate Limit Messages, Debug Panel, Thai Footer)

### Error 1: Rate limit error messages (data/messages.json)
- Already working correctly — no changes needed
- Backend in `server.js` loads `data/messages.json` and returns localized `message` field with 429 responses
- Frontend displays via `alert(errBody.message)` on both `/analyze` and `/follow-up` 429 errors
- Error codes: `rate_limit_minute`, `guest_daily_limit`, `user_daily_limit`
- Thai messages in `messages.json` confirmed readable

### Error 2: Debug panel not showing data (user mode)
- Root cause: debug panel population code was wrapped in `if (devMode)` block, so it only ran in DEV_MODE
- Restructured debug panel to show for all users:
  - Sidebar `#dev-panel` elements (`#dev-provider`, `#dev-model`, `#dev-tokens`, `#dev-latency`, `#dev-parse`, `#dev-cache`, `#dev-principles`) now populated for all users
  - Result section `#dev-result-section` now always visible (removed `style="display:none"`)
  - Basic info shown for all users: model, provider, latency, tokens, parse status, principle counts
  - Advanced info (provider_key, model_id, cache, dhamma_level, exposure_level, risk_flags, sub-principles, mapping trace) remains behind `if (devMode)` guard

### Error 3: Thai footer text unreadable
- Line 439 had broken Thai text with extra spaces between every character (Unicode combining character issues)
- Replaced with clean Unicode text matching line 389 (EN section version)
- Both lines now use: `Dhamma AI Network เป็นเครื่องมือเพื่อไตรตรองเชิงจริยธรรมและการเรียนรู้ ไม่ใช่คำแนะนำทางกฎหมาย การแพทย์ สุขภาพจิต หรือบริการฉุกเฉิน`
- Fixed missing comma after `footer_disclaimer` on line 439 (was causing JavaScript syntax error that prevented entire page script from loading)

## Completed — 2026-06-18

### Footer disclaimer — English translation fixed
- Line 389 (`en` section) had Thai text instead of English for `footer_disclaimer`
- Replaced with proper English: "Dhamma AI Network is a tool for ethical reflection and learning. It is not professional advice in law, medicine, mental health, or emergency services."
- Thai section (`th`, line 439) retained unchanged
