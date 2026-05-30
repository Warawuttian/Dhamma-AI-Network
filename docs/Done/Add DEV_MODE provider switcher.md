Add DEV_MODE provider switcher for Claude and ThaiLLM.
Goal:
In DEV_MODE, allow manual switching between providers:
- Claude
- ThaiLLM

This must work for both Thai and English inputs.

Requirements:
1. Add provider registry
Create/update:
data/model_registry.json

Include:
- claude_haiku
- claude_sonnet
- thaillm
2. Add env vars:
THAILLM_API_KEY=
THAILLM_BASE_URL=
THAILLM_MODEL=
DEFAULT_PROVIDER=claude_haiku
DEV_MODE=true
3. Frontend DEV UI:
If DEV_MODE=true, show provider dropdown:
Provider:
- Claude Haiku
- Claude Sonnet
- ThaiLLM
Do not show this dropdown when DEV_MODE=false.
4. API input:
Allow /analyze to receive:
{
  "requestedProvider": "claude_haiku | claude_sonnet | thaillm"
}
5. Provider logic:
- If DEV_MODE=true: use requestedProvider
- If DEV_MODE=false: ignore requestedProvider and use production default
- Do not auto-switch by language yet
6. Keep selector unchanged:
Same selector
Same principles
Same prompt_builder
Only model provider changes.
7. Provider metadata:
Return and show in debug:
{
  "provider_used": "",
  "model_used": "",
  "input_tokens": 0,
  "output_tokens": 0,
  "latency_ms": 0,
  "parse_success": true
}
8. Fallback:
If ThaiLLM fails or JSON parse fails:
- log error
- show error in DEV_MODE
- do not silently replace with Claude unless user enables fallback
9. UI:
In result debug panel show:
Provider used: ThaiLLM / Claude
Parse success
Latency
Token usage if available
10. Do not affect quota in DEV_MODE.