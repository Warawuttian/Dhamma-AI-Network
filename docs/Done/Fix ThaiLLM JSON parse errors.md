Fix ThaiLLM JSON parse errors.

Problem:
ThaiLLM sometimes returns:

<think>...</think>
{ valid json }

This breaks JSON.parse and causes:
Unexpected character "<"

Requirements:

1. Add helper:
   cleanModelJsonText(text)

2. The helper must:

* remove <think>...</think> blocks
* trim whitespace
* extract the first valid JSON object
* return cleaned JSON string

Example logic:

```js
function cleanModelJsonText(text) {
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }

  return cleaned;
}
```

3. Apply this cleaner before JSON.parse for ThaiLLM responses.
4. Keep Claude/OpenAI providers unchanged unless safe.
5. If parse still fails:

* log raw response
* return readable DEV error
* do not crash frontend

6. Update ThaiLLM system prompt:
   "Return ONLY valid JSON. No <think>, markdown, or explanations."
