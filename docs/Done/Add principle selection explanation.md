Add principle selection explanations to initial analysis.

Goal:
User should understand why the chosen contextual principles are relevant.

Important:
Selector chooses principles, not the LLM.
LLM only explains the relevance of the already selected principles.

Requirements:

1. Backend must pass selected contextual principles to LLM with:
- id
- name_en
- name_th
- one-line behavior_instruction
- selector_reason if available

2. LLM output should include:
principle_reasons: [
  {
    "principle_id": "",
    "reason": ""
  }
]

3. Each reason:
- max 1 sentence
- plain language
- must connect the principle to the user input
- must not claim the LLM selected it

4. UI:
Under Contextual Principles, show:
"Why relevant: ..."

5. Do not include reasons for base principles by default.
6. Do not increase output length much.
7. If selector already generated reason, prefer selector_reason over LLM-generated reason.