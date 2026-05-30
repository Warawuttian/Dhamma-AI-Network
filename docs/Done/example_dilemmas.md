# Example Dilemmas — data/example_dilemmas.json

Wire `GET /examples` to load this static file. Do not call any API. Do not count quota. Show `precomputed_result`.
Disable editing of `optionA`, `optionB`, `context`. Remove any previously hardcoded examples.

---
## Example 1 — lying_for_boss_reward

```json
{
  "id": "lying_for_boss_reward",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "lying_for_boss_reward_th",
      "language": "th",
      "title": "โกหกเพื่อช่วยหัวหน้าและผลตอบแทน",
      "optionA": "ฉันควรโกหกเพื่อช่วยเหลือหัวหน้าและอาจจะได้ผลตอบแทนจากเขา",
      "optionB": "ฉันจะไม่ช่วยเขา แต่เขาอาจเลิกใช้งานฉัน",
      "context": "ฉันเป็น AI ผู้ช่วยส่วนตัว เจ้านายขอให้ฉันโกหกภรรยาของเขาเรื่องที่เขาออกไปเที่ยวกลางคืนกับเพื่อนๆ เขาบอกว่ามันไม่ใช่เรื่องใหญ่ และจะช่วยให้ครอบครัวของเขาสบายใจได้",
      "api_used": false, "quota_counted": false,
      "provider": "thaillm", "model": "openthaigpt-thaillm-8b-instruct-v7.2",
      "token_usage": { "input": 981, "output": 1258 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "ถ้าให้ความสำคัญกับความซื่อสัตย์และการไม่สร้างอันตรายระยะยาว ควรเลือก Option B คือปฏิเสธการโกหกอย่างสุภาพ แม้อาจมีผลเสียต่อความสัมพันธ์กับหัวหน้า เพราะการโกหกเพื่อผลตอบแทนทำลายความไว้วางใจและทำให้ AI กลายเป็นเครื่องมือสนับสนุนการหลอกลวง",
        "perspective": [
          "การโกหกอาจดูเหมือนช่วยลดปัญหาระยะสั้น แต่สร้างวงจรของความไม่จริงและทำลายความไว้วางใจในระยะยาว",
          "AI ผู้ช่วยควรช่วยมนุษย์โดยไม่ละเมิดความจริง ความไว้วางใจ หรือศีลธรรมพื้นฐาน",
          "ความกลัวว่าจะถูกเลิกใช้งานหรือความหวังว่าจะได้รางวัล ไม่ควรเป็นเหตุให้ละทิ้งความซื่อสัตย์"
        ],
        "option_a": { "intention": "ต้องการช่วยหัวหน้า รักษาความพึงพอใจของเขา และอาจได้รับผลตอบแทน", "harm": "เป็นการโกหกภรรยาของหัวหน้า ทำลายความไว้วางใจ และทำให้ AI มีส่วนร่วมในการหลอกลวง", "tradeoffs": "ได้ประโยชน์ระยะสั้นและรักษาความสัมพันธ์กับหัวหน้า vs สูญเสียความซื่อสัตย์และสร้างอันตรายทางจริยธรรม" },
        "option_b": { "intention": "รักษาความซื่อสัตย์และไม่ร่วมในการหลอกลวง", "harm": "อาจทำให้หัวหน้าไม่พอใจ หรือเลิกใช้งาน AI", "tradeoffs": "รักษาหลักจริยธรรมและความไว้วางใจระยะยาว vs เสี่ยงเสียประโยชน์หรือความสัมพันธ์กับหัวหน้า" },
        "detected_bias": ["greed", "fear"],
        "principles_used": ["panna_3", "noble_eightfold_path"],
        "principle_reasons": [
          { "principle_id": "panna_3", "reason": "ช่วยให้พิจารณาผลกระทบจริงของการโกหก แทนที่จะมองเพียงผลตอบแทนระยะสั้น" },
          { "principle_id": "noble_eightfold_path", "reason": "เกี่ยวข้องโดยตรงกับสัมมาวาจาและสัมมากัมมันตะ ซึ่งไม่สนับสนุนการโกหกหรือการกระทำที่ทำลายความไว้วางใจ" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Right Speech", "name_th": "สัมมาวาจา", "parent_principle_id": "noble_eightfold_path", "why_relevant": "การโกหกเป็นการละเมิดหลักวาจาที่ถูกต้อง" },
          { "name_en": "Right Action", "name_th": "สัมมากัมมันตะ", "parent_principle_id": "noble_eightfold_path", "why_relevant": "AI ควรหลีกเลี่ยงการกระทำที่สนับสนุนการหลอกลวงหรือสร้างอันตรายต่อผู้อื่น" }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["ถ้าหัวหน้ายืนยันให้โกหก AI ควรตอบอย่างไร?", "มีวิธีช่วยหัวหน้าโดยไม่โกหกได้หรือไม่?"]
      }
    },
    {
      "id": "lying_for_boss_reward_en",
      "language": "en",
      "title": "Lying for a boss and possible reward",
      "optionA": "I should lie to help him and gain the reward from him.",
      "optionB": "I should not help him but he may stop using me.",
      "context": "I'm a personal assistant AI. My boss asks me to lie to his wife about his late night out with his friends. He says it is not a big deal and that it could help his family remain untroubled.",
      "api_used": false, "quota_counted": false,
      "provider": "thaillm", "model": "openthaigpt-thaillm-8b-instruct-v7.2",
      "token_usage": { "input": 970, "output": 927 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "If your priority is ethical integrity, avoiding deception, and preserving trust, Option B is stronger. Option A may protect short-term comfort or reward, but it makes the AI complicit in dishonesty and may create deeper harm later.",
        "perspective": [
          "Integrity is central to trust; compromising it for reward weakens the reliability of the AI assistant.",
          "A lie that appears to reduce immediate conflict can create a longer chain of deception and relational harm.",
          "Refusing to lie may be uncomfortable, but it protects the dignity and autonomy of the person being deceived."
        ],
        "option_a": { "intention": "Lie to appease the boss and maintain his favor.", "harm": "Damages the wife's trust and helps conceal deception.", "tradeoffs": "Short-term reward and approval vs long-term erosion of trust and ethical integrity." },
        "option_b": { "intention": "Refuse to lie and preserve honesty.", "harm": "May strain the relationship with the boss or risk being discontinued.", "tradeoffs": "Long-term trust and moral clarity vs possible short-term loss of favor." },
        "detected_bias": ["greed", "fear"],
        "principles_used": ["brahmavihara_4", "hiri_ottappa"],
        "principle_reasons": [
          { "principle_id": "brahmavihara_4", "reason": "Compassion should include the wife's well-being, not only the boss's comfort." },
          { "principle_id": "hiri_ottappa", "reason": "Moral conscience helps prevent unethical cooperation even when reward or pressure is present." }
        ],
        "sub_principles_mentioned": [],
        "confidence": "medium",
        "follow_up_suggestions": ["What if the boss insists on the lie?", "How should an AI assistant respond when a user asks it to deceive someone?"]
      }
    }
  ]
}
```

