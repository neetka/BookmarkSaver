const { v4: uuidv4 } = require("uuid");

/**
 * In-memory bookmark store.
 * Structure: { [userId]: [ { id, title, url, createdAt } ] }
 */
const bookmarkStore = {};

// Helper to get user's bookmarks array (creates if needed)
const getUserBookmarks = (userId) => {
  if (!bookmarkStore[userId]) {
    bookmarkStore[userId] = [];
  }
  return bookmarkStore[userId];
};

/**
 * GET /api/bookmarks - Fetch all bookmarks for authenticated user
 */
const getBookmarks = (req, res) => {
  const bookmarks = getUserBookmarks(req.user.id);
  res.json({ bookmarks });
};

/**
 * POST /api/bookmarks - Add a new bookmark
 */
const addBookmark = (req, res) => {
  const { title, url } = req.body;

  // Validation
  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required." });
  }

  if (title.trim().length === 0 || url.trim().length === 0) {
    return res.status(400).json({ error: "Title and URL cannot be empty." });
  }

  // URL validation
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Please provide a valid URL." });
  }

  const bookmarks = getUserBookmarks(req.user.id);

  // Prevent duplicate URLs for the same user
  const duplicate = bookmarks.find(
    (b) => b.url.toLowerCase() === url.trim().toLowerCase()
  );
  if (duplicate) {
    return res.status(409).json({ error: "Bookmark with this URL already exists." });
  }

  const newBookmark = {
    id: uuidv4(),
    title: title.trim(),
    url: url.trim(),
    createdAt: new Date().toISOString(),
  };

  bookmarks.push(newBookmark);
  res.status(201).json({ bookmark: newBookmark });
};

/**
 * DELETE /api/bookmarks/:id - Remove a bookmark by ID
 */
const deleteBookmark = (req, res) => {
  const { id } = req.params;
  const bookmarks = getUserBookmarks(req.user.id);
  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Bookmark not found." });
  }

  bookmarks.splice(index, 1);
  res.json({ message: "Bookmark deleted successfully." });
};

module.exports = { getBookmarks, addBookmark, deleteBookmark };
