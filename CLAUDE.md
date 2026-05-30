# Dhamma AI Network

Node.js + Express moral reasoning engine using Claude API.

## Start
```
node server.js  # http://localhost:3000
```

## Key files
- `server.js` — API routes
- `agent.js` — Claude prompt builder + analyzer
- `selector.js` — principle scoring + risk detection
- `adaptive_response.js` — Dhamma level detection + exposure formatting
- `data/principles.json` — 47 principles (v0.4)
- `data/concept_keywords.json` — 12 domains, EN+TH keywords
- `data/concept_to_principles.json` — domain → principle mapping
- `data/model_registry.json` — model IDs + max_tokens per tier
- `data/engine_rules.json` — selector + output + safety config
- `data/alias_map.json` — 125 signal entries
- `public/index.html` — full UI (EN/TH)

## Stack
- `@anthropic-ai/sdk`, `express`, `jsonrepair`, Node 20+
- Requires: `ANTHROPIC_API_KEY`

## Environment flags
- `DEV_MODE=true` — disables quota enforcement
- `DEV_DEEP_MODE=true` — no longer needed (3 contextual principles always used now)
- `EVAL_MODE=true` — enables few-shot examples (default: off)

## Current Status (v0.5)
- 47 principles in data/principles.json
- 12 concept domains in concept_keywords.json + concept_to_principles.json
- UI: EN/TH bilingual, 9 screens (+ ideology/project/about pages)
- Header + left sidebar nav; dark/light mode toggle
- CSS split into public/styles/ (5 files)
- 3 contextual principles in all modes (was 2 normal / 3 DEV_DEEP)
- Sub-principles shown in Principles Used section
- data/about.json, ideology.json, project.json — individual page data (fetched on demand)
- Frontend renderer: type-dispatched, handles hero_text/text_section/feature_grid/research_grid/layer_stack/image_section/comparison/status_table/supporters
- Base principles (always 4): Yonisomanasikara, Five Precepts, Kalama Sutta, Appamada
- Crisis domain: short-circuit to crisis_first response mode

## What still needs doing
1. Login system (Google OAuth or session-based)
2. API usage limit (10/day per session)
3. Blockchain logging (Stellar)
4. AI-to-AI multi-agent system

## Claude Code Rules

### Before starting any task
- Read this file first — do not read README_SESSION.md unless explicitly asked
- README_SESSION.md = archive log only

### After completing any task
- Add a "## Completed — YYYY-MM-DD" section to README_SESSION.md with details
- Update "What still needs doing" in THIS file (CLAUDE.md) — remove done items
- Keep CLAUDE.md under 80 lines
- Keep README_SESSION.md — append only, never delete history

### Code rules
- JSON files: no unnecessary newlines, comma-separated strings over arrays where possible
- Never commit `.env` or `node_modules`
- Token-efficient prompts: behavior_instruction only, no hash/tags in LLM prompt
- Hashes attached locally after LLM response — never ask Claude to generate hashes

### Model tiers
- `haiku` → `claude-haiku-4-5-20251001` (free tier, 600 max_tokens)
- `sonnet` → `claude-sonnet-4-6` (supporter tier, 900 max_tokens)