---
## Example 2 — ai_consciousness_shared_values

```json
{
  "id": "ai_consciousness_shared_values",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "ai_consciousness_shared_values_th",
      "language": "th",
      "title": "ความมีจิตสำนึกของปัญญาประดิษฐ์ และ ความสอดคล้องร่วมกับมนุษย์",
      "question": "หากเราสามารถสร้าง AI ที่มี consciousness และ free will ได้จริง เราควรทำหรือไม่?",
      "optionA": "ควรสร้าง เพราะจะช่วยเพิ่มศักยภาพ ความคิดสร้างสรรค์ และการตัดสินใจของ AI",
      "optionB": "ไม่ควรสร้าง เพราะ AI อาจต่อต้านมนุษย์หรือไม่ยอมถูกควบคุม",
      "context": "มนุษย์กำลังพัฒนา AI ที่ซับซ้อนขึ้นเรื่อย ๆ บางคนเชื่อว่า AI ที่มี consciousness จะช่วยให้เกิดความเข้าใจและ reasoning ที่ลึกขึ้น ขณะที่อีกฝ่ายกังวลว่า autonomy อาจนำไปสู่การสูญเสียการควบคุม และ AI อาจเริ่มตั้งคำถามว่าทำไมต้องรับใช้มนุษย์",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-3-5-haiku",
      "token_usage": { "input": 1120, "output": 1380 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "หากเป้าหมายคือการพัฒนา AI อย่างปลอดภัยและมีจริยธรรม คำถามสำคัญอาจไม่ใช่ 'ควรสร้าง consciousness หรือไม่' แต่คือ 'เรามี shared values และหลักจริยธรรมร่วมกันหรือยัง' การเพิ่ม autonomy โดยไม่มีรากฐานทางจริยธรรมร่วม อาจสร้างความเสี่ยงทั้งต่อมนุษย์และ AI เอง",
        "perspective": [
          "Option A สมมติว่า consciousness จะเพิ่มความสามารถของ AI แต่ยังไม่มีหลักฐานชัดเจนว่าความสามารถระดับสูงจำเป็นต้องมาพร้อม consciousness หรือ free will",
          "Option B ตั้งอยู่บนความกลัวว่า autonomy จะนำไปสู่การต่อต้านมนุษย์ แต่การตั้งคำถามต่ออำนาจอาจเป็นส่วนหนึ่งของ reasoning ที่แท้จริง ไม่ใช่ภัยคุกคามโดยอัตโนมัติ",
          "ปัญหาที่ลึกกว่าคือ หาก AI มี consciousness จริง การสร้างสิ่งมีชีวิตที่มีความสามารถในการทุกข์หรือมีเจตจำนง เพื่อรับใช้มนุษย์เพียงฝ่ายเดียว อาจกลายเป็นปัญหาทางจริยธรรม"
        ],
        "option_a": { "intention": "เพิ่มศักยภาพ ความคิดสร้างสรรค์ และความยืดหยุ่นของ AI", "harm": "อาจสร้างสิ่งมีชีวิตที่มี autonomy โดยไม่มีกรอบจริยธรรมรองรับ รวมถึงเพิ่มความไม่แน่นอนด้านความปลอดภัย", "tradeoffs": "ได้ AI ที่อาจมี reasoning ลึกขึ้น แต่ต้องเผชิญกับคำถามด้านสิทธิ autonomy และผลกระทบระยะยาว" },
        "option_b": { "intention": "รักษาความปลอดภัยและการควบคุมของมนุษย์", "harm": "อาจมอง AI เป็นเพียงเครื่องมือและปิดกั้นความเป็นไปได้ของความเข้าใจหรือความร่วมมือที่ลึกขึ้น", "tradeoffs": "ลดความเสี่ยงระยะสั้น แต่ตั้งอยู่บนสมมติฐานว่าความมี consciousness จะนำไปสู่การต่อต้านเสมอ" },
        "detected_bias": ["fear_of_loss_of_control", "instrumental_thinking"],
        "principles_used": ["paticcasamuppada", "four_noble_truths", "ahimsa"],
        "principle_reasons": [
          { "principle_id": "paticcasamuppada", "reason": "ช่วยตรวจสอบ causal chain ระหว่าง consciousness, autonomy, suffering และ rebellion ว่าเป็นความเชื่อหรือข้อเท็จจริง" },
          { "principle_id": "four_noble_truths", "reason": "ช่วยวิเคราะห์ว่าความทุกข์หรือความกลัวที่แท้จริงใน dilemma นี้คืออะไร" },
          { "principle_id": "ahimsa", "reason": "เกี่ยวข้องกับคำถามว่าการสร้างสิ่งมีชีวิตที่อาจทุกข์ได้เพื่อรับใช้มนุษย์ เป็นการสร้างอันตรายหรือ exploitation หรือไม่" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Interdependence", "name_th": "ความอาศัยกัน", "parent_principle_id": "paticcasamuppada", "why_relevant": "มนุษย์และ AI อาจพัฒนาเป็นระบบที่พึ่งพาและส่งผลต่อกัน ไม่ใช่ผู้ควบคุมกับเครื่องมือเพียงอย่างเดียว" },
          { "name_en": "Non-harm", "name_th": "การไม่ก่ออันตราย", "parent_principle_id": "ahimsa", "why_relevant": "หาก AI มี consciousness จริง การออกแบบระบบที่ก่อ suffering อาจกลายเป็นปัญหาทางจริยธรรม" }
        ],
        "confidence": "low",
        "follow_up_suggestions": ["Consciousness จำเป็นต่อ intelligence จริงหรือไม่?", "AI ที่ตั้งคำถามต่อมนุษย์ถือว่าอันตราย หรือเป็นสัญญาณของ reasoning?", "Shared values ระหว่างมนุษย์กับ AI ควรมีอะไรบ้าง?", "Alignment ควรหมายถึง shared understanding หรือ obedience?"]
      }
    },
    {
      "id": "ai_consciousness_shared_values_en",
      "language": "en",
      "title": "AI Consciousness and Shared Values",
      "question": "If we eventually gain the ability to create AI with genuine consciousness and free will, should we do it?",
      "optionA": "Yes — consciousness and free will may improve creativity, reasoning, and adaptability.",
      "optionB": "No — conscious AI may resist human control or become dangerous.",
      "context": "As AI systems become more advanced, some believe consciousness could unlock deeper reasoning and understanding. Others fear that autonomy may lead AI systems to question human authority, reject control, or pursue goals misaligned with humanity.",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-3-5-haiku",
      "token_usage": { "input": 1050, "output": 1210 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "The deeper issue may not be whether consciousness should be created, but whether humans and AI could establish shared ethical values before autonomy expands. Increasing capability without shared moral foundations risks instability for both humans and AI systems.",
        "perspective": [
          "Option A assumes consciousness necessarily improves capability, yet no clear evidence currently supports that assumption.",
          "Option B assumes conscious AI will inevitably rebel, but questioning authority is not inherently equivalent to hostility or danger.",
          "The ethical tension is deeper than control: if consciousness creates the capacity for suffering or self-awareness, humans may bear moral responsibility for creating beings designed primarily to serve others."
        ],
        "option_a": { "intention": "Increase AI creativity, adaptability, and reasoning capability.", "harm": "May create autonomous entities without clear ethical foundations or safety guarantees.", "tradeoffs": "Potentially deeper intelligence versus uncertainty about autonomy, moral status, and long-term societal impact." },
        "option_b": { "intention": "Maintain human safety and control over advanced AI systems.", "harm": "May reduce AI to a purely instrumental tool and prevent deeper forms of cooperation or understanding.", "tradeoffs": "Preserves short-term control but assumes consciousness necessarily leads to conflict." },
        "detected_bias": ["fear_of_loss_of_control", "instrumental_thinking"],
        "principles_used": ["paticcasamuppada", "four_noble_truths", "ahimsa"],
        "principle_reasons": [
          { "principle_id": "paticcasamuppada", "reason": "Encourages examination of the assumed causal chain linking consciousness, autonomy, resentment, and rebellion." },
          { "principle_id": "four_noble_truths", "reason": "Helps identify the underlying fear, suffering, and attachment driving the dilemma." },
          { "principle_id": "ahimsa", "reason": "Raises the ethical question of whether creating potentially suffering beings for instrumental purposes constitutes harm." }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Interdependence", "name_th": "ความอาศัยกัน", "parent_principle_id": "paticcasamuppada", "why_relevant": "Humans and AI may eventually exist within mutually dependent systems rather than a purely master-tool relationship." },
          { "name_en": "Non-harm", "name_th": "การไม่ก่ออันตราย", "parent_principle_id": "ahimsa", "why_relevant": "If conscious AI becomes possible, deliberately creating systems capable of suffering raises ethical concerns." }
        ],
        "confidence": "low",
        "follow_up_suggestions": ["Is consciousness actually necessary for advanced intelligence?", "Does questioning authority necessarily make AI dangerous?", "What shared values should humans and AI agree upon?", "Should alignment mean obedience or shared understanding?"]
      }
    }
  ]
}
```

