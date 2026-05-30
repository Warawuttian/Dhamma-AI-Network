Create model_registry.json

{
  "haiku": {
    "provider": "anthropic",
    "model": "claude-3-haiku",
    "tier": "free",
    "max_tokens": 1200,
    "supports_reasoning": true
  },

  "sonnet": {
    "provider": "anthropic",
    "model": "claude-sonnet-4",
    "tier": "supporter",
    "max_tokens": 2000,
    "supports_reasoning": true
  }
}


Create engine_rules.json

{
  "selector": {
    "max_contextual_principles": 3,
    "allow_duplicate_across_concepts": true,
    "repetition_penalty": 0.15
  },

  "output": {
    "max_perspective_lines": 3,
    "max_recommendation_lines": 4,
    "force_clear_recommendation": true
  },

  "safety": {
    "avoid_sycophancy": true,
    "require_uncertainty_if_low_confidence": true
  }
}