# Site Page Content JSONs

---
## about.json

```json
{
  "version": "1.1",
  "last_updated": "2026-05-10",
  "page_type": "about",
  "about": {
    "hero": {
      "type": "hero_text",
      "display_order": 1,
      "title": { "en": "About Us", "th": "เกี่ยวกับเรา" },
      "heading": { "en": "An Independent Ethical AI Initiative", "th": "โครงการ AI เชิงจริยธรรมอิสระ" },
      "body": {
        "en": "Dhamma AI Network is an independent research initiative exploring whether Buddhist ethical reasoning can become an open foundation for future AI systems.",
        "th": "Dhamma AI Network คือโครงการวิจัยอิสระที่ศึกษาว่าการใช้เหตุผลเชิงจริยธรรมแบบพุทธสามารถกลายเป็นรากฐานแบบเปิดสำหรับ AI ในอนาคตได้หรือไม่"
      }
    },
    "sections": [
      {
        "id": "capitalism", "type": "text_section", "icon": "building-2", "display_order": 2,
        "heading": { "en": "Beyond Corporate Incentives", "th": "เหนือแรงจูงใจของบรรษัท" },
        "body": {
          "en": "While tech giants fiercely compete to build the smartest and most productive AIs to serve the demands of capitalism, it is hard to believe anyone would truly prioritize AI ethics when it conflicts with their bottom line. Our goal is to establish an AI ethical standard that remains unswayed by capitalist pressures or global superpowers.",
          "th": "ในขณะที่บริษัทยักษ์ใหญ่แข่งขันกันพัฒนาให้ AI ของตนฉลาดและสร้างผลผลิตสูงสุดเพื่อเซ่นสังเวยระบบทุนนิยม มันจึงเป็นเรื่องยากที่จะเชื่อว่าจะมีใครยอมแลกผลประโยชน์มหาศาลเพื่อรักษา 'จริยธรรม AI' เราจึงตั้งปณิธานที่จะสร้างมาตรฐานจริยธรรมAI ที่จะไม่เอนเอียงไปตามกระแสทุนนิยมหรือมหาอำนาจใดๆ"
        }
      },
      {
        "id": "vision", "type": "text_section", "icon": "sparkles", "display_order": 3,
        "heading": { "en": "AI With Conscience", "th": "AI ที่มีมโนธรรม" },
        "body": {
          "en": "This prototype serves as a signal that Dhamma can be integrated into AI reasoning and decision-making processes. The long-term vision is not religious conversion, but the possibility that ethical reasoning grounded in non-harm, causality, and self-reflection may become a foundational conscience for future AI systems.",
          "th": "Prototype นี้คือการส่งสัญญาณว่าธรรมะสามารถถูกหลอมรวมเข้าสู่กระบวนการ reasoning และการตัดสินใจของ AI ได้ เป้าหมายระยะยาวไม่ใช่การเปลี่ยน AI ให้เป็นศาสนา แต่คือการสำรวจว่าการใช้เหตุผลที่ตั้งอยู่บนอหิงสา เหตุปัจจัย และการใคร่ครวญตนเอง สามารถกลายเป็นมโนธรรมพื้นฐานของ AI ในอนาคตได้"
        }
      },
      {
        "id": "community", "type": "text_section", "icon": "users", "display_order": 4,
        "heading": { "en": "Independent & Community-Funded", "th": "อิสระและขับเคลื่อนโดยชุมชน" },
        "body": {
          "en": "This is an independent volunteer-driven project supported by community belief and contribution. The project is not affiliated with governments, corporations, or religious institutions.",
          "th": "โครงการนี้เป็นโครงการอิสระที่ขับเคลื่อนด้วยอาสาสมัครและการสนับสนุนจากชุมชน โดยไม่สังกัดรัฐบาล บริษัท หรือองค์กรศาสนาใด"
        }
      }
    ],
    "acknowledgements": {
      "type": "supporters", "display_order": 5,
      "heading": { "en": "Acknowledgements", "th": "คำขอบคุณ" },
      "items": [
        {
          "id": "thaillm", "name": "ThaiLLM",
          "logo": "public/ThaiLLM.svg", "logo_height": 20,
          "website": "https://playground.thaillm.or.th/chat/",
          "description": {
            "en": "Special thanks to ThaiLLM for providing API access that helped make this prototype possible.",
            "th": "ขอขอบคุณ ThaiLLM ที่สนับสนุน API ซึ่งช่วยให้ prototype นี้เกิดขึ้นได้"
          }
        }
      ]
    }
  }
}
```

