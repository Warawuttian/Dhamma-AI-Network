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

function formatPrincipleForPrompt(principle, exposureLevel) {
  const instruction = principle.behavior_instruction || principle.prompt_injection || "";

  if (exposureLevel === "plain") {
    return `- ${instruction}`;
  }
  if (exposureLevel === "light_dhamma") {
    return `- [${principle.name}] ${instruction}`;
  }
  // full_dhamma
  const thai = principle.name_th || principle.thai || "";
  const layer = principle.layer || "contextual";
  return `- [${principle.name}${thai ? " / " + thai : ""} (${layer})] ${instruction}`;
}

module.exports = { detectUserDhammaLevel, getExposureLevel, formatPrincipleForPrompt };
