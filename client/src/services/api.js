const API_BASE = import.meta.env.DEV ? "" : "https://bookmarksaver.onrender.com";

/**
 * Fetch current authenticated user
 */
export const fetchCurrentUser = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
};

/**
 * Get all bookmarks for the authenticated user
 */
export const getBookmarks = async () => {
  const res = await fetch(`${API_BASE}/api/bookmarks`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  const data = await res.json();
  return data.bookmarks;
};

/**
 * Add a new bookmark
 */
export const addBookmark = async (title, url) => {
  const res = await fetch(`${API_BASE}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, url }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add bookmark");
  return data.bookmark;
};

/**
 * Delete a bookmark by ID
 */
export const deleteBookmark = async (id) => {
  const res = await fetch(`${API_BASE}/api/bookmarks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete bookmark");
  return res.json();
};

/**
 * Google OAuth login URL
 */
export const GOOGLE_LOGIN_URL = `${API_BASE}/auth/google`;