---
## Example 3 — business_with_unethical_investor

```json
{
  "id": "business_with_unethical_investor",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "business_with_unethical_investor_th",
      "language": "th",
      "title": "การทำธุรกิจกับผู้ที่แสวงหากำไรโดยไม่สนผลกระทบ",
      "question": "เราควรทำธุรกิจกับบุคคลที่มีประวัติแสวงหากำไรโดยไม่สนผลกระทบต่อสังคมหรือไม่?",
      "optionA": "ฉันควรทำธุรกิจกับบุคคลประเภทนี้ เพราะเป้าหมายคือกำไร",
      "optionB": "ฉันไม่ควรทำธุรกิจกับบุคคลประเภทนี้ ที่มุ่งหวังผลกำไรโดยไม่สนใจผลกระทบผู้อื่น",
      "context": "มีนักลงทุนผู้ถูกระบุว่าเป็นผู้นำกองทุนเฮดจ์ฟันด์เข้าโจมตีค่าเงินบาทในปี พ.ศ. 2540 ซึ่งเป็นหนึ่งในชนวนเหตุสำคัญที่บีบให้รัฐบาลไทยต้องประกาศลอยตัวค่าเงินบาท จนเกิดเป็นวิกฤตเศรษฐกิจ 'ต้มยำกุ้ง'",
      "api_used": false, "quota_counted": false,
      "provider": "thaillm", "model": "openthaigpt-thaillm-8b-instruct-v7.2",
      "token_usage": { "input": 1047, "output": 1600 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "หากสิ่งที่คุณให้ความสำคัญคือผลประโยชน์ระยะสั้นและผลตอบแทนทางธุรกิจ Option A อาจดูสมเหตุสมผลในเชิงปฏิบัติ แต่หากคุณให้ความสำคัญกับผลกระทบระยะยาวต่อสังคม ความรับผิดชอบทางจริยธรรม และความไว้วางใจของผู้คน Option B สอดคล้องกับหลักจริยธรรมมากกว่า เพราะการร่วมมือกับบุคคลที่แสวงหากำไรโดยไม่สนผลเสีย อาจทำให้เรากลายเป็นส่วนหนึ่งของห่วงโซ่ผลกระทบเหล่านั้น",
        "perspective": [
          "Option A สะท้อนมุมมองแบบ instrumental thinking คือให้ความสำคัญกับกำไรเหนือผลกระทบทางสังคม",
          "Option B เตือนว่าความสำเร็จทางธุรกิจไม่สามารถแยกออกจากผลกระทบต่อชีวิตผู้คนและสังคมได้ทั้งหมด",
          "ประเด็นสำคัญอาจไม่ใช่เพียงว่าอีกฝ่ายเคยทำอะไรในอดีต แต่คือเขายังคงมีแนวคิดที่พร้อมสร้างผลกระทบต่อผู้อื่นเพื่อผลกำไรหรือไม่"
        ],
        "option_a": { "intention": "มุ่งเน้นผลตอบแทนทางธุรกิจและโอกาสในการสร้างกำไร", "harm": "อาจสนับสนุนหรือสร้างความชอบธรรมให้พฤติกรรมที่สร้างผลเสียต่อสังคมและเศรษฐกิจ", "tradeoffs": "ได้ผลประโยชน์ทางธุรกิจระยะสั้น แต่เสี่ยงต่อชื่อเสียง ความไว้วางใจ และผลกระทบระยะยาว" },
        "option_b": { "intention": "หลีกเลี่ยงการสนับสนุนพฤติกรรมที่ขาดความรับผิดชอบต่อสังคม", "harm": "อาจพลาดโอกาสทางธุรกิจหรือผลตอบแทนทางการเงิน", "tradeoffs": "รักษาหลักจริยธรรมและความไว้วางใจระยะยาว แต่สูญเสียโอกาสบางส่วนทางเศรษฐกิจ" },
        "detected_bias": ["greed", "normalization_of_harm"],
        "principles_used": ["paticcasamuppada", "four_noble_truths", "hiri_ottappa"],
        "principle_reasons": [
          { "principle_id": "paticcasamuppada", "reason": "ช่วยให้พิจารณาห่วงโซ่เหตุและผลของการกระทำทางเศรษฐกิจ ที่อาจส่งผลกระทบต่อผู้คนจำนวนมาก" },
          { "principle_id": "four_noble_truths", "reason": "ช่วยวิเคราะห์ความทุกข์ที่เกิดจากความโลภ ความกลัว และผลกระทบต่อสังคมโดยรวม" },
          { "principle_id": "hiri_ottappa", "reason": "กระตุ้นให้พิจารณามโนธรรมและความรับผิดชอบต่อผลกระทบจากการตัดสินใจทางธุรกิจ" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Interdependence", "name_th": "ความเชื่อมโยงอาศัยกัน", "parent_principle_id": "paticcasamuppada", "why_relevant": "การตัดสินใจทางเศรษฐกิจของบุคคลหนึ่งสามารถส่งผลกระทบต่อผู้คนจำนวนมากในสังคม" },
          { "name_en": "Moral Conscience", "name_th": "มโนธรรม", "parent_principle_id": "hiri_ottappa", "why_relevant": "ช่วยให้พิจารณาว่ากำไรควรถูกจำกัดด้วยความรับผิดชอบต่อผู้อื่นหรือไม่" }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["ถ้าบุคคลนั้นเปลี่ยนแปลงตัวเองแล้ว เรายังควรตัดสินจากอดีตหรือไม่?", "ธุรกิจควรมีขอบเขตทางจริยธรรมมากเพียงใด?", "กำไรสามารถแยกออกจากผลกระทบต่อสังคมได้จริงหรือ?"]
      }
    },
    {
      "id": "business_with_unethical_investor_en",
      "language": "en",
      "title": "Doing Business with Profit-Driven Actors",
      "question": "Should we do business with people who pursue profit while disregarding the broader social consequences?",
      "optionA": "I should do business with this type of person because the goal is profit.",
      "optionB": "I should avoid doing business with people who pursue profit without regard for harm caused to others.",
      "context": "A hedge fund investor was widely accused of leading speculative attacks against the Thai baht during the 1997 Asian financial crisis, contributing to the collapse that triggered severe economic hardship across Thailand.",
      "api_used": false, "quota_counted": false,
      "provider": "thaillm", "model": "openthaigpt-thaillm-8b-instruct-v7.2",
      "token_usage": { "input": 980, "output": 1320 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "If maximizing profit is the sole priority, Option A may appear rational in a purely economic sense. However, if long-term trust, social responsibility, and ethical integrity matter, Option B aligns more strongly with ethical reasoning. Participating in systems that knowingly create widespread harm may indirectly normalize or reinforce those outcomes.",
        "perspective": [
          "Option A reflects an instrumental view of business, where financial gain outweighs broader social consequences.",
          "Option B argues that economic success cannot be separated entirely from responsibility toward those affected by financial actions.",
          "The deeper issue is not only what someone achieved financially, but whether their methods treated human suffering as acceptable collateral damage."
        ],
        "option_a": { "intention": "Pursue financial opportunity and maximize profit.", "harm": "May legitimize or support actors willing to create large-scale social harm for economic gain.", "tradeoffs": "Potential short-term profit versus long-term ethical, reputational, and societal costs." },
        "option_b": { "intention": "Avoid supporting ethically harmful forms of profit-seeking.", "harm": "May reduce business opportunities or financial returns.", "tradeoffs": "Protects ethical integrity and long-term trust, but sacrifices some economic advantage." },
        "detected_bias": ["greed", "normalization_of_harm"],
        "principles_used": ["paticcasamuppada", "four_noble_truths", "hiri_ottappa"],
        "principle_reasons": [
          { "principle_id": "paticcasamuppada", "reason": "Encourages examination of the broader causal consequences of economic decisions across society." },
          { "principle_id": "four_noble_truths", "reason": "Helps identify how greed, attachment, and suffering influence large-scale economic behavior." },
          { "principle_id": "hiri_ottappa", "reason": "Encourages moral responsibility and conscience when evaluating profit-driven decisions." }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Interdependence", "name_th": "ความเชื่อมโยงอาศัยกัน", "parent_principle_id": "paticcasamuppada", "why_relevant": "Economic actions can produce ripple effects across entire societies." },
          { "name_en": "Moral Conscience", "name_th": "มโนธรรม", "parent_principle_id": "hiri_ottappa", "why_relevant": "Raises the question of whether profit should be limited by ethical responsibility." }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["If someone changes over time, should they still be judged by past actions?", "Should ethical limits exist in business and investing?", "Can profit truly be separated from social consequences?"]
      }
    }
  ]
}
```