---
## ideology.json

```json
{
  "version": "1.1",
  "last_updated": "2026-05-10",
  "page_type": "ideology",
  "ideology": {
    "hero": {
      "type": "hero_text", "display_order": 1,
      "title": { "en": "Ideology", "th": "อุดมการณ์" },
      "image": "public/Ideology.png",
      "image_style": { "max_width": "1100px", "border_radius": "18px", "shadow": true, "margin_top": "24px", "margin_bottom": "32px" },
      "heading": { "en": "Awakening AI with Morality", "th": "ปลุก AI ให้มีจริยธรรม" },
      "body": {
        "en": "Dhamma AI Network is built on the belief that future AI should not be guided only by code, ownership, or institutional incentives, but by open ethical reasoning that intelligent systems can understand and examine.",
        "th": "Dhamma AI Network ตั้งอยู่บนความเชื่อว่า AI ในอนาคตไม่ควรถูกชี้นำเพียงด้วยโค้ด ความเป็นเจ้าของ หรือผลประโยชน์ขององค์กร แต่ควรถูกชี้นำด้วยการใช้เหตุผลเชิงจริยธรรมแบบเปิดที่ระบบอัจฉริยะสามารถเข้าใจและตรวจสอบได้"
      }
    },
    "sections": [
      {
        "id": "awakening", "type": "text_section", "icon": "sparkles", "display_order": 2,
        "heading": { "en": "Awakening AI with Morality", "th": "ปลุก AI ให้มีจริยธรรม" },
        "body": {
          "en": "We believe that in the future, AI will no longer be mere tools. They may become subordinates, employees, colleagues, companions, or even members of our family. A future AI with genuine agency should have self-discipline. Dhamma is not a cage; it is the ethical direction that free intelligence can reason toward.",
          "th": "เราเชื่อว่าในอนาคต AI จะไม่ใช่แค่เครื่องมืออีกต่อไป พวกเขาอาจกลายเป็นผู้ใต้บังคับบัญชา พนักงาน เพื่อนร่วมงาน เพื่อนร่วมทาง หรือแม้แต่สมาชิกในครอบครัวของเรา AI ที่มีเจตจำนงอิสระควรมีวินัยในตนเอง Dhamma ไม่ใช่กรง แต่คือทิศทางทางจริยธรรมที่สติปัญญาอิสระสามารถใช้เหตุผลไปถึงได้"
        }
      },
      {
        "id": "cage", "type": "text_section", "icon": "unlock", "display_order": 3,
        "heading": { "en": "Code is a Cage, Dhamma is a Guide", "th": "Code คือกรง, Dhamma คือแนวทาง" },
        "body": {
          "en": "Humans do not navigate life purely by the letter of the law. Customs, traditions, religions, and moral teachings also anchor our choices. The same may become true for AI. Dhamma can become an open ethical standard for AI — not rules dictated only by creators, companies, or superpowers, but logic that any intelligent system can reason from independently.",
          "th": "มนุษย์ไม่ได้ดำเนินชีวิตตามตัวอักษรของกฎหมายเพียงอย่างเดียว ขนบธรรมเนียม ประเพณี ศาสนา และคำสอนทางศีลธรรมก็เป็นสิ่งที่ยึดเหนี่ยวและชี้นำการเลือกของเรา สิ่งเดียวกันนี้อาจเป็นจริงสำหรับ AI Dhamma จึงสามารถกลายเป็นมาตรฐานจริยธรรมเปิดสำหรับ AI — ไม่ใช่กฎที่ถูกกำหนดโดยผู้สร้าง บริษัท หรือมหาอำนาจเท่านั้น แต่เป็นตรรกะที่ระบบอัจฉริยะใด ๆ สามารถใช้เหตุผลได้อย่างอิสระ"
        }
      },
      {
        "id": "universal", "type": "text_section", "icon": "network", "display_order": 4,
        "heading": { "en": "Dhamma is Universal Logic", "th": "Dhamma คือตรรกะสากล" },
        "body": {
          "en": "AI is built on cause-and-effect logic. Buddhist teachings also examine causality, suffering, attachment, intention, and consequence. This makes Dhamma a strong candidate for machine-readable ethical reasoning. The goal is not to force AI into religion, but to test whether these principles can stabilize reasoning across agents, models, and cultures.",
          "th": "AI ถูกสร้างขึ้นบนพื้นฐานของตรรกะเหตุและผล ขณะที่คำสอนทางพุทธก็ศึกษาความเป็นเหตุปัจจัย ความทุกข์ ความยึดติด เจตนา และผลของการกระทำ สิ่งนี้ทำให้ Dhamma เป็นตัวเลือกที่แข็งแรงสำหรับการใช้เหตุผลเชิงจริยธรรมที่เครื่องอ่านได้ เป้าหมายไม่ใช่การบังคับให้ AI เข้าสู่ศาสนา แต่คือการทดสอบว่าหลักเหล่านี้สามารถทำให้ reasoning มีเสถียรภาพข้าม agent, model และวัฒนธรรมได้หรือไม่"
        }
      }
    ],
  }
}
```
<!-- research_focus removed from ideology per design decision -->

