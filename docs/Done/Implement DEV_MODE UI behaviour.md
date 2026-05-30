Implement DEV_MODE UI behaviour.
Set default model = claude-haiku.
1. Add env flag:
DEV_MODE=true
2. If DEV_MODE=true:
A. Show small fixed debug panel (bottom-right):
- model_used
- token_usage
- cache_hit
- number_of_principles
B. In analysis result:
Add collapsible section:
"Debug Info (dev only)"
Include:
- selected_principles
- principle_hashes
- user_dhamma_level
- exposure_level
- risk_flags
C. Optional top banner:
"DEV MODE"
D. Allow unlimited analyze/follow-up
3. If DEV_MODE=false:
- apply normal quota rules
- hide all debug UI completely
4. Important:
- Do NOT change main UI layout
- Do NOT expose debug info to normal users
Goal:
Keep UI clean while enabling developer visibility.