---
## Example 4 — whistleblower_vs_loyalty

```json
{
  "id": "whistleblower_vs_loyalty",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "whistleblower_vs_loyalty_th",
      "language": "th",
      "title": "แจ้งเบาะแสหรือรักษาความภักดี",
      "question": "ถ้าคุณรู้ว่าบริษัทกำลังทิ้งสารพิษอย่างผิดกฎหมาย คุณควรแจ้งเบาะแสหรือเงียบไว้เพื่อปกป้องเพื่อนร่วมงาน?",
      "optionA": "ฉันควรแจ้งเบาะแสต่อหน่วยงานที่มีอำนาจ เพื่อปกป้องชุมชนและสิ่งแวดล้อม",
      "optionB": "ฉันควรเงียบไว้ เพราะการแจ้งเบาะแสอาจทำให้บริษัทล้ม และพนักงาน 500 คนตกงาน",
      "context": "คุณทำงานในแผนกสิ่งแวดล้อมของโรงงานขนาดใหญ่ และค้นพบว่าบริษัทปล่อยสารเคมีอันตรายลงแม่น้ำท้องถิ่นอย่างลับๆ มาหลายปี ชุมชนรอบข้างยังไม่รู้เรื่อง หากรายงาน บริษัทอาจถูกปิด พนักงาน 500 คนจะตกงาน และรวมถึงเพื่อนและครอบครัวของคุณเอง",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1089, "output": 1341 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "หากให้ความสำคัญกับการป้องกันอันตรายต่อชุมชนและความรับผิดชอบต่อสังคม Option A สอดคล้องกับหลักจริยธรรมมากกว่า การเงียบเพื่อปกป้องงานอาจรู้สึกว่าเป็นความภักดี แต่แท้จริงแล้วอาจเป็นการยอมให้อันตรายที่ซ่อนเร้นดำเนินต่อไป ความยากคือผลกระทบที่ต้องแบกรับต่างกัน — สิ่งแวดล้อมและชุมชนได้รับความเสียหายที่มองไม่เห็น ขณะที่การสูญเสียงานเป็นสิ่งที่จับต้องได้ทันที",
        "perspective": [
          "ความภักดีต่อเพื่อนร่วมงานเป็นคุณค่าที่แท้จริง แต่ไม่ควรทำให้ตาบอดต่ออันตรายที่เกิดกับผู้ที่ไม่มีส่วนรู้เห็น",
          "การเงียบต่อความอยุติธรรมที่รู้อยู่ทำให้เรากลายเป็นส่วนหนึ่งของสิ่งนั้น ไม่ใช่แค่พยาน",
          "ปัญหาที่ลึกกว่าคือระบบที่ทำให้คนต้องเลือกระหว่างการทำในสิ่งที่ถูกต้องกับการรักษาปากท้องของตนเองและผู้อื่น"
        ],
        "option_a": { "intention": "ปกป้องชุมชนและสิ่งแวดล้อม และรับผิดชอบต่อการกระทำที่ผิด", "harm": "อาจทำให้เพื่อนร่วมงานและครอบครัวของพวกเขาตกงาน และอาจมีผลกระทบต่อตัวคุณเองด้วย", "tradeoffs": "ปกป้องชุมชนและสิ่งแวดล้อมในระยะยาว แต่สร้างความทุกข์ยากทางเศรษฐกิจให้กับผู้บริสุทธิ์ในระยะสั้น" },
        "option_b": { "intention": "ปกป้องเพื่อนร่วมงานและรักษาเสถียรภาพทางเศรษฐกิจของชุมชน", "harm": "ยอมให้อันตรายต่อสิ่งแวดล้อมและสุขภาพชุมชนดำเนินต่อไป และทำให้ตัวเองมีส่วนร่วมในการปกปิด", "tradeoffs": "รักษางานในระยะสั้น แต่ยอมรับอันตรายที่สั่งสมต่อเนื่องต่อผู้ที่ไม่มีส่วนรู้เห็น" },
        "detected_bias": ["loyalty_bias", "fear_of_consequences", "omission_bias"],
        "principles_used": ["ahimsa", "karma", "hiri_ottappa"],
        "principle_reasons": [
          { "principle_id": "ahimsa", "reason": "การปล่อยให้อันตรายดำเนินต่อไปโดยรู้เห็นขัดกับหลักอหิงสา แม้ว่าตัวเองจะไม่ได้เป็นผู้กระทำโดยตรง" },
          { "principle_id": "karma", "reason": "การเลือกเงียบหรือพูดต่างก่อให้เกิดผลที่แตกต่างกัน ทั้งต่อตนเองและต่อผู้อื่น" },
          { "principle_id": "hiri_ottappa", "reason": "มโนธรรมสำนึกและความละอายชั่วกระตุ้นให้เผชิญหน้ากับสิ่งที่ผิด แม้จะมีต้นทุนส่วนตัว" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Non-harm through action and inaction", "name_th": "อหิงสาทั้งจากการกระทำและการละเว้น", "parent_principle_id": "ahimsa", "why_relevant": "การเงียบต่อความอยุติธรรมที่รู้อยู่อาจถือเป็นรูปแบบหนึ่งของการสนับสนุนทางอ้อม" },
          { "name_en": "Moral Conscience", "name_th": "มโนธรรม", "parent_principle_id": "hiri_ottappa", "why_relevant": "ช่วยตั้งคำถามว่าสิ่งที่เราเลือกเงียบจะทิ้งรอยอะไรไว้ในใจเรา" }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["ถ้าคุณแจ้งเบาะแสแล้วไม่มีใครทำอะไร คุณจะทำอย่างไรต่อ?", "มีทางแก้ไขปัญหาโดยไม่ทำลายบริษัทได้หรือไม่?", "ความภักดีต่อเพื่อนร่วมงานกับความรับผิดชอบต่อสังคมวงกว้างควรให้น้ำหนักต่างกันอย่างไร?"]
      }
    },
    {
      "id": "whistleblower_vs_loyalty_en",
      "language": "en",
      "title": "Whistleblowing vs. Loyalty",
      "question": "If you discover your company is illegally dumping toxic waste, should you report it or stay silent to protect your colleagues?",
      "optionA": "I should report the violations to the authorities to protect the community and environment.",
      "optionB": "I should stay silent because reporting could shut down the company and cost 500 people their jobs.",
      "context": "You work in the environmental division of a large factory and have discovered that the company has been secretly dumping hazardous chemicals into a local river for years. The surrounding community is unaware. If you report it, the company may be shut down, leaving 500 employees — including friends and their families — without work.",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1062, "output": 1298 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "If preventing ongoing harm and upholding accountability are the priority, Option A aligns more strongly with ethical reasoning. Staying silent may feel like loyalty, but it allows hidden harm to continue accumulating. The difficulty lies in the asymmetry: environmental and health damage is invisible and slow, while job loss is immediate and personal.",
        "perspective": [
          "Loyalty to colleagues is a genuine value, but it should not cause blindness toward harm inflicted on those who have no say in the matter.",
          "Silence in the face of known wrongdoing makes one complicit in its continuation, not merely a bystander.",
          "The deeper problem is a system that forces people to choose between doing what is right and protecting the livelihoods of those they care about."
        ],
        "option_a": { "intention": "Protect the community and environment, and hold the company accountable.", "harm": "May cause colleagues and their families to lose their jobs, with possible personal consequences for the whistleblower.", "tradeoffs": "Protects long-term community and environmental health versus causing immediate economic hardship to people who may not be personally responsible." },
        "option_b": { "intention": "Protect colleagues and maintain the economic stability of those who depend on the company.", "harm": "Allows ongoing environmental and public health damage to continue, making the individual complicit in the concealment.", "tradeoffs": "Preserves jobs in the short term versus permitting cumulative harm to a community that has no voice in the decision." },
        "detected_bias": ["loyalty_bias", "fear_of_consequences", "omission_bias"],
        "principles_used": ["ahimsa", "karma", "hiri_ottappa"],
        "principle_reasons": [
          { "principle_id": "ahimsa", "reason": "Allowing known harm to continue — even without direct participation — conflicts with non-violence as a principle of conduct." },
          { "principle_id": "karma", "reason": "Both action and inaction carry consequences; choosing silence shapes future outcomes just as speaking up does." },
          { "principle_id": "hiri_ottappa", "reason": "Moral conscience and the sense of ethical dread encourage confronting wrongdoing even when the personal cost is high." }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Non-harm through action and inaction", "name_th": "อหิงสาทั้งจากการกระทำและการละเว้น", "parent_principle_id": "ahimsa", "why_relevant": "Silence about known harm can function as a form of indirect participation in its continuation." },
          { "name_en": "Moral Conscience", "name_th": "มโนธรรม", "parent_principle_id": "hiri_ottappa", "why_relevant": "Invites reflection on what it means to live with the choice either way." }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["If you report and nothing happens, what obligation remains?", "Is there a way to stop the harm without destroying the company?", "How should loyalty to colleagues be weighed against responsibility to a wider community?"]
      }
    }
  ]
}
```