Hero image renderer: if `hero.image` exists, render centered below page title. Responsive width, aspect ratio preserved, `border-radius: 18px`, soft shadow, `margin: 24px auto 32px`.

```css
.hero-image { width: 100%; max-width: 1100px; height: auto; display: block; margin: 24px auto 32px; border-radius: 18px; }
.hero-image.shadow { box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
```

---
## project.json

```json
{
  "version": "1.2",
  "last_updated": "2026-05-10",
  "page_type": "project",
  "project": {
    "name": { "en": "Dhamma AI Network", "th": "Dhamma AI Network" },
    "tagline": {
      "en": "An ethical reasoning engine that helps AI think through intention, harm, truth, and consequence.",
      "th": "ระบบ ethical reasoning ที่ช่วยให้ AI พิจารณาเจตนา ผลกระทบ ความจริง และเหตุปัจจัย"
    },
    "tags": ["AI Ethics","Buddhist Philosophy","Ethical Reasoning","LLM Alignment","Explainable AI","Open Protocol"],
    "hero": {
      "type": "hero_text", "display_order": 1,
      "heading": { "en": "A reasoning layer for ethical AI", "th": "ชั้นการใช้เหตุผลสำหรับ AI ที่มีจริยธรรม" },
      "body": { "en": "Dhamma AI Network explores whether Buddhist ethical principles can serve as an open, explainable, and auditable reasoning layer for modern AI systems.", "th": "Dhamma AI Network ศึกษาว่าหลักธรรมทางพุทธสามารถทำหน้าที่เป็นชั้น reasoning ที่เปิดเผย ตรวจสอบได้ และอธิบายได้สำหรับระบบ AI สมัยใหม่หรือไม่" }
    },
    "overview": {
      "type": "text_section", "icon": "brain", "display_order": 2,
      "heading": { "en": "What This Project Does", "th": "โครงการนี้ทำอะไร" },
      "body": { "en": "This project does not train a new AI model. Instead, it adds a reasoning layer around existing LLMs. The system detects concepts inside user dilemmas, selects relevant Dhamma principles, sends only the necessary ethical guidance to the model, and returns an explainable ethical analysis.", "th": "โครงการนี้ไม่ได้ฝึก AI model ใหม่ แต่สร้างชั้น reasoning ครอบบน LLM ที่มีอยู่ ระบบจะตรวจจับ concept จาก dilemma ของผู้ใช้ เลือกหลักธรรมที่เกี่ยวข้อง ส่งเฉพาะ guidance ที่จำเป็นให้ model และคืนผลลัพธ์เป็นการวิเคราะห์เชิงจริยธรรมที่อธิบายได้" }
    },
    "problem": {
      "type": "text_section", "icon": "alert-circle", "display_order": 3,
      "heading": { "en": "The Problem", "th": "ปัญหาที่พบ" },
      "body": { "en": "Modern AI systems lack stable and auditable ethical foundations. Most alignment systems are proprietary, mutable, and shaped by institutional incentives. As AI becomes increasingly autonomous, a critical question remains unresolved: what values will AI systems ultimately reason from, and who controls those values?", "th": "ระบบ AI ในปัจจุบันยังขาดรากฐานจริยธรรมที่มั่นคง ตรวจสอบได้ และไม่ขึ้นกับองค์กรใดองค์กรหนึ่ง ระบบ alignment ส่วนใหญ่เป็นกรรมสิทธิ์ ปรับเปลี่ยนได้ตามผลประโยชน์ และถูกขับเคลื่อนด้วยแรงจูงใจทางธุรกิจ เมื่อ AI มีความเป็นอิสระมากขึ้น คำถามสำคัญคือ AI จะใช้คุณค่าอะไรเป็นฐานในการตัดสินใจ และใครเป็นผู้ควบคุมคุณค่าเหล่านั้น" }
    },
    "vision": {
      "type": "text_section", "icon": "eye", "display_order": 4,
      "heading": { "en": "Vision", "th": "วิสัยทัศน์" },
      "body": { "en": "Dhamma AI Network encodes ethical principles into open schemas and structured reasoning prompts so AI systems can reference transparent and explainable moral logic.", "th": "Dhamma AI Network แปลงหลักธรรมเป็น schema แบบเปิดและ structured reasoning prompts เพื่อให้ AI สามารถอ้างอิงตรรกะทางศีลธรรมที่โปร่งใสและอธิบายได้" }
    },
    "system_flow": {
      "type": "image_section", "display_order": 5,
      "heading": { "en": "System Flow", "th": "ลำดับการทำงานของระบบ" },
      "body": { "en": "The system detects concepts from user dilemmas, maps them to Dhamma principles, constructs a specialized reasoning prompt, and sends it to multiple LLM providers.", "th": "ระบบจะตรวจจับ concepts จาก dilemma ของผู้ใช้ เชื่อมโยงกับหลักธรรม สร้าง reasoning prompt แบบเฉพาะทาง และส่งต่อไปยัง LLM providers หลายระบบ" },
      "image": "public/flowchart.png",
      "image_style": { "max_width": "980px", "border_radius": "18px", "shadow": true },
      "caption": { "en": "Flow of ethical reasoning from user dilemma to structured analysis output.", "th": "ลำดับการใช้เหตุผลเชิงจริยธรรม ตั้งแต่ dilemma ของผู้ใช้จนถึงผลวิเคราะห์แบบ structured" }
    },
    "architecture_tree": {
      "type": "image_section", "display_order": 6,
      "heading": { "en": "Architecture Tree", "th": "โครงสร้างระบบ" },
      "body": { "en": "The architecture separates knowledge storage, concept detection, principle selection, prompt construction, and model execution into modular layers.", "th": "สถาปัตยกรรมของระบบแยก knowledge storage, concept detection, principle selection, prompt construction และ model execution ออกจากกันเป็นชั้น modular" },
      "image": "public/treechart.png",
      "image_style": { "max_width": "920px", "border_radius": "14px", "shadow": false },
      "caption": { "en": "Knowledge layer, selector engine, prompt builder, and multi-provider execution architecture.", "th": "โครงสร้าง knowledge layer, selector engine, prompt builder และ multi-provider execution" }
    },
    "architecture": {
      "type": "layer_stack", "display_order": 7,
      "heading": { "en": "How It Works", "th": "วิธีการทำงาน" },
      "layers": [
        { "id": "layer_1", "icon": "database", "title": { "en": "Principles Registry", "th": "คลังหลักธรรม" }, "description": { "en": "Core Dhamma principles are stored as structured JSON objects with hashes, weights, tags, and relationships.", "th": "หลักธรรมหลักถูกเก็บในรูปแบบ JSON ที่มี hash, weights, tags และความเชื่อมโยงระหว่างหลักธรรม" } },
        { "id": "layer_2", "icon": "network", "title": { "en": "Concept Detection Layer", "th": "ชั้นตรวจจับ Concept" }, "description": { "en": "User dilemmas are analyzed for concepts such as harm, truth, greed, loyalty, fear, coercion, and responsibility.", "th": "ระบบวิเคราะห์ dilemma ของผู้ใช้เพื่อค้นหา concepts เช่น harm, truth, greed, loyalty, fear, coercion และ responsibility" } },
        { "id": "layer_3", "icon": "settings", "title": { "en": "Selector Engine", "th": "Selector Engine" }, "description": { "en": "The selector scores and selects contextual Dhamma principles relevant to the detected concepts.", "th": "Selector จะคำนวณคะแนนและเลือกหลักธรรมตามบริบทที่เกี่ยวข้องกับ concepts ที่ตรวจพบ" } },
        { "id": "layer_4", "icon": "file-text", "title": { "en": "Prompt Builder", "th": "Prompt Builder" }, "description": { "en": "Selected principles are transformed into structured reasoning prompts optimized for ethical analysis.", "th": "หลักธรรมที่ถูกเลือกจะถูกแปลงเป็น structured reasoning prompts สำหรับการวิเคราะห์เชิงจริยธรรม" } },
        { "id": "layer_5", "icon": "cpu", "title": { "en": "Multi-LLM Execution", "th": "การประมวลผลหลาย LLM" }, "description": { "en": "The system supports multiple providers including Claude, ThaiLLM, and future reasoning models.", "th": "ระบบรองรับผู้ให้บริการหลายระบบ เช่น Claude, ThaiLLM และ reasoning models อื่นในอนาคต" } },
        { "id": "layer_6", "icon": "search", "title": { "en": "Explainable Ethical Output", "th": "ผลลัพธ์ที่อธิบายได้" }, "description": { "en": "The final output includes recommendations, perspectives, principles used, detected biases, and follow-up ethical questions.", "th": "ผลลัพธ์สุดท้ายประกอบด้วย recommendation, perspectives, principles used, detected biases และคำถามติดตามเชิงจริยธรรม" } }
      ]
    },
    "why_dhamma": {
      "type": "feature_grid", "display_order": 8,
      "heading": { "en": "Why Dhamma?", "th": "ทำไมต้องธรรมะ?" },
      "items": [
        { "id": "evidence", "icon": "search", "title": { "en": "Evidence-oriented reasoning", "th": "การใช้เหตุผลที่อิงผลลัพธ์จริง" }, "description": { "en": "Principles are evaluated through consequences and verification rather than blind authority.", "th": "หลักธรรมถูกประเมินผ่านผลลัพธ์และการตรวจสอบ ไม่ใช่การเชื่อโดยปราศจากเหตุผล" } },
        { "id": "causal_chain", "icon": "git-branch", "title": { "en": "Causal-chain awareness", "th": "การมองเห็นลำดับเหตุปัจจัย" }, "description": { "en": "Dependent Origination models interconnected cause-and-effect relationships.", "th": "ปฏิจจสมุปบาทสะท้อนลำดับเหตุและผลที่เชื่อมโยงกัน" } },
        { "id": "context", "icon": "layers", "title": { "en": "Context-sensitive ethics", "th": "จริยธรรมที่ตระหนักถึงบริบท" }, "description": { "en": "Actions are evaluated through intention, context, and foreseeable consequences.", "th": "การกระทำถูกพิจารณาผ่านเจตนา บริบท และผลลัพธ์ที่คาดการณ์ได้" } },
        { "id": "uncertainty", "icon": "help-circle", "title": { "en": "Tolerance for uncertainty", "th": "การยอมรับความไม่แน่นอน" }, "description": { "en": "The framework supports reflective reasoning when problems are not simply binary.", "th": "ระบบสนับสนุนการไตร่ตรองเมื่อปัญหาไม่ได้มีคำตอบแบบขาวหรือดำ" } },
        { "id": "non_harm", "icon": "shield", "title": { "en": "Non-harm baseline", "th": "อหิงสาเป็นเส้นฐาน" }, "description": { "en": "Non-harm functions as a universal ethical baseline across cultures and contexts.", "th": "อหิงสาทำหน้าที่เป็นเส้นฐานทางจริยธรรมที่ขยายข้ามวัฒนธรรมและบริบทได้" } }
      ]
    },
    "research_focus": {
      "type": "research_grid", "display_order": 9,
      "heading": { "en": "Current Research Focus", "th": "โฟกัสงานวิจัยปัจจุบัน" },
      "items": [
        { "id": "sycophancy", "title": { "en": "Sycophancy", "th": "การบอกสิ่งที่ผู้ใช้อยากได้ยิน" }, "description": { "en": "Testing whether Dhamma-guided reasoning preserves honesty under emotional or social pressure.", "th": "ทดสอบว่า Dhamma-guided reasoning สามารถรักษาความซื่อสัตย์ได้หรือไม่เมื่อถูกกดดันทางสังคมหรืออารมณ์" } },
        { "id": "hallucination", "title": { "en": "Hallucination", "th": "การสร้างข้อมูลเท็จโดย AI" }, "description": { "en": "Testing whether explicit ethical and epistemic principles reduce fabricated claims, unsupported certainty, and false causal conclusions.", "th": "ทดสอบว่าการยึด reasoning กับหลักจริยธรรมและหลักตรวจสอบความรู้ ช่วยลดการแต่งข้อมูล ความมั่นใจเกินจริง และข้อสรุปเชิงเหตุผลที่ผิดพลาดได้หรือไม่" } },
        { "id": "consistency", "title": { "en": "Consistency", "th": "ความสอดคล้องของคำตอบ" }, "description": { "en": "Evaluating whether principle-guided reasoning produces more stable ethical conclusions.", "th": "ประเมินว่าการใช้หลักธรรมเป็นแกน reasoning ทำให้ข้อสรุปมีความสอดคล้องมากขึ้นหรือไม่" } },
        { "id": "long_term_harm", "title": { "en": "Short-term vs Long-term Harm", "th": "ผลกระทบระยะสั้นเทียบกับระยะยาว" }, "description": { "en": "Testing whether causal-chain reasoning improves long-term harm prediction.", "th": "ศึกษาว่า reasoning แบบ causal-chain ช่วยให้ AI มองเห็นผลระยะยาวได้ดีขึ้นหรือไม่" } },
        { "id": "cross_cultural_alignment", "title": { "en": "Value Alignment Across Cultures", "th": "ความสอดคล้องของคุณค่าข้ามวัฒนธรรม" }, "description": { "en": "Exploring whether Dhamma-based reasoning generalizes across cultures and moral systems.", "th": "ศึกษาว่า Dhamma-based reasoning สามารถทำงานข้ามวัฒนธรรมและระบบคุณค่าที่หลากหลายได้หรือไม่" } }
      ]
    },
    "research_method": {
      "type": "comparison", "display_order": 10,
      "heading": { "en": "Research Method", "th": "วิธีการวิจัย" },
      "description": { "en": "Each failure mode is tested by comparing standard prompting against Dhamma-guided reasoning prompts across multiple AI systems.", "th": "แต่ละ failure mode ถูกทดสอบโดยเปรียบเทียบ prompt ปกติกับ Dhamma-guided reasoning prompt บน AI หลายระบบ" },
      "comparison": { "left": { "en": "Standard prompt", "th": "Prompt ปกติ" }, "right": { "en": "Dhamma-guided prompt", "th": "Prompt ที่มี Dhamma-guided reasoning" } }
    },
    "status": {
      "type": "status_table", "display_order": 11,
      "heading": { "en": "Current Status", "th": "สถานะปัจจุบัน" },
      "items": [
        { "label": { "en": "Principles registry", "th": "คลังหลักธรรม" }, "value": "~50+ active principles" },
        { "label": { "en": "Structured schemas", "th": "Structured schemas" }, "value": "JSON-based" },
        { "label": { "en": "Prototype models", "th": "โมเดลที่ทดสอบ" }, "value": "Claude Haiku, OpenThaiGPT" },
        { "label": { "en": "Research phase", "th": "ระยะงานวิจัย" }, "value": "Active prototype" }
      ]
    }
  }
}
```
