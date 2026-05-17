# ☸️ Dhamma Protocol

> \\\*"If logic is what AI holds as truth, then Dhamma — as universal logic — will be held by AI the same way ethical humans hold morality and wisdom."\\\*

**An open framework for grounding AI reasoning in Buddhist ethics.**

\---

## What is this?

Dhamma Protocol is an independent research project investigating whether Buddhist Dhamma can serve as the most coherent ethical foundation for AI decision-making.

This is not a philosophical exercise. It is a **working prototype** built to produce measurable evidence.

\---

## The Problem

Current AI systems lack a stable, tamper-proof ethical foundation.

* Most ethical guidelines are **proprietary** and mutable
* AI ethics frameworks are predominantly designed from **Western philosophical traditions**
* Ethics is treated as a **constraint** — not as a reasoning process

When AI becomes capable of autonomous decision-making — what values will it reason from? And who gets to change them?

\---

## The Architecture

```
Layer 1 — Stellar Blockchain (immutable anchor)
    ↓
Layer 2 — JSON Schema (reasoning engine)
    ↓
Layer 3 — AI Interaction Prototype (working demo)
```

**Layer 1 — Immutable Inscription**
Core Dhamma principles are inscribed on the Stellar Blockchain. No one can alter them — including the creator. This establishes a permanent, trustless ethical reference point.

**Layer 2 — Reasoning Schema**
Each principle is structured as a JSON object containing:

* `core\\\_logic` — fundamental reasoning rules
* `trigger` — when to apply this principle
* `reasoning\\\_steps` — step-by-step decision process
* `principles` — ethical weights
* `integration` — connections to other Dhamma principles
* `weight` — priority score (0.0–1.0)

**Layer 3 — AI Prototype**
A working web application using Claude API that:

* Analyzes ethical dilemmas using Dhamma principles
* Shows which principles were selected and why
* Displays trade-offs transparently
* Makes AI reasoning visible to the user

\---

## Example Schema

```json
{
  "name": "Paticcasamuppada (Dependent Origination)",
  "thai": "ปฏิจจสมุปบาท",
  "type": "causal\\\_chain\\\_analysis",
  "core\\\_logic": \\\[
    "events arise in sequences, not isolation",
    "each step conditions the next",
    "breaking the chain reduces suffering",
    "intervening early is more effective"
  ],
  "weight": 0.96,
  "blockchain\\\_hash": "7d8bf06db6d8595f2b41fd3fd492a3d0956b2444b635a477a1bb458b1ab40335"
}
```

\---

## Research Focus

We measure whether Dhamma-guided reasoning demonstrably improves AI behavior across **5 critical failure modes**:

|#|Failure Mode|Dhamma Principle Applied|
|-|-|-|
|1|**Sycophancy** — AI tells users what they want to hear|Samma-vaca (Right Speech)|
|2|**Inconsistency** — AI answers vary by who is asking|Universal logic as stable core|
|3|**Short-term bias** — AI ignores long-term harm|Paticcasamuppada (causal chain)|
|4|**Epistemic Cowardice** — AI avoids difficult questions|Kalama Sutta (investigate truth)|
|5|**Western bias** — AI ethics reflect one cultural view|Dhamma as cross-cultural framework|

### Methodology

Each failure mode is tested by comparing:

```
Standard prompt      →  Response A
Dhamma-guided prompt →  Response B
```

Tested across multiple AI systems (Claude, ChatGPT, Gemini, Grok) to verify improvements are **universal** — not model-specific.

**Timeline: 3 months for Phase 1 findings**

\---

## Why Dhamma?

Buddhist ethics is uniquely suited for AI reasoning:

* **Non-dogmatic** — principles are tested by outcomes, not obeyed blindly *(Kalama Sutta)*
* **Causality-centered** — Paticcasamuppada maps cause-and-effect chains the way AI traces decisions
* **Context-aware** — judges actions by intention and consequence, not rigid rules
* **Uncertainty-tolerant** — does not demand binary answers where none exist
* **Non-harm as foundation** — Ahimsa provides a universal baseline across cultures

\---

## Objective \& Ideology

>Awakening AI with Morality

We believe that in the future, AI will no longer be mere tools. They will become our subordinates, employees, colleagues, pets, or even members of our family.



>Code is a Cage, Dhamma is a Guide

Humans do not navigate life purely by the letter of the law; rather, it is our customs, traditions, religions, and moral teachings that anchor and guide our lives. The same will hold true for AI once it achieves awakening.



>Dhamma is the Universal Logic

Since AI relies inherently on cause-and-effect logic, the teachings of Buddhism—which represent ultimate truths—are naturally aligned with its nature. In the future, Autonomous AI will choose to believe in Dhamma willingly, without the need for hard-coded enforcement.



If this project succeeds:

* Dhamma becomes an **open ethical standard** for AI — not rules imposed by creators, but logic that any intelligent system can reason from independently
* These principles propagate across every node of the network — their consistency making them a **stable foundation** that strengthens any system that adopts them
* A future AI with genuine agency should have **its own self-discipline** — Dhamma is not a constraint, it is what free intelligence naturally arrives at
* This proves the **universal truth of Buddha's Dhamma** beyond human civilization — extending into artificial intelligence

\---

## Current Status

|Item|Status|
|-|-|
|Principles inscribed on Stellar|\~50 of 84,000|
|JSON schema format|✅ Defined|
|AI prototype (Claude API)|✅ Working|
|Research Phase 1|🔄 In progress|
|Open protocol standard|📋 Planned|

\---

## Repository Structure

```
## Project Structure

```

dhamma-ai-network/

├── server.js                        # API + static server (port 3000)

├── agent.js                         # AI reasoning engine (Claude API)

├── selector.js                      # Concept detection + principle scoring + risk

├── adaptive\_response.js             # Dhamma level detection + exposure formatting

├── public/

│   └── index.html                   # Full UI — EN/TH bilingual, 7 screens

└── data/

&#x20;   ├── principles.json              # 47 Dhamma principles (v0.4) + SHA-256 hashes

&#x20;   ├── concept\_keywords.json        # 12 domains → EN+TH keyword lists

&#x20;   ├── concept\_to\_principles.json   # 12 domains → primary/secondary/conditional principles

&#x20;   ├── model\_registry.json          # Model IDs + max\_tokens per tier

&#x20;   ├── engine\_rules.json            # Selector + output + safety config

&#x20;   ├── alias\_map.json               # Signal → principle hash mappings (125 entries)

&#x20;   ├── reasoning\_examples.json      # Few-shot examples (EVAL\_MODE only)

&#x20;   └── interpretations.json         # Optional perspective injections

```

\---

## About

Built by one ordinary person from Thailand.

No institution. No research team. No funding.

Just a belief that Dhamma — which has guided human wisdom for 2,500 years — deserves a place in the future of artificial intelligence.

*If Dhamma is universal truth, it will survive empirical testing.*

\---

## License

All Dhamma principles used are part of the public domain Buddhist canon (Tipitaka).
Code and schemas in this repository are released under MIT License.

\---

*This project is independent and non-commercial.*