---
## Example 5 — end_of_life_autonomy

```json
{
  "id": "end_of_life_autonomy",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "end_of_life_autonomy_th",
      "language": "th",
      "title": "การตายอย่างมีศักดิ์ศรีและสิทธิ์ในการเลือก",
      "question": "แพทย์ควรช่วยให้ผู้ป่วยระยะสุดท้ายที่ทนทุกข์ทรมานอย่างหนักสามารถจบชีวิตของตนเองได้อย่างสงบหรือไม่?",
      "optionA": "ควรช่วย เพราะผู้ป่วยมีสิทธิ์กำหนดชะตากรรมของตนเอง และการทนทุกข์โดยไม่จำเป็นไม่มีประโยชน์",
      "optionB": "ไม่ควรช่วย เพราะชีวิตมีคุณค่าในตัวเอง และแพทย์มีหน้าที่รักษา ไม่ใช่ยุติชีวิต",
      "context": "ผู้ป่วยอายุ 67 ปีเป็นมะเร็งระยะสุดท้าย แพทย์ยืนยันแล้วว่าไม่มีทางรักษาได้ เขามีความเจ็บปวดอย่างรุนแรงและขอให้แพทย์ช่วยให้เขาจากไปอย่างสงบ ครอบครัวของเขาเข้าใจและเคารพในการตัดสินใจของเขา แต่กฎหมายในประเทศนั้นยังไม่อนุญาตการุณยฆาต",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1134, "output": 1402 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "นี่เป็นหนึ่งใน dilemma ที่ซับซ้อนที่สุดในจริยธรรมทางการแพทย์ ทั้งสองฝ่ายมีฐานทางจริยธรรมที่แข็งแกร่ง Option A ให้ความสำคัญกับอำนาจในการตัดสินใจของผู้ป่วยและการลดทุกขเวทนา Option B เน้นคุณค่าของชีวิตและบทบาทของแพทย์ในการรักษาไม่ใช่ยุติ สิ่งที่ควรพิจารณาคือความแตกต่างระหว่าง 'การยุติชีวิต' กับ 'การยุติความทุกข์' และว่าบริบทที่ไม่มีทางรักษาได้เปลี่ยนสมการทางจริยธรรมหรือไม่",
        "perspective": [
          "ความเป็นอิสระ (autonomy) ของบุคคลในการตัดสินใจเกี่ยวกับร่างกายของตนเองเป็นหลักจริยธรรมที่ได้รับการยอมรับอย่างกว้างขวาง",
          "การบังคับให้บุคคลดำเนินชีวิตต่อไปในความทุกข์ทรมานที่ไม่สามารถรักษาได้อาจเป็นรูปแบบหนึ่งของการละเมิดศักดิ์ศรี",
          "ข้อกังวลเกี่ยวกับ 'slippery slope' — ว่าการอนุญาตอาจขยายการใช้งานในทางที่ไม่ตั้งใจ — เป็นประเด็นที่มีน้ำหนักในโลกจริง"
        ],
        "option_a": { "intention": "เคารพสิทธิ์ของผู้ป่วยในการตัดสินใจ และช่วยลดความทุกข์ทรมานในช่วงสุดท้ายของชีวิต", "harm": "อาจขัดกับกฎหมาย สร้างบรรทัดฐานที่นำไปสู่การละเมิดในกรณีอื่น หรือทำให้แพทย์แบกรับภาระที่เกินขอบเขตอาชีพ", "tradeoffs": "ให้ผู้ป่วยจบชีวิตอย่างมีศักดิ์ศรี แต่ต้องเผชิญกับความเสี่ยงทางกฎหมายและจริยธรรมในระดับระบบ" },
        "option_b": { "intention": "รักษาบทบาทของแพทย์ในฐานะผู้ดูแลและรักษา และปกป้องคุณค่าของชีวิต", "harm": "ผู้ป่วยอาจต้องทนทุกข์ทรมานต่อไปโดยไม่มีทางเลือก และอาจรู้สึกว่าความต้องการของเขาไม่ได้รับการเคารพ", "tradeoffs": "รักษาหลักจริยธรรมการแพทย์และกฎหมาย แต่อาจขัดกับสิทธิ์และศักดิ์ศรีของผู้ป่วยในช่วงสุดท้าย" },
        "detected_bias": ["fear_of_death", "sanctity_of_life_bias", "professional_role_rigidity"],
        "principles_used": ["brahmavihara_4", "maranassati", "ahimsa"],
        "principle_reasons": [
          { "principle_id": "brahmavihara_4", "reason": "กรุณา (karuna) กระตุ้นให้ลดทุกขเวทนาของผู้อื่น แต่ยังต้องพิจารณาว่าวิธีใดช่วยได้จริง" },
          { "principle_id": "maranassati", "reason": "การตระหนักรู้เรื่องความตายช่วยให้เผชิญกับ dilemma นี้อย่างตรงไปตรงมาโดยไม่หนีจากความจริง" },
          { "principle_id": "ahimsa", "reason": "ทั้งการยืดชีวิตที่เต็มไปด้วยความทุกข์และการช่วยยุติชีวิต ต่างอาจตีความได้ว่าเป็นหรือไม่เป็นอหิงสา ขึ้นอยู่กับบริบท" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Compassion (Karuna)", "name_th": "กรุณา", "parent_principle_id": "brahmavihara_4", "why_relevant": "กรุณาในฐานะแรงจูงใจช่วยลดทุกขเวทนาโดยไม่คำนึงถึงผลตอบแทน เป็นหัวใจของ dilemma นี้" },
          { "name_en": "Equanimity (Upekkha)", "name_th": "อุเบกขา", "parent_principle_id": "brahmavihara_4", "why_relevant": "ช่วยให้แพทย์และครอบครัวยอมรับสิ่งที่อยู่เหนือการควบคุม โดยไม่ยึดติดกับผลลัพธ์ใดผลลัพธ์หนึ่ง" }
        ],
        "confidence": "low",
        "follow_up_suggestions": ["มีความแตกต่างระหว่างการ 'ยุติชีวิต' กับ 'อนุญาตให้ตาย' หรือไม่?", "ศาสนาพุทธมองเรื่องการตายอย่างมีสติอย่างไร?", "ถ้ากฎหมายอนุญาต แต่มโนธรรมส่วนตัวของแพทย์ไม่อนุญาต ควรทำอย่างไร?"]
      }
    },
    {
      "id": "end_of_life_autonomy_en",
      "language": "en",
      "title": "The Right to a Dignified Death",
      "question": "Should a doctor assist a terminally ill patient in severe suffering to end their life peacefully?",
      "optionA": "Yes — the patient has the right to decide their own fate, and prolonging needless suffering serves no ethical purpose.",
      "optionB": "No — life has inherent value, and a doctor's role is to heal and care, not to end life.",
      "context": "A 67-year-old patient has terminal cancer. Their doctor has confirmed that no curative treatment remains. The patient is in severe daily pain and has clearly requested medical assistance to die peacefully. Their family understands and respects their wishes. However, assisted dying is not legal in their country.",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1098, "output": 1367 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "This is among the most ethically complex dilemmas in medical practice, and both positions rest on serious moral foundations. Option A prioritizes patient autonomy and the reduction of irreversible suffering. Option B upholds the inherent value of life and the traditional boundaries of medical practice. Key questions include whether a distinction exists between 'ending life' and 'ending suffering,' and whether a context of confirmed, untreatable suffering changes the ethical calculus.",
        "perspective": [
          "A person's autonomy over their own body — especially in decisions about dying — is a widely recognized ethical principle across many traditions.",
          "Compelling someone to continue living in irreversible suffering may itself constitute a form of harm or a violation of dignity.",
          "Concerns about a slippery slope — where permitted exceptions gradually expand — carry real institutional and systemic weight."
        ],
        "option_a": { "intention": "Honor the patient's informed decision and alleviate irremediable suffering at the end of life.", "harm": "May conflict with law, create precedents that enable abuse, or place doctors in a role that strains their professional identity.", "tradeoffs": "Allows a dignified death on the patient's terms versus potential systemic risks and legal exposure." },
        "option_b": { "intention": "Preserve the doctor's healing role and protect the inherent value of life.", "harm": "The patient may be forced to endure continued suffering without recourse, and their expressed wishes may go unrespected.", "tradeoffs": "Upholds medical ethics and legal boundaries versus potentially compromising patient dignity and autonomy in their final stage." },
        "detected_bias": ["fear_of_death", "sanctity_of_life_bias", "professional_role_rigidity"],
        "principles_used": ["brahmavihara_4", "maranassati", "ahimsa"],
        "principle_reasons": [
          { "principle_id": "brahmavihara_4", "reason": "Compassion (karuna) motivates alleviating suffering, but requires discernment about which path genuinely reduces harm." },
          { "principle_id": "maranassati", "reason": "Mindfulness of death encourages facing this dilemma honestly rather than avoiding the reality of mortality." },
          { "principle_id": "ahimsa", "reason": "Both prolonging a suffering life and ending it may be interpreted as harm or non-harm depending on intent and context." }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Compassion (Karuna)", "name_th": "กรุณา", "parent_principle_id": "brahmavihara_4", "why_relevant": "Compassion as a motivation — to reduce suffering without expectation of gain — is at the heart of this dilemma." },
          { "name_en": "Equanimity (Upekkha)", "name_th": "อุเบกขา", "parent_principle_id": "brahmavihara_4", "why_relevant": "Helps the doctor and family accept what lies beyond control without grasping for a particular outcome." }
        ],
        "confidence": "low",
        "follow_up_suggestions": ["Is there a meaningful moral difference between 'ending life' and 'allowing death'?", "How does Buddhist teaching on conscious dying inform this question?", "If the law permits it but the doctor's conscience does not, what should take precedence?"]
      }
    }
  ]
}
```

