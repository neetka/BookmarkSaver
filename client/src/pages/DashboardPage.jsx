import { useState, useEffect, useCallback } from "react";
import { getBookmarks, addBookmark, deleteBookmark } from "../services/api";
import Navbar from "../components/Navbar";
import BookmarkForm from "../components/BookmarkForm";
import BookmarkList from "../components/BookmarkList";

export default function DashboardPage({ user, onLogout }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookmarks on mount
  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarks(data);
      setError("");
    } catch (err) {
      setError("Failed to load bookmarks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Add bookmark handler
  const handleAdd = async (title, url) => {
    const newBookmark = await addBookmark(title, url);
    setBookmarks((prev) => [...prev, newBookmark]);
  };

  // Delete bookmark handler
  const handleDelete = async (id) => {
    await deleteBookmark(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="dashboard">
        <div className="container">
          {/* Welcome header */}
          <div className="dashboard-header">
            <h1 className="welcome-text">
              Welcome back, {user.name?.split(" ")[0]} 👋
            </h1>
            <p className="welcome-sub">
              Manage your bookmarks below
            </p>
          </div>

          {/* Profile card */}
          <div className="card profile-card">
            <img
              src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=e94560&color=fff`}
              alt={user.name}
              className="profile-avatar"
              referrerPolicy="no-referrer"
            />
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          {/* Bookmark form */}
          <BookmarkForm onAdd={handleAdd} />

          {/* Global error */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Bookmark list */}
          <BookmarkList
            bookmarks={bookmarks}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </>
  );
}
