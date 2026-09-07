require("dotenv").config();
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { analyzeScenario, analyzeFollowUp } = require("./agent");
const { CONFIG } = require("./config");
const { passport, AUTH_ENABLED } = require("./auth");
const { isConfigured: dbConfigured, listUsers } = require("./admin");

const modelRegistry = JSON.parse(fs.readFileSync(path.join(__dirname, "data/model_registry.json"), "utf8"));

const app = express();
app.set("trust proxy", true);
const PORT = 3000;
const DEV_MODE = process.env.DEV_MODE === "true";

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dhamma-ai-dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

// ── Abuse protection ──────────────────────────────────────────────────────────

const messages = JSON.parse(fs.readFileSync(path.join(__dirname, "data/messages.json"), "utf8"));

// counters[ip] = { minute: { count, resetAt }, day: { count, resetAt }, lastAt }
const counters = new Map();

function getCounters(ip) {
  if (!counters.has(ip)) {
    counters.set(ip, { minute: { count: 0, resetAt: 0 }, day: { count: 0, resetAt: 0 }, lastAt: 0 });
  }
  return counters.get(ip);
}

function cleanCounters() {
  const now = Date.now();
  for (const [ip, c] of counters) {
    if (now > c.day.resetAt + 24 * 60 * 60 * 1000) counters.delete(ip);
  }
}
setInterval(cleanCounters, 60 * 60 * 1000);

function getLimits(role) {
  if (role === "admin") return { perMinute: CONFIG.adminPerMinute, perDay: CONFIG.adminPerDay };
  if (role === "user")  return { perMinute: CONFIG.userPerMinute,  perDay: CONFIG.userPerDay  };
  return { perMinute: CONFIG.anonPerMinute, perDay: CONFIG.anonPerDay };
}

function checkRateLimit(req) {
  if (DEV_MODE) return null;

  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const role = req.user?.role || "anon";
  const lang = req.body?.lang || "en";
  const { perMinute, perDay } = getLimits(role);
  const now = Date.now();
  const c = getCounters(ip);

  // cooldown
  if (now - c.lastAt < CONFIG.cooldownSeconds * 1000) {
    return { code: "rate_limit_minute", message: messages[lang]?.rate_limit_minute || messages.en.rate_limit_minute };
  }

  // reset minute window
  if (now > c.minute.resetAt) {
    c.minute.count = 0;
    c.minute.resetAt = now + 60 * 1000;
  }
  // reset day window
  if (now > c.day.resetAt) {
    c.day.count = 0;
    c.day.resetAt = now + 24 * 60 * 60 * 1000;
  }

  if (c.minute.count >= perMinute) {
    return { code: "rate_limit_minute", message: messages[lang]?.rate_limit_minute || messages.en.rate_limit_minute };
  }
  if (perDay >= 0 && c.day.count >= perDay) {
    const code = role === "anon" ? "guest_daily_limit" : "user_daily_limit";
    return { code, message: messages[lang]?.[code] || messages.en[code] };
  }

  c.minute.count++;
  c.day.count++;
  c.lastAt = now;
  return null;
}

// ── Session store ─────────────────────────────────────────────────────────────

const sessions = new Map();
const SESSION_TTL = 60 * 60 * 1000;

function cleanSessions() {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.createdAt > SESSION_TTL) sessions.delete(id);
  }
}
setInterval(cleanSessions, 10 * 60 * 1000);

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadPrinciples() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/principles.json"), "utf8")).principles;
}

function extractKeyTradeoff(data) {
  const rec = data.recommendation || "";
  const sentence = rec.split(/\.\s/)[0];
  return sentence.length > 120 ? sentence.slice(0, 117) + "..." : sentence;
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/health", (req, res) => {
  res.json({ status: "ok", sessions: sessions.size });
});

app.get("/config", (req, res) => {
  res.json({ devMode: DEV_MODE, authEnabled: AUTH_ENABLED });
});

// ── Auth routes ───────────────────────────────────────────────────────────────

