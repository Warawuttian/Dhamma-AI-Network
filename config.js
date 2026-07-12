const CONFIG = {
  anonPerMinute:  Number(process.env.ANON_ANALYSIS_PER_MINUTE  || 3),
  anonPerDay:     Number(process.env.ANON_ANALYSIS_PER_DAY     || 10),
  userPerMinute:  Number(process.env.USER_ANALYSIS_PER_MINUTE  || 10),
  userPerDay:     Number(process.env.USER_ANALYSIS_PER_DAY     || 80),
  adminPerMinute: Number(process.env.ADMIN_ANALYSIS_PER_MINUTE || 60),
  adminPerDay:    Number(process.env.ADMIN_ANALYSIS_PER_DAY    || -1),
  cooldownSeconds:Number(process.env.ANALYSIS_COOLDOWN_SECONDS || 3),
};

module.exports = { CONFIG };
