/**
 * Auth middleware - ensures user is authenticated before accessing protected routes.
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized. Please log in." });
};

module.exports = { isAuthenticated };
