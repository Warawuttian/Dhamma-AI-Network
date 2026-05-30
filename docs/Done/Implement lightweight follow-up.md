Implement lightweight follow-up reasoning flow.

Do not refactor unrelated files.

Goal:
Follow-up should remain under Dhamma Engine control without full expensive rerun every time.

Requirements:

1. On initial analysis:
- run full concept detection
- run selector
- store:
  - original optionA
  - original optionB
  - original context
  - selected contextual_principles
  - detected_concepts
  - last recommendation
  - short conversation_summary

2. On follow-up:
- receive followup_text + previous analysis state

3. Run cheap concept drift check:
- detect concepts from followup_text
- compare with previous detected_concepts
- if same topic: reuse previous contextual_principles
- if new concept appears strongly: add max 1 new contextual principle
- if topic changes significantly: rerun selector fully

4. Follow-up prompt should include only:
- 4 compressed base rules
- previous recommendation summary
- original Option A / Option B / Context
- current follow-up question
- reused contextual principles
- max 1 newly added principle if needed

5. Do not append full chat history.
6. Do not send all principles.
7. Keep follow-up output short:
- answer: max 4 sentences
- principle_note: max 2 bullets
- recommendation_update: optional, max 2 sentences

8. DEV debug should show:
- previous_concepts
- followup_concepts
- drift_level: low | medium | high
- reused_principles
- added_principles
- rerun_selector: true | false

9. If DEV_MODE=true, do not decrement follow-up quota.