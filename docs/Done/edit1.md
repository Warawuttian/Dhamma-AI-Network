1.แก้ไข :   เปลี่ยน 22 core principles ไปเป็น interpretation 


Update interpretation usage logic:

Interpretations are NOT core reasoning modules.

They must be treated as:

* optional perspective
* contextual insight
* non-authoritative

Rules:

1. Core principles must always be selected first

2. Interpretations can only be injected AFTER principles

3. Max 1–2 interpretations per request

4. Interpretations must NEVER override core principles

5. Interpretations must be phrased as:

   * "One perspective is..."
   * "Another way to see this is..."

6. If conflict occurs:

   * Core principles win
   * Interpretations are ignored

7. Do NOT include interpretations in:

   * principles_used
   * principle_hashes

Instead include:

* interpretations_used (separate field)

Update output schema:

{
"principles_used": [],
"principle_hashes": [],
"interpretations_used": []
}