app.get("/auth/me", (req, res) => {
  if (req.user) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

if (AUTH_ENABLED) {
  app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/?auth=failed" }),
    (req, res) => res.redirect("/")
  );
}

app.get("/auth/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

// GET /admin/users — authenticated admin only
app.get("/admin/users", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin access required" });
  if (!dbConfigured()) return res.status(503).json({ error: "User database not configured" });
  try {
    const users = await listUsers();
    res.json({ count: users.length, users });
  } catch (err) {
    console.error("Admin users error:", err.message);
    res.status(500).json({ error: "Failed to load users" });
  }
});

// GET /models — returns available models for the current user role
app.get("/models", (req, res) => {
  const role = req.user?.role || "anon";
  const models = Object.entries(modelRegistry)
    .filter(([, cfg]) => {
      if (cfg.dev_only && !DEV_MODE) return false;
      if (cfg.requires_login && role === "anon" && !DEV_MODE) return false;
      return true;
    })
    .map(([key, cfg]) => ({ key, display_name: cfg.display_name, organization: cfg.organization, requires_login: cfg.requires_login, dev_only: cfg.dev_only }));
  res.json(models);
});

app.get("/site_content.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/site_content.json"));
});

app.get("/examples", (req, res) => {
  res.sendFile(path.join(__dirname, "data/example_dilemmas.json"));
});

app.get("/about.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/about.json"));
});

app.get("/ideology.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/ideology.json"));
});

app.get("/project.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/project.json"));
});

app.get("/support_us.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/support_us.json"));
});

app.get("/principles", (req, res) => {
  const principles = loadPrinciples();
  res.json({ count: principles.length, principles });
});

app.get("/principles/:hash", (req, res) => {
  const principles = loadPrinciples();
  const p = principles.find((p) => p.hash === req.params.hash);
  if (!p) return res.status(404).json({ error: "Principle not found" });
  res.json(p);
});

app.get("/search", (req, res) => {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: "Missing ?tag= parameter" });
  const principles = loadPrinciples();
  const results = principles
    .filter((p) => p.tags.includes(tag.toLowerCase()))
    .sort((a, b) => b.weight - a.weight);
  res.json({ tag, count: results.length, principles: results });
});

app.get("/random", (req, res) => {
  const principles = loadPrinciples();
  res.json(principles[Math.floor(Math.random() * principles.length)]);
});

app.get("/tags", (req, res) => {
  const principles = loadPrinciples();
  const tags = [...new Set(principles.flatMap((p) => p.tags))].sort();
  res.json({ count: tags.length, tags });
});

// POST /analyze
app.post("/analyze", async (req, res) => {
  const { optionA, optionB, context, userTier = "free", preferredPrincipleHash, requestedProvider } = req.body;
  if (!optionA || !optionB) {
    return res.status(400).json({ error: "Both optionA and optionB are required" });
  }

  const limited = checkRateLimit(req);
  if (limited) return res.status(429).json({ error: limited.code, message: limited.message });

  try {
    const result = await analyzeScenario({ optionA, optionB, context, userTier, preferredPrincipleHash, requestedProvider });

    if (result.is_meaningful_dilemma !== false) {
      const sessionId = crypto.randomUUID();
      sessions.set(sessionId, {
        optionA,
        optionB,
        context: context || "",
        selected_principles: result.selected_principles || [],
        concepts: result.concepts || [],
        last_recommendation: result.recommendation || "",
        key_tradeoff: extractKeyTradeoff(result),
        tier: userTier,
        followup_count: 0,
        createdAt: Date.now(),
      });
      result.sessionId = sessionId;
      result.key_tradeoff = extractKeyTradeoff(result);
    }

    res.json(result);
  } catch (err) {
    console.error("Agent error:", err.message);
    res.status(500).json({ error: "Analysis failed", detail: err.message });
  }
});

// POST /follow-up
app.post("/follow-up", async (req, res) => {
  const { sessionId, question, followupType = "quick", requestedProvider } = req.body;
  if (!sessionId || !question) {
    return res.status(400).json({ error: "sessionId and question are required" });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: "Session not found or expired" });
  }

  const limited = checkRateLimit(req);
  if (limited) return res.status(429).json({ error: limited.code, message: limited.message });

  try {
    const result = await analyzeFollowUp({
      optionA: session.optionA,
      optionB: session.optionB,
      context: session.context,
      previousPrinciples: session.selected_principles,
      previousConcepts: session.concepts,
      lastRecommendation: session.last_recommendation,
      followUpQuestion: question,
      tier: session.tier,
      requestedProvider,
    });

    if (result.recommendation_update) session.last_recommendation = result.recommendation_update;

    res.json(result);
  } catch (err) {
    console.error("Follow-up error:", err.message);
    res.status(500).json({ error: "Follow-up failed", detail: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Dhamma AI Network running at http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log("  GET  /health  /principles  /principles/:hash  /search?tag=  /random  /tags");
  console.log("  POST /analyze { optionA, optionB, context, userTier }");
  console.log("  POST /follow-up { sessionId, question, followupType }");
});
