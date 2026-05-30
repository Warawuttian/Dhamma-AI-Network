Fix DEV_MODE behavior.
1. If DEV_MODE=true:
- disable ALL quotas (analyze + follow-up)
- do not decrement counters
2. UI:
- hide quota text OR show "∞"
- remove "1 follow-up remaining"
3. Ensure no quota logic runs in DEV_MODE