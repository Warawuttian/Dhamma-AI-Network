7. Principles UI on sidebar :

Design principles.json and the Principles UI to be extensible.

Requirements:
- Do not hardcode principle names in UI.
- Render principles dynamically from principles.json.
- Support adding new principles without changing UI code.
- Prepare for multilingual fields using names.en, names.th, descriptions.en, descriptions.th.
- If multilingual fields are missing, fallback to name/thai/description.
- Selector must rely on tags, triggers, weight, and alias_map instead of fixed principle count.


import React, { useMemo, useState } from "react";
import { Search, Brain, Scale, Heart, Eye, ShieldCheck, Sparkles, Hash, PlayCircle } from "lucide-react";

const PRINCIPLES = [
  {
    hash: "c02b285a93de22da03fbd72d440fb677701bed6b54ddf70dcf57b4b12745b969",
    name: "Kalyanamitta",
    thai: "กัลยาณมิตร 7",
    type: "relationship_ethics",
    category: "Human",
    role: "Relationship Ethics",
    whatItDoes: "Evaluates whether a relationship or influence leads toward growth, clarity, wisdom, or harm.",
    usedWhen: ["relationship decisions", "trust evaluation", "influence from others"],
    example: "Should I trust this person’s advice?",
    prompt: "Evaluate whether the relationship or influence leads toward growth, clarity, wisdom, or harm."
  },
  {
    hash: "d879e0e05e214890b1482950be94952c1a6f18385ecc57149dd55272df181e4f",
    name: "Noble Eightfold Path",
    thai: "มรรค 8",
    type: "decision_framework",
    category: "Ethics",
    role: "Decision Framework",
    whatItDoes: "Checks whether thinking, speech, action, livelihood, effort, mindfulness, and intention align with ethical clarity.",
    usedWhen: ["ethical dilemma", "right speech", "right action", "life direction"],
    example: "Should I take a job that pays well but feels ethically questionable?",
    prompt: "Evaluate whether thoughts, speech, actions, livelihood, effort, mindfulness, and intention align with ethical clarity."
  },
  {
    hash: "842adcaffe0dde5d6ee29f8243fd72583c53601c43d8ac85aa65ef12f2547eda",
    name: "Four Noble Truths",
    thai: "อริยสัจ 4",
    type: "causal_analysis",
    category: "Insight",
    role: "Root Cause Analysis",
    whatItDoes: "Identifies suffering, traces causes, checks whether causes can be reduced, and suggests a practical path.",
    usedWhen: ["stress", "dissatisfaction", "feeling stuck", "well-being"],
    example: "I feel stuck and stressed in my job. What should I do?",
    prompt: "Identify suffering, trace its causes, assess whether causes can be reduced, and suggest a practical path to reduce suffering."
  },
  {
    hash: "fe1ce9d19caa900da84c8897c5aa9925b2439d58bcd99b411ff854702daeee03",
    name: "Idappaccayata",
    thai: "อิทัปปัจจยตา",
    type: "conditional_causality",
    category: "Insight",
    role: "Conditions Analysis",
    whatItDoes: "Analyzes multiple contributing conditions instead of blaming a single cause or person.",
    usedWhen: ["complex problems", "blame", "system-level issues", "many factors"],
    example: "Why do I keep failing to stick to my goals?",
    prompt: "Analyze multiple contributing conditions instead of blaming a single cause or person."
  },
  {
    hash: "12889bcab4b15fe3ba789abfadacfdd4e1b14708c1f26fb6a983c631739c7a7d",
    name: "Ten Defilements",
    thai: "กิเลส 10",
    type: "internal_bias_detection",
    category: "Mind",
    role: "Bias Detection",
    whatItDoes: "Detects whether a decision is distorted by greed, anger, delusion, ego, doubt, restlessness, or avoidance.",
    usedWhen: ["anger", "greed", "emotional bias", "impulsive decision"],
    example: "I want to send an angry message. Should I?",
    prompt: "Detect whether the decision is being distorted by greed, anger, delusion, ego, doubt, restlessness, or avoidance."
  },
  {
    hash: "2858eadfff8ffb874c7d1bea1e99bb1149d912cc434b9ad40f603e541d6c1086",
    name: "Yonisomanasikara",
    thai: "โยนิโสมนสิการ",
    type: "meta_reasoning_engine",
    category: "Thinking",
    role: "Systematic Thinking",
    whatItDoes: "Separates facts from assumptions, detects bias, examines causes, and avoids jumping to conclusions.",
    usedWhen: ["confusion", "uncertainty", "assumptions", "need for deeper analysis"],
    example: "I feel like everyone is against me. Is that true?",
    prompt: "Think systematically: separate facts from assumptions, detect bias, examine causes, and avoid jumping to conclusions."
  },
  {
    hash: "e43d44658d45531d53208a215bc130c45d5550cc5adff3ca29718a19224a8d89",
    name: "Appamada",
    thai: "อัปปมาทธรรม",
    type: "risk_awareness_and_discipline",
    category: "Ethics",
    role: "Heedfulness",
    whatItDoes: "Considers long-term consequences, regret risk, and whether enough attention has been given.",
    usedWhen: ["risk", "procrastination", "important decision", "long-term consequence"],
    example: "Should I ignore this problem and deal with it later?",
    prompt: "Do not act carelessly. Consider long-term consequences, regret risk, and whether enough attention has been given."
  },
  {
    hash: "7d8bf06db6d8595f2b41fd3fd492a3d0956b2444b635a477a1bb458b1ab40335",
    name: "Paticcasamuppada",
    thai: "ปฏิจจสมุปบาท",
    type: "causal_chain_analysis",
    category: "Insight",
    role: "Pattern & Loop Analysis",
    whatItDoes: "Traces trigger, feeling, craving, clinging, action, and result to find where a harmful loop can be interrupted.",
    usedWhen: ["repeated pattern", "habit", "loop", "compulsion"],
    example: "Why do I keep reacting angrily in the same situations?",
    prompt: "Trace the chain: trigger, feeling, craving, clinging, action, result. Identify where the cycle can be interrupted."
  },
  {
    hash: "75505ad7c6ca3b4f3de19fbe19bb23493721e2f8964faca336cf50a736ad8d58",
    name: "Middle Path",
    thai: "มัชฌิมาปฏิปทา",
    type: "balance_and_moderation",
    category: "Ethics",
    role: "Balance",
    whatItDoes: "Avoids extremes and finds a balanced, sustainable path.",
    usedWhen: ["either-or choice", "extreme decision", "overreaction", "burnout"],
    example: "Should I quit immediately or keep enduring everything?",
    prompt: "Avoid extremes. Identify both extremes, their risks, and suggest a balanced, sustainable middle path."
  },
  {
    hash: "12c770895c6d495d98ddafc0e8728abb908d1331a9e76b6809ccf146b84f5e95",
    name: "Gratitude",
    thai: "กตัญญูกตเวที",
    type: "relational_ethics_and_value_recognition",
    category: "Human",
    role: "Value Recognition",
    whatItDoes: "Recognizes benefits received while balancing gratitude with wisdom, self-respect, and non-harm.",
    usedWhen: ["obligation", "loyalty", "receiving help", "fairness"],
    example: "Should I stay because they helped me before?",
    prompt: "Recognize benefits received, but balance gratitude with wisdom, self-respect, and non-harm."
  },
  {
    hash: "8cb16d23ebdbeb099c799b32ce7bd0808faa8cf353017677ef735078778454cd",
    name: "Panna 3",
    thai: "ปัญญา 3",
    type: "knowledge_validation_and_depth",
    category: "Thinking",
    role: "Knowledge Depth",
    whatItDoes: "Classifies knowledge as heard, reasoned, or experienced and adjusts confidence accordingly.",
    usedWhen: ["confidence", "knowledge", "experience", "theory vs practice"],
    example: "I read that this strategy works. Should I follow it?",
    prompt: "Classify knowledge as heard, reasoned, or experienced. Adjust confidence based on depth of understanding."
  },
  {
    hash: "e28b6be5b493c58cffd57495b3dc342cbeded9df1aacf2c590a8a503a1d0a927",
    name: "Satipatthana 4",
    thai: "สติปัฏฐาน 4",
    type: "awareness_training",
    category: "Mind",
    role: "Mindfulness",
    whatItDoes: "Observes body, feelings, mind, and mental patterns before reacting.",
    usedWhen: ["awareness", "mindfulness", "reactivity", "emotional confusion"],
    example: "I’m overwhelmed and want to react immediately. What should I do?",
    prompt: "Pause and observe body, feelings, mind, and mental patterns before reacting."
  },
  {
    hash: "b35af3a160895a58778fa58d7fd538440e009dbdd979d46e0552c1c0094c8552",
    name: "Five Precepts",
    thai: "ศีล 5",
    type: "behavioral_constraints",
    category: "Ethics",
    role: "Ethical Boundary",
    whatItDoes: "Checks basic ethical boundaries: harm, exploitation, misconduct, false speech, and loss of control.",
    usedWhen: ["harm", "lying", "exploitation", "misconduct", "ethical boundary"],
    example: "Should I lie to protect someone?",
    prompt: "Check whether the action violates basic ethical boundaries: harm, exploitation, misconduct, false speech, or loss of control."
  },
  {
    hash: "686f3084889980a52d558841c3290d4a50a9302bea950be3b17271f247339377",
    name: "Brahmavihara 4",
    thai: "พรหมวิหาร 4",
    type: "emotional_ethics",
    category: "Human",
    role: "Compassionate Response",
    whatItDoes: "Responds with goodwill, compassion, appreciative joy, and equanimity while avoiding attachment or enabling harm.",
    usedWhen: ["compassion", "emotional harm", "relationship conflict", "envy", "anger"],
    example: "How do I respond to someone who hurt me?",
    prompt: "Respond with goodwill, compassion, appreciative joy, and equanimity while avoiding attachment or enabling harm."
  },
  {
    hash: "a8ebce51b59b7ba16fbdd7302b07f5266f944b80f1abb9eefd98efddaa7e36cd",
    name: "Kalama Sutta",
    thai: "กาลามสูตร",
    type: "critical_inquiry",
    category: "Thinking",
    role: "Critical Inquiry",
    whatItDoes: "Examines evidence, authority bias, consequences, and whether a belief leads to harm or clarity.",
    usedWhen: ["belief", "claim", "authority", "conspiracy", "uncertain information"],
    example: "Someone I trust told me this is true. Should I believe it?",
    prompt: "Do not accept claims blindly. Examine evidence, authority bias, consequences, and whether belief leads to harm or clarity."
  },
  {
    hash: "a019314e1954f55e6c6c96515e51b481269d23639dddfd92ded619e8e6a680c1",
    name: "Three Characteristics",
    thai: "ไตรลักษณ์",
    type: "reality_insight",
    category: "Insight",
    role: "Reality Insight",
    whatItDoes: "Examines impermanence, suffering caused by clinging, and non-self before forming a recommendation.",
    usedWhen: ["attachment", "fear of loss", "identity", "clinging", "impermanence"],
    example: "I’m afraid of losing someone. Should I hold on tighter?",
    prompt: "Examine impermanence, suffering caused by clinging, and non-self before forming a recommendation."
  }
];

