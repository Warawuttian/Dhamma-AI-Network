Update the prompt in agent.js with these requirements:

Response must be valid JSON with this exact field order:

1\. summary (1-2 sentences)

2\. recommendation (2-4 sentences)  

3\. perspective (2-3 bullet points)

4\. option\_a (short)

5\. option\_b (short)

Rule:

&#x20;-ALL fields must be filled, no empty fields
 -Be concise. Do not over-explain. Prioritize clarity over length.

&#x20;-Max tokens ≤ 350

&#x20;-Return valid JSON only, start with { end with }

