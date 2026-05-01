# Dhamma Protocol vs Fine-tuned AI — A Technical Distinction

## What is Fine-tuning?

Fine-tuning means training an existing AI model on additional data so it responds in a specific style, domain, or format more consistently.

**Advantages:**
- Fluent, natural responses
- Consistent tone and style
- No need to inject long prompts every time

**Disadvantages:**
- Difficult to change core principles after training
- Hard to debug why the model answered a certain way
- Locked to one model provider
- Requires large amounts of training data
- If principles change, the entire model must be retrained
- Transparent reasoning is difficult to achieve

---

## How Dhamma Protocol is Different

Dhamma Protocol is not fine-tuning. It does not modify any model's weights or internal behavior.

Instead, it is a **reasoning layer that sits above any model** — a structured system composed of:

```
principles.json        — the ethical knowledge base
alias_map              — concept linking across traditions
selector               — chooses which principles apply
prompt_builder         — constructs reasoning context
reasoning_examples     — guides step-by-step thinking
output schema          — structures transparent response
```

In short: **Dhamma Protocol builds a thinking system, not a trained model.**

---

## Side-by-Side Comparison

| Dimension | Fine-tuned AI | Dhamma Protocol |
|-----------|--------------|-----------------|
| Core lives in | The model itself | principles + selector |
| Switch AI providers | Difficult | Easy — model-agnostic |
| Explain reasoning | Limited | Yes — shows which principle was used |
| Add new principles | Requires retraining | Add a JSON file |
| Verifiable | Hard to audit | Traceable via blockchain hash |
| Cost to update | Expensive retraining | Prompt / RAG / caching |
| Ecosystem fit | Provider-dependent | Works with any LLM |

---

## The Key Distinction

A fine-tuned model can answer *as if it knows* Buddhist ethics.

Dhamma Protocol can answer *and show its work* — specifying:

- Which principle was applied
- Why that principle was selected
- Which blockchain hash anchors the reasoning
- Which reasoning steps were followed

This is the difference between a model that has absorbed ethical knowledge and a system that **actively reasons through an ethical framework**.

---

## A Simple Analogy

> **Fine-tuning** = Teaching a person to speak in a Dhamma-inspired style
>
> **Dhamma Protocol** = Building a council of principles that reviews every answer before it is given

---

## Why This Matters

If successful, Dhamma Protocol is not a single chatbot.

It is a **portable moral reasoning framework** — deployable with:

- OpenAI (ChatGPT)
- Anthropic (Claude)
- Google (Gemini)
- Local open-source models
- AI agents built by third parties
- Any external API

The ethical core remains intact regardless of which model executes it — because the reasoning lives in the **system**, not in the model's weights.

---

## Summary

> Fine-tuning changes a model's habits.
>
> Dhamma Protocol gives any model a compass.
