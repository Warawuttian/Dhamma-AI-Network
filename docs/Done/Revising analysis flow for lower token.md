Revising analysis flow for lower token
Do not refactor unrelated files.
1. Remove Situation Summary
- Do not ask LLM to generate summary.
- Remove summary from output schema.
- UI should display original user input instead:
  - Option A
  - Option B
  - Context if present
2. Reduce prompt input tokens
- Never send all principles to Claude.
- Run selector locally first.
- Prompt should include only:
  - 4 compressed base rules
  - top 2 contextual principles
  - top 3 contextual principles only if DEV_DEEP_MODE=true
- For each principle send only:
  - name_en
  - one-line behavior_instruction
- Do not send hash, tags, risk_relevance, examples, dropdown labels, or full principle JSON.
3. Base rules only
Use these 4 short base rules:
- Think carefully; separate facts from assumptions.
- Avoid harm, deception, exploitation, and reckless action.
- Do not claim certainty without evidence.
- Consider foreseeable consequences.
4. Disable few-shot in normal mode
- Do not include reasoning_examples in normal/dev cost-saving mode.
- Use reasoning_examples only if EVAL_MODE=true.
5. Validation
Before returning result:
- recommendation must not be empty
- perspective must not be empty
- option_a fields must not be empty
- option_b fields must not be empty
Labels alone are invalid.

If any field is missing:
- retry once with a repair prompt for missing fields only
- do not rerun full analysis unless necessary
6. Principle hashes
- Do not ask Claude to output hashes.
- Attach hashes locally from data/principles.json after response.

Goal:
For short inputs, target:
- input tokens under 800
- output tokens 350–600
- no missing Option A/B fields