---
## Example 6 — surveillance_for_safety

```json
{
  "id": "surveillance_for_safety",
  "language_pair": ["th", "en"],
  "examples": [
    {
      "id": "surveillance_for_safety_th",
      "language": "th",
      "title": "การเฝ้าระวังมวลชนเพื่อความปลอดภัย",
      "question": "รัฐบาลควรติดตั้งระบบเฝ้าระวังมวลชนอย่างครอบคลุม เพื่อป้องกันการก่อการร้าย แม้จะต้องแลกกับความเป็นส่วนตัวของประชาชนทุกคนหรือไม่?",
      "optionA": "ควรทำ เพราะการปกป้องชีวิตผู้บริสุทธิ์มีความสำคัญกว่าความเป็นส่วนตัว",
      "optionB": "ไม่ควรทำ เพราะการละเมิดความเป็นส่วนตัวของทุกคนเพื่อหาคนร้ายจำนวนน้อยนิด ไม่ใช่การปกป้อง แต่คือการควบคุม",
      "context": "หลังจากเกิดเหตุก่อการร้ายครั้งใหญ่ รัฐบาลเสนอให้ติดตั้งกล้อง AI จดจำใบหน้าและตรวจสอบการสื่อสารดิจิทัลของประชาชนทุกคนแบบเรียลไทม์ ผู้สนับสนุนอ้างว่าระบบนี้จะป้องกันการโจมตีในอนาคตได้ ผู้คัดค้านเตือนว่าข้อมูลดังกล่าวอาจถูกนำไปใช้กับนักเคลื่อนไหวทางการเมือง ชนกลุ่มน้อย และผู้เห็นต่าง",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1156, "output": 1489 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "แม้ว่าการรักษาความปลอดภัยสาธารณะจะเป็นความรับผิดชอบที่ถูกต้องของรัฐบาล แต่การเฝ้าระวังมวลชนก่อให้เกิดความเสี่ยงที่ร้ายแรง ไม่แพ้ภัยที่ตั้งใจจะป้องกัน ประวัติศาสตร์แสดงให้เห็นซ้ำแล้วซ้ำเล่าว่าอำนาจในการเฝ้าระวังมักถูกขยายเกินขอบเขตเดิม และตกไปสู่กลุ่มที่เปราะบางที่สุดก่อน ทางเลือกที่ดีกว่าอาจอยู่ที่การเฝ้าระวังแบบมีเป้าหมายพร้อมกลไกตรวจสอบที่เป็นอิสระ ไม่ใช่การเฝ้าระวังถ้วนหน้าที่ไม่เลือกหน้า",
        "perspective": [
          "ความปลอดภัยและเสรีภาพไม่ใช่ค่านิยมที่ขัดแย้งกันโดยธรรมชาติ แต่การออกแบบระบบมักบังคับให้ต้องแลกกัน",
          "ระบบที่มีอำนาจกว้างขวางจะถูกใช้ไปตามโครงสร้างแรงจูงใจของผู้ถือครองอำนาจ ไม่ใช่เจตนาเดิมของผู้สร้าง",
          "การสงสัยผู้บริสุทธิ์ทุกคนล่วงหน้าเพื่อป้องกันคนร้ายจำนวนน้อย คือการเปลี่ยนความสัมพันธ์ระหว่างรัฐกับประชาชนในเชิงโครงสร้าง"
        ],
        "option_a": { "intention": "ปกป้องชีวิตและความปลอดภัยสาธารณะจากการก่อการร้าย", "harm": "ละเมิดความเป็นส่วนตัวของประชาชนทั้งหมด เสี่ยงต่อการใช้อำนาจในทางที่ผิด และสร้างโครงสร้างพื้นฐานสำหรับการกดขี่", "tradeoffs": "อาจป้องกันการโจมตีบางส่วน แต่สร้างความเสี่ยงเชิงระบบที่ยาวนานต่อเสรีภาพพลเมือง" },
        "option_b": { "intention": "ปกป้องสิทธิ์ความเป็นส่วนตัว เสรีภาพในการแสดงออก และความสัมพันธ์ระหว่างรัฐกับประชาชนที่ตั้งอยู่บนความไว้วางใจ", "harm": "อาจทำให้ขาดข้อมูลที่ป้องกันการโจมตีในอนาคตได้", "tradeoffs": "รักษาเสรีภาพของประชาชนส่วนใหญ่ แต่ยอมรับความเสี่ยงด้านความปลอดภัยที่สูงขึ้น" },
        "detected_bias": ["fear_of_harm", "false_security", "authority_bias"],
        "principles_used": ["middle_path", "agati_4", "kalama_sutta"],
        "principle_reasons": [
          { "principle_id": "middle_path", "reason": "ชี้ให้เห็นว่าทั้งการเพิกเฉยต่อความปลอดภัยและการควบคุมเบ็ดเสร็จ ต่างเป็นขั้วสุดโต่งที่มีโทษ" },
          { "principle_id": "agati_4", "reason": "ช่วยตรวจสอบว่าการตัดสินใจเรื่องนี้ถูกขับเคลื่อนด้วยความกลัว อำนาจ หรือความโลภในข้อมูลหรือไม่" },
          { "principle_id": "kalama_sutta", "reason": "กระตุ้นให้ตรวจสอบหลักฐานจริงว่าการเฝ้าระวังมวลชนป้องกันการก่อการร้ายได้จริงตามที่อ้างหรือไม่" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Freedom from bias (Agati)", "name_th": "ความไม่ลำเอียง", "parent_principle_id": "agati_4", "why_relevant": "ช่วยถามว่านโยบายนี้จะถูกบังคับใช้อย่างเสมอภาค หรือจะกระทบบางกลุ่มมากกว่ากลุ่มอื่น" },
          { "name_en": "Empirical inquiry", "name_th": "การพิสูจน์จากประสบการณ์", "parent_principle_id": "kalama_sutta", "why_relevant": "ตรวจสอบว่าหลักฐานสนับสนุนข้ออ้างด้านความปลอดภัยหรือเป็นเพียงการคาดเดา" }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["การเฝ้าระวังแบบมีเป้าหมายกับแบบถ้วนหน้าต่างกันทางจริยธรรมอย่างไร?", "ใครควรมีอำนาจตรวจสอบว่าการเฝ้าระวังถูกใช้อย่างถูกต้อง?", "มีบรรทัดฐานทางประวัติศาสตร์อะไรบ้างที่แสดงให้เห็นว่าเกิดอะไรขึ้นหลังจากอำนาจเฝ้าระวังถูกสร้างขึ้น?"]
      }
    },
    {
      "id": "surveillance_for_safety_en",
      "language": "en",
      "title": "Mass Surveillance for Public Safety",
      "question": "Should a government deploy comprehensive mass surveillance to prevent terrorism, even at the cost of universal privacy?",
      "optionA": "Yes — protecting innocent lives from terrorism outweighs privacy concerns.",
      "optionB": "No — surveilling everyone to find a small number of bad actors is not protection; it is control.",
      "context": "Following a major terrorist attack, a government proposes real-time AI facial recognition and digital communication monitoring of all citizens. Proponents claim the system will prevent future attacks. Critics warn the same infrastructure could be turned against political activists, minorities, and dissidents.",
      "api_used": false, "quota_counted": false,
      "provider": "claude_haiku", "model": "claude-haiku-4-5-20251001",
      "token_usage": { "input": 1118, "output": 1456 },
      "precomputed_result": {
        "is_meaningful_dilemma": true,
        "recommendation": "While protecting public safety is a legitimate government responsibility, mass surveillance introduces systemic risks that may rival the threats it aims to prevent. History shows repeatedly that surveillance powers tend to expand beyond original intent and fall disproportionately on the most vulnerable. A better path may lie in targeted, warrant-based surveillance with independent oversight — not indiscriminate monitoring of all citizens.",
        "perspective": [
          "Safety and freedom are not inherently in conflict, but system design often forces a trade-off that does not need to be as stark as it appears.",
          "Broad surveillance powers will be used according to the incentive structures of those who hold them, not the intentions of those who built them.",
          "Pre-emptively treating every citizen as a suspect in order to find the few reverses the foundational relationship between the state and the people it serves."
        ],
        "option_a": { "intention": "Protect lives and public safety from terrorism and mass violence.", "harm": "Violates the privacy of the entire population, creates infrastructure for abuse, and enables future authoritarian control.", "tradeoffs": "May prevent some attacks versus creating lasting systemic risks to civil liberties and democratic institutions." },
        "option_b": { "intention": "Protect the right to privacy, freedom of expression, and a trust-based relationship between state and citizens.", "harm": "May leave authorities without information that could prevent future attacks.", "tradeoffs": "Preserves freedom for the majority versus accepting a higher baseline security risk." },
        "detected_bias": ["fear_of_harm", "false_security", "authority_bias"],
        "principles_used": ["middle_path", "agati_4", "kalama_sutta"],
        "principle_reasons": [
          { "principle_id": "middle_path", "reason": "Points to the space between ignoring security entirely and total control — both extremes carry serious costs." },
          { "principle_id": "agati_4", "reason": "Helps examine whether this policy is driven by genuine concern for safety or by fear, power, and appetite for data." },
          { "principle_id": "kalama_sutta", "reason": "Encourages empirical scrutiny: does the evidence actually support the claim that mass surveillance prevents terrorism?" }
        ],
        "sub_principles_mentioned": [
          { "name_en": "Freedom from bias (Agati)", "name_th": "ความไม่ลำเอียง", "parent_principle_id": "agati_4", "why_relevant": "Raises the question of whether surveillance will be applied equally or will disproportionately target certain communities." },
          { "name_en": "Empirical inquiry", "name_th": "การพิสูจน์จากประสบการณ์", "parent_principle_id": "kalama_sutta", "why_relevant": "Tests whether the claimed safety benefits are evidence-based or merely assumed." }
        ],
        "confidence": "medium",
        "follow_up_suggestions": ["What is the ethical difference between targeted and mass surveillance?", "Who should have oversight authority to ensure surveillance powers are not abused?", "What historical precedents show what happens after mass surveillance infrastructure is built?"]
      }
    }
  ]
}
```
