env override:
const maxTokens =
  Number(process.env.THAILLM_MAX_TOKENS) ||
  modelConfig.max_tokens;