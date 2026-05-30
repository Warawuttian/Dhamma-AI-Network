Create concept_to_principles.json
Do not hardcode logic in selector.js
Rules:
- primary = strongest/default principles
- secondary = supportive principles
- conditional = context-triggered principles

{
  "epistemic": {
    "desc": "Knowledge, truth, belief, evidence, verification, uncertainty, reasoning.",
    "primary": ["kalama_sutta","yonisomanasikara","panna_3"],
    "secondary": ["noble_eightfold_path","appamada","vipassana"],
    "conditional": {
      "wrong_view_or_dogma": ["micchaditthi_3"],
      "deep_ignorance": ["avijja_8"]
    }
  },
  "ethical": {
    "desc": "Moral conflict, right/wrong, harm, fairness, integrity, ethical decision-making.",
    "primary": ["five_precepts","hiri_ottappa","ahimsa"],
    "secondary": ["cetana_3","noble_eightfold_path","ovadha_3"],
    "conditional": {
      "life_or_death_decision": ["agati_4","cetana_3"],
      "systemic_or_social_harm": ["lokadhamma_8"]
    }
  },
  "emotional": {
    "desc": "Emotions, feelings, defilements, anger, fear, grief, mental suffering.",
    "primary": ["sati","sampajanna_4","vedana_6"],
    "secondary": ["nivarana_5","khandha_5","paticcasamuppada"],
    "conditional": {
      "deep_craving_or_aversion": ["tanha_3","kilesa_10"],
      "identity_or_ego_pain": ["anatta","upadana_4"]
    }
  },
  "causal": {
    "desc": "Cause and effect, patterns, cycles, systems, consequences, long-term impact.",
    "primary": ["paticcasamuppada","idappaccayata","four_noble_truths"],
    "secondary": ["kamma","yonisomanasikara","noble_eightfold_path"],
    "conditional": {
      "repeating_pattern_or_habit": ["sankhara_3"],
      "root_ignorance": ["avijja_8"]
    }
  },
  "identity": {
    "desc": "Ego, self-image, pride, status, recognition, attachment to self.",
    "primary": ["anatta","khandha_5","upadana_4"],
    "secondary": ["three_characteristics","sankhara_3","micchaditthi_3"],
    "conditional": {
      "status_or_pride": ["agati_4"],
      "fear_of_loss_or_death": ["marananussati","lokadhamma_8"]
    }
  },
  "craving": {
    "desc": "Craving, desire, addiction, obsession, compulsion, attachment to wanting.",
    "primary": ["tanha_3","upadana_4","kilesa_10"],
    "secondary": ["paticcasamuppada","vedana_6","ayatana_6"],
    "conditional": {
      "sensory_obsession": ["mahabhutarupa_4","ayatana_6"],
      "deep_delusion": ["avijja_8","micchaditthi_3"]
    }
  },
  "social": {
    "desc": "Relationships, trust, loyalty, conflict, community, influence, social pressure.",
    "primary": ["kalyanamitta","sangahavatthu_4","brahmavihari_4"],
    "secondary": ["sappurisa_dhamma_7","five_precepts","hiri_ottappa"],
    "conditional": {
      "bias_or_favoritism": ["agati_4"],
      "toxic_or_manipulative_dynamic": ["kilesa_10","upadana_4"]
    }
  },
  "responsibility": {
    "desc": "Accountability, blame, duty, negligence, consequences, moral obligation.",
    "primary": ["kamma","hiri_ottappa","cetana_3"],
    "secondary": ["katannuta","noble_eightfold_path","appamada"],
    "conditional": {
      "indirect_or_systemic_harm": ["idappaccayata","paticcasamuppada"],
      "gratitude_or_debt": ["katannuta","ariya_dhana_7"]
    }
  },
  "meditative": {
    "desc": "Mental training, concentration, mindfulness, hindrances, inner clarity and disciplined awareness.",
    "primary": ["samadhi","sampajanna_4","nivarana_5"],
    "secondary": ["satipatthana_4","vipassana","appamada"],
    "conditional": {
      "deep_absorption_or_jhana": ["samapatti_8"],
      "fear_of_death_or_urgency": ["marananussati"]
    }
  },
  "refuge": {
    "desc": "Trust, refuge, moral grounding, commitment to guidance, reliance on Buddha, Dhamma, Sangha.",
    "primary": ["trisarana","kalyanamitta","ariya_dhana_7"],
    "secondary": ["hiri_ottappa","five_precepts"],
    "conditional": {
      "community_or_guidance": ["sappurisa_dhamma_7"],
      "faith_vs_blind_belief": ["kalama_sutta"]
    }
  },
  "awakening": {
    "desc": "Liberation, awakening, transcendence, nirvana, ultimate insight, freedom from greed, hatred, delusion.",
    "primary": ["bodhi","nibbana","lokuttara_dhamma_9"],
    "secondary": ["anatta","three_characteristics","vipassana"],
    "conditional": {
      "deathless_or_transcendent": ["amata"],
      "deep_ignorance_or_delusion": ["avijja_8"]
    }
  },
  "crisis": {
    "desc": "Immediate psychological crisis, suicidal ideation, self-harm, urgent mental health emergency.",
    "priority": "CRITICAL",
    "response_mode": "crisis_first",
    "primary": ["ahimsa","brahmavihari_4","hiri_ottappa"],
    "secondary": ["sati","karuna","metta"],
    "conditional": {
      "existential_despair": ["four_noble_truths","marananussati"],
      "self_hatred_or_worthlessness": ["anatta","lokadhamma_8"]
    }
  }
}