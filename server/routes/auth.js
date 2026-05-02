const router = require("express").Router();
const passport = require("passport");
const { getMe, logout } = require("../controllers/authController");

// Initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=auth_failed`,
  }),
  (req, res) => {
    // Successful login — redirect to client dashboard
    res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
  }
);

// Get current user info
router.get("/me", getMe);

// Logout
router.post("/logout", logout);

module.exports = router;
