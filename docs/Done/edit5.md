5. Build selector

Build selector v2 for the Dhamma Moral Reasoning Engine.

Goal:
Select the best 1–3 principles for each user dilemma without relying only on hardcoded if/else.

Files involved:

* principles.json
* alias_map.json
* interpretations.json
* selector.js

---

## Selector v2 Logic

Input:
{
"optionA": "...",
"optionB": "...",
"context": "..."
}

Output:
{
"selected_principles": [
{
"hash": "...",
"name": "...",
"score": 0.92,
"reason": "Matched harm + truth concern"
}
],
"selected_interpretations": []
}

---

## Step 1: Normalize Input

Combine optionA + optionB + context into one text.

Normalize:

* lowercase
* remove punctuation
* basic stemming if possible
* split into tokens

---

## Step 2: Extract Signals

Detect signals from text:

* harm
* lying / truth
* uncertainty / confusion
* suffering / stress
* repeated pattern / habit
* anger / greed / fear / emotional bias
* relationship / trust
* extreme either-or
* belief / claim / authority
* attachment / loss / identity
* compassion / emotional harm
* long-term risk / regret
* knowledge confidence issue
* fairness / equality / equity / diversity

---

## Step 3: Alias Map Match

Use alias_map.json to map signals to principle hashes.

Example:

* awareness → Satipatthana 4
* balance → Middle Path
* well-being → Four Noble Truths + Five Precepts
* non-harm → Five Precepts
* truth → Five Precepts + Kalama Sutta
* relationship → Kalyanamitta
* compassion → Brahmavihara 4
* attachment → Three Characteristics
* pattern → Paticcasamuppada
* bias → Ten Defilements
* critical-thinking → Kalama Sutta

---

## Step 4: Score Principles

Each principle score:

score =
base_weight

* signal_match_score
* trigger_match_score
* alias_match_score

- overuse_penalty

Rules:

* Exact trigger match: +0.20
* Alias match: +0.15
* Strong emotional signal: +0.10 for Defilements / Satipatthana / Brahmavihara
* Harm signal: +0.15 for Five Precepts
* Uncertainty signal: +0.15 for Yonisomanasikara / Kalama Sutta
* Suffering signal: +0.15 for Four Noble Truths
* Repeated pattern signal: +0.15 for Paticcasamuppada
* Extreme choice signal: +0.15 for Middle Path
* Attachment signal: +0.15 for Three Characteristics
* Relationship signal: +0.15 for Kalyanamitta
* Long-term risk signal: +0.15 for Appamada
* Knowledge-confidence signal: +0.15 for Panna 3

Normalize final score to 0–1.

---

## Step 5: Always Consider Yonisomanasikara

Yonisomanasikara is the meta-reasoning engine.

If no principle scores above threshold:

* select Yonisomanasikara
* optionally add Kalama Sutta if claim/belief appears
* optionally add Four Noble Truths if suffering appears

---

## Step 6: Limit Selection

Return:

* top 3 principles only
* avoid selecting principles with nearly identical roles unless strongly needed

Do not select both:

* Idappaccayata and Paticcasamuppada unless repeated causal chain is explicit
* Satipatthana and Yonisomanasikara unless emotional confusion is explicit
* Four Noble Truths and Three Characteristics unless suffering comes from attachment

---

## Step 7: Interpretation Selection

Interpretations are optional.

Use interpretations only if:

* relevant tag match exists
* confidence score > 0.65
* max 1 interpretation for free users
* max 2 interpretations for supporters

Interpretations never override core principles.

---

## Step 8: Unknown Signal Handling

If a user uses new terms not in alias_map:

Example:

* equality
* equity
* diversity
* justice
* autonomy

Then:

1. try semantic fallback by comparing term to principle tags
2. if uncertain, select:

   * Yonisomanasikara
   * Kalama Sutta
3. log unknown term:

{
"unknown_term": "...",
"input_excerpt": "...",
"suggested_principles": [],
"needs_review": true
}

---

## Step 9: Output Explanation

For each selected principle, include short reason.

Example:
{
"hash": "...",
"name": "Five Precepts",
"score": 0.94,
"reason": "Detected harm/truth concern"
}

---

## Step 10: Implementation Requirements

Implement selector.js with:

* loadPrinciples()
* loadAliasMap()
* extractSignals(text)
* scorePrinciples(signals, principles, aliasMap)
* selectPrinciples(input, userTier)
* selectInterpretations(input, selectedPrinciples, userTier)

Keep it simple and deterministic first.
Do not call LLM inside selector v2.

LLM should only be called after selector finishes.
