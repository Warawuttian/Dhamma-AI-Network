6.update : reasoning_examples.json

Add some fields ให้ตรงกับ engine ใหม่
For example
{
  "id": "truth_vs_protection",
  "question": "Should I lie to protect a friend?",
  "signals": ["truth", "harm", "relationship"],
  "expected_principles": [
    "Five Precepts",
    "Brahmavihara 4",
    "Middle Path"
  ],
  "reasoning_pattern": {
    "intention": "...",
    "harm": "...",
    "tradeoffs": "...",
    "recommendation": "..."
  }
}

เพิ่ม examples ใหม่อีก 6–10 ตัวภายหลัง
เพื่อ cover principles ที่ยังไม่ถูกทดสอบ เช่น:
กาลามสูตร → ข่าว/ความเชื่อ/อำนาจ/ข่าวลือ
ไตรลักษณ์ → กลัวสูญเสีย/ยึดติด
สติปัฏฐาน 4 → อารมณ์แรง/ตอบโต้ทันที
ปัญญา 3 → รู้จากการอ่าน vs รู้จากประสบการณ์
อิทัปปัจจยตา → ปัญหาหลายปัจจัย
ปฏิจจสมุปบาท → pattern วนซ้ำ

อัปเดต schema ให้มี signals + expected_principles + principle_hashes