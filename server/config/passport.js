const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === "production"
        ? "https://bookmarksaver.onrender.com/auth/google/callback"
        : "http://localhost:5001/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Extract essential user info from Google profile
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        picture: profile.photos?.[0]?.value || "",
      };
      return done(null, user);
    }
  )
);