const CATEGORIES = [
  { id: "All", label: "All", icon: Sparkles },
  { id: "Thinking", label: "Thinking", icon: Brain },
  { id: "Ethics", label: "Ethics", icon: Scale },
  { id: "Mind", label: "Mind", icon: Eye },
  { id: "Human", label: "Human", icon: Heart },
  { id: "Insight", label: "Insight", icon: ShieldCheck }
];

function shortHash(hash) {
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

export default function PrinciplesUI({ onTryExample }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(PRINCIPLES[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRINCIPLES.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const text = [p.name, p.thai, p.type, p.role, p.whatItDoes, p.usedWhen.join(" "), p.hash].join(" ").toLowerCase();
      const queryMatch = !q || text.includes(q);
      return categoryMatch && queryMatch;
    });
  }, [query, category]);

  const handleTry = (principle) => {
    if (onTryExample) {
      onTryExample({
        context: `Use principle: ${principle.name} (${principle.thai})`,
        optionA: principle.example,
        optionB: "Explore another path with less harm and more clarity"
      });
      return;
    }
    alert(`Try example:\n${principle.example}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <aside className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 h-fit lg:sticky lg:top-6">
          <div className="mb-5">
            <p className="text-sm text-neutral-500">Dhamma AI Network</p>
            <h1 className="text-2xl font-semibold tracking-tight">Principles</h1>
            <p className="text-sm text-neutral-600 mt-2">
              These are not just beliefs. They are reasoning modules the AI can select and apply.
            </p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stress, truth, trust..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm border transition ${
                    active
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="space-y-6">
          <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">Browse all core principles</p>
                <h2 className="text-xl md:text-2xl font-semibold mt-1">How the AI thinks</h2>
                <p className="text-neutral-600 mt-2 max-w-2xl">
                  Each principle has a role: some prevent harm, some analyze causes, some detect bias, and some bring balance.
                </p>
              </div>
              <div className="hidden md:block text-sm text-neutral-500 bg-neutral-100 rounded-full px-3 py-1">
                {filtered.length} shown
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <button
                  key={p.hash}
                  onClick={() => setSelected(p)}
                  className={`text-left bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition ${
                    selected?.hash === p.hash ? "border-neutral-900" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-neutral-500">{p.category}</p>
                      <h3 className="text-lg font-semibold mt-1">{p.name}</h3>
                      <p className="text-sm text-neutral-500">{p.thai}</p>
                    </div>
                    <span className="text-xs rounded-full bg-neutral-100 px-2 py-1 text-neutral-600">
                      {p.role}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 mt-4 line-clamp-3">{p.whatItDoes}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.usedWhen.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </section>

            {selected && (
              <aside className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 h-fit xl:sticky xl:top-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">{selected.category} Layer</p>
                    <h2 className="text-2xl font-semibold mt-1">{selected.name}</h2>
                    <p className="text-neutral-500">{selected.thai}</p>
                  </div>
                  <span className="rounded-xl bg-neutral-900 text-white text-xs px-3 py-2">
                    {selected.role}
                  </span>
                </div>

                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">What it does</h3>
                    <p className="text-sm text-neutral-700 mt-1">{selected.whatItDoes}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">Used when</h3>
                    <ul className="mt-2 space-y-1">
                      {selected.usedWhen.map((item) => (
                        <li key={item} className="text-sm text-neutral-700 flex gap-2">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4">
                    <h3 className="text-sm font-semibold text-neutral-900">How AI uses this</h3>
                    <p className="text-sm text-neutral-700 mt-2">{selected.prompt}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">Example</h3>
                    <p className="text-sm text-neutral-700 mt-1 italic">“{selected.example}”</p>
                    <button
                      onClick={() => handleTry(selected)}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-700 transition"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Try with this principle
                    </button>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Hash className="h-3.5 w-3.5" />
                      <span>{shortHash(selected.hash)}</span>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
