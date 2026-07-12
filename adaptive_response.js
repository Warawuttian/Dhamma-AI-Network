const DHAMMA_KEYWORDS = [
  "dhamma", "dharma", "karma", "kamma", "anatta", "khanda", "khandha",
  "clinging", "craving", "impermanence", "anicca", "dukkha",
  "non-self", "nonself", "rebirth", "liberation", "nirvana", "nibbana",
  "satipatthana", "vipassana", "jhana", "samadhi", "panna", "prajna",
  "vedana", "sankhara", "vinnana", "tanha", "upadana", "paticcasamuppada",
  "brahmavihara", "metta", "karuna", "mudita", "upekkha",
  "samsara", "cetana", "citta", "cetasika", "avijja", "kilesa",
  "yonisomanasikara", "appamada", "kalama", "lokadhamma", "micchaditthi"
];

const CONCEPT_ASK_PATTERNS = [
  /explain\s+\w/i,
  /what is\s+\w/i,
  /what are\s+\w/i,
  /tell me about\s+\w/i,
  /how does\s+\w+\s+apply/i,
  /define\s+\w/i,
  /meaning of\s+\w/i,
];

function detectUserDhammaLevel(inputText) {
  const normalized = inputText.toLowerCase();
  const matches = DHAMMA_KEYWORDS.filter((kw) => normalized.includes(kw));

  const asksAboutConcept =
    matches.length >= 1 && CONCEPT_ASK_PATTERNS.some((p) => p.test(normalized));

  if (asksAboutConcept || matches.length >= 3) return "advanced";
  if (matches.length >= 1) return "familiar";
  return "general";
}

function getExposureLevel(userLevel) {
  if (userLevel === "advanced") return "full_dhamma";
  if (userLevel === "familiar") return "light_dhamma";
  return "plain";
}

function formatPrincipleForPrompt(principle, exposureLevel, lang) {
  const isThai = lang === "th";
  const instruction = isThai
    ? (principle.behavior_instruction_th || principle.prompt_injection_th || principle.behavior_instruction || principle.prompt_injection || "")
    : (principle.behavior_instruction || principle.prompt_injection || "");
  const label = isThai
    ? (principle.name_th || principle.thai || principle.name || principle.name_en || "")
    : (principle.name_en || principle.name || "");

  if (exposureLevel === "plain") {
    return `- ${instruction}`;
  }
  if (exposureLevel === "light_dhamma") {
    return `- [${label}] ${instruction}`;
  }
  // full_dhamma
  const thaiName = principle.name_th || principle.thai || "";
  const layer = principle.layer || "contextual";
  const nameDisplay = isThai ? label : `${principle.name_en || principle.name}${thaiName ? " / " + thaiName : ""}`;
  return `- [${nameDisplay} (${layer})] ${instruction}`;
}

module.exports = { detectUserDhammaLevel, getExposureLevel, formatPrincipleForPrompt };
