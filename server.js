const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { analyzeScenario, analyzeFollowUp } = require("./agent");

const app = express();
const PORT = 3000;
const DEV_MODE = process.env.DEV_MODE === "true";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = new Map();
const SESSION_TTL = 60 * 60 * 1000;

const TIER_LIMITS = { free: 1, supporter: 10 };

function cleanSessions() {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.createdAt > SESSION_TTL) sessions.delete(id);
  }
}
setInterval(cleanSessions, 10 * 60 * 1000);

function loadPrinciples() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "data/principles.json"), "utf8")).principles;
}

function extractKeyTradeoff(data) {
  const rec = data.recommendation || "";
  const sentence = rec.split(/\.\s/)[0];
  return sentence.length > 120 ? sentence.slice(0, 117) + "..." : sentence;
}

// GET /health
app.get("/health", (req, res) => {
  res.json({ status: "ok", sessions: sessions.size });
});

// GET /config — exposes runtime flags to the frontend
app.get("/config", (req, res) => {
  res.json({ devMode: DEV_MODE });
});

// GET /site_content.json
app.get("/site_content.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/site_content.json"));
});

// GET /examples
app.get("/examples", (req, res) => {
  res.sendFile(path.join(__dirname, "data/example_dilemmas.json"));
});

// GET /about.json
app.get("/about.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/about.json"));
});

// GET /ideology.json
app.get("/ideology.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/ideology.json"));
});

// GET /project.json
app.get("/project.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data/project.json"));
});

// GET /principles
app.get("/principles", (req, res) => {
  const principles = loadPrinciples();
  res.json({ count: principles.length, principles });
});

// GET /principles/:hash
app.get("/principles/:hash", (req, res) => {
  const principles = loadPrinciples();
  const p = principles.find((p) => p.hash === req.params.hash);
  if (!p) return res.status(404).json({ error: "Principle not found" });
  res.json(p);
});

// GET /search?tag=
app.get("/search", (req, res) => {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: "Missing ?tag= parameter" });
  const principles = loadPrinciples();
  const results = principles
    .filter((p) => p.tags.includes(tag.toLowerCase()))
    .sort((a, b) => b.weight - a.weight);
  res.json({ tag, count: results.length, principles: results });
});

// GET /random
app.get("/random", (req, res) => {
  const principles = loadPrinciples();
  res.json(principles[Math.floor(Math.random() * principles.length)]);
});

// GET /tags
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

  try {
    const result = await analyzeScenario({ optionA, optionB, context, userTier, preferredPrincipleHash, requestedProvider });

    if (result.is_meaningful_dilemma !== false) {
      const sessionId = crypto.randomUUID();
      const limit = TIER_LIMITS[userTier] ?? TIER_LIMITS.free;
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
        followup_max: limit,
        createdAt: Date.now(),
      });
      result.sessionId = sessionId;
      result.followup_remaining = DEV_MODE ? null : limit;
      result.followup_max = DEV_MODE ? null : limit;
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
  const { sessionId, question, followupType = "quick" } = req.body;
  if (!sessionId || !question) {
    return res.status(400).json({ error: "sessionId and question are required" });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: "Session not found or expired" });
  }
  if (!DEV_MODE && session.followup_count >= session.followup_max) {
    return res.status(429).json({
      error: "quota_exceeded",
      tier: session.tier,
      followup_remaining: 0,
      followup_max: session.followup_max,
    });
  }

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
    });

    if (!DEV_MODE) session.followup_count++;

    // Update last recommendation if follow-up provides an update
    if (result.recommendation_update) session.last_recommendation = result.recommendation_update;

    result.followup_remaining = DEV_MODE ? null : session.followup_max - session.followup_count;
    result.followup_max = DEV_MODE ? null : session.followup_max;
    result.tier = session.tier;

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
