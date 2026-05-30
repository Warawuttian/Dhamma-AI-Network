Reduce API cost
1. Use Haiku as default model.
2. Set max output tokens:
   - free/dev normal analyze = 350 tokens
   - follow-up = 180 tokens
3. Make responses concise by default.
4. Add prompt rule:
   "Answer concisely. Do not over-explain. Use only essential reasoning."
5. Enable exact cache:
   same normalized input + same selected principles + same model = return cached response.
6. In DEV_MODE, show token usage after each request.