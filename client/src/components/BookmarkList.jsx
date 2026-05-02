import { useState } from "react";

export default function BookmarkList({ bookmarks, loading, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Format date to readable string
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading bookmarks...</span>
      </div>
    );
  }

  return (
    <div className="bookmark-list-section">
      <div className="bookmark-list-header">
        <h2>📚 Your Bookmarks</h2>
        {bookmarks.length > 0 && (
          <span className="bookmark-count">{bookmarks.length}</span>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No bookmarks yet</h3>
          <p>Add your first bookmark using the form above!</p>
        </div>
      ) : (
        <div className="bookmark-list">
          {bookmarks.map((bookmark, index) => (
            <div
              key={bookmark.id}
              className="bookmark-item"
              style={{ animationDelay: `${index * 0.05}s` }}
              id={`bookmark-${bookmark.id}`}
            >
              <div className="bookmark-info">
                <div className="bookmark-title">{bookmark.title}</div>
                <div className="bookmark-url">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.url}
                  </a>
                </div>
                <div className="bookmark-date">
                  Added {formatDate(bookmark.createdAt)}
                </div>
              </div>
              <div className="bookmark-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(bookmark.id)}
                  disabled={deletingId === bookmark.id}
                  title="Delete bookmark"
                  id={`delete-${bookmark.id}`}
                >
                  {deletingId === bookmark.id ? "⏳" : "🗑️"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
