const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} = require("../controllers/bookmarkController");

// All bookmark routes require authentication
router.use(isAuthenticated);

router.get("/", getBookmarks);
router.post("/", addBookmark);
router.delete("/:id", deleteBookmark);

module.exports = router;
