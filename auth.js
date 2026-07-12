const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const ADMIN_EMAILS         = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean);

const AUTH_ENABLED = !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);

if (AUTH_ENABLED) {
  passport.use(new GoogleStrategy(
    {
      clientID:     GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
    },
    (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value || "";
      const user = {
        id:      profile.id,
        email,
        name:    profile.displayName,
        picture: profile.photos?.[0]?.value || "",
        role:    ADMIN_EMAILS.includes(email) ? "admin" : "user",
      };
      done(null, user);
    }
  ));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

module.exports = { passport, AUTH_ENABLED };
