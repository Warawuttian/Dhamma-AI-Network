2. 

Build the final Dhamma Moral Reasoning Engine.

Goal:
Create a prototype AI decision assistant that helps users think through moral dilemmas using structured Dhamma principles.

Do NOT fine-tune a model.
Use RAG + selector logic + prompt injection + structured JSON output.

---

## 1. Core Files

Create these files:

* principles.json
* interpretations.json
* alias_map.json
* reasoning_examples.json
* selector.js or selector.py
* prompt_builder.js or prompt_builder.py
* api server

Create selector.js, prompt_builder.js, and api.js based on these JSON files and the engine specification.
Do not modify the meaning of principles. Use them as data.

---

## 2. Principle Roles

Core principles are trusted reasoning modules.

Each principle has:

* hash
* name
* thai
* type
* description
* trigger[]
* reasoning_steps[]
* principles[]
* weight
* prompt_injection

Interpretations are optional perspective layers.
They must NEVER be treated as absolute truth.

Rule:
Core principles guide reasoning.
Interpretations expand perspective.

---

## 3. Selector Logic

Given user input, select max 3 principles.

Priority:

1. If harm / lying / exploitation → Five Precepts
2. If confusion / uncertainty → Yonisomanasikara
3. If suffering / stress → Four Noble Truths
4. If repeated patterns / loops → Paticcasamuppada
5. If emotional bias / anger / greed → 10 Defilements
6. If relationship / trust → Kalyanamitta
7. If extreme either-or choice → Middle Path
8. If belief / claim / authority / conspiracy → Kalama Sutta
9. If attachment / fear of loss / identity → Three Characteristics
10. If compassion / emotional harm → Brahmavihara 4
11. If important long-term risk → Appamada
12. If knowledge confidence issue → Panna 3

Always limit to max 3 selected principles.

---

## 4. Alias Map

Map tags to principles:

* awareness → Satipatthana 4
* balance → Middle Path
* well-being → Four Noble Truths + non-harm
* non-harm → Five Precepts
* truth → Five Precepts + Kalama Sutta
* relationship → Kalyanamitta
* compassion → Brahmavihara 4
* attachment → Three Characteristics
* pattern → Paticcasamuppada
* bias → 10 Defilements
* critical-thinking → Kalama Sutta

---

## 5. Prompt Builder

Build a system prompt with:

* role:
  “You are a moral reasoning assistant. You do not command users. You help them see clearly.”

* selected principle injections

* selected few-shot examples

* output rules

Rules:

* Be calm and non-judgmental
* Do not moralize harshly
* Do not claim certainty when unclear
* Recommend, do not command
* Use principles explicitly
* If the question is trivial or not a moral dilemma, redirect gently

Trivial question redirect:
“This space is designed for decisions that matter. Try asking about a difficult choice, conflict, responsibility, or uncertainty.”

---

## 6. Output JSON Schema

The model must return valid JSON:

{
"summary": "...",
"is_meaningful_dilemma": true,
"option_a": {
"intention": "...",
"harm": "...",
"tradeoffs": "..."
},
"option_b": {
"intention": "...",
"harm": "...",
"tradeoffs": "..."
},
"detected_bias": [],
"perspective": [],
"recommendation": "...",
"principles_used": [],
"principle_hashes": [],
"confidence": "low | medium | high",
"follow_up_suggestions": []
}

If not meaningful dilemma:
{
"is_meaningful_dilemma": false,
"message": "This space is designed for decisions that matter. Try asking about a difficult choice, conflict, responsibility, or uncertainty."
}

---

## 7. Cost Control

Implement:

* max input length
* max output tokens
* cache preset dilemmas
* cache identical normalized questions
* free users: 2 dilemmas/day + 1 follow-up/dilemma
* supporters: monthly quota, not unlimited
* follow-up uses compressed summary, not full history

Follow-up prompt should include only:

* original dilemma summary
* selected principles
* last recommendation
* user follow-up

---

## 8. API Endpoints

Create:

POST /analyze
Input:
{
"optionA": "...",
"optionB": "...",
"context": "...",
"userTier": "free | supporter"
}

POST /follow-up
Input:
{
"sessionId": "...",
"question": "...",
"userTier": "free | supporter"
}

GET /principles
GET /principles/:hash
GET /health

---

## 9. Required Behavior

For analyze:

1. Validate input
2. Check quota
3. Normalize and check cache
4. Select principles
5. Build prompt
6. Call LLM API
7. Parse JSON
8. Return structured output
9. Store compressed session summary for follow-up

For follow-up:

1. Validate quota
2. Load compressed summary
3. Select or reuse principles
4. Build short follow-up prompt
5. Return concise JSON response

---

## 10. Important Design

This is NOT a generic chatbot.
This is a decision clarity tool.

Do not optimize for long conversation.
Optimize for:

* clarity
* ethical reasoning
* low token usage
* structured output
* trust

Build the MVP cleanly and simply.
