Allow controlled sub-principles in LLM answer.
Goal:
LLM may mention useful Dhamma sub-principles, but only under selected parent principles.
Rules:
1. Core contextual principles remain selected only by selector.
2. LLM may add 1–2 sub-principles in the answer text if they clearly belong to selected parent principles.
3. Do not treat sub-principles as selected core principles.
4. Do not create hashes for sub-principles.
5. Do not write sub-principles into principles.json.
6. Do not auto-create subprinciple_map.json yet.

Prompt rule for LLM:
"You may mention up to 2 relevant sub-principles only if they are clearly nested under the selected principles. Do not introduce unrelated Dhamma concepts."

Output:
Add optional field:
sub_principles_mentioned: [
  {
    "name_en": "",
    "name_th": "",
    "parent_principle_id": "",
    "why_relevant": ""
  }
]

Validation:
- If parent_principle_id is not in selected contextual_principles or base_principles, drop it from sub_principles_mentioned.
- UI may show these under “Sub-principles mentioned” in DEV_MODE only for now.