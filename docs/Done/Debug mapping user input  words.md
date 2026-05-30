Debug mapping: user input > words > concept > contextual principles
Add DEV debug mapping trace.
Goal:
Show how selector mapped user input to principles.

Requirements:
1. In selector.js, return mapping_trace:
{
  "input_terms_matched": [
    {
      "term": "",
      "source": "concept_keywords | alias_map | pattern",
      "concept": "",
      "matched_text": ""
    }
  ],
  "detected_concepts": [
    {
      "concept": "",
      "score": 0,
      "matched_terms": []
    }
  ],
  "candidate_principles": [
    {
      "principle_id": "",
      "source_concept": "",
      "base_weight": 0,
      "concept_score": 0,
      "final_score": 0
    }
  ],
  "final_contextual_principles": []
}

2. UI:
Show this only when DEV_MODE=true:
"Mapping Debug"
User input → matched words → concepts → selected principles

3. Do not send mapping_trace to LLM.
4. Do not show mapping_trace to normal users.
5. Keep trace compact and readable.
6. alias_map should be fallback/direct shortcut only.
7. concept_keywords + concept_to_principles are primary.