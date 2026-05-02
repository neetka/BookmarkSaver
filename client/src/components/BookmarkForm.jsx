import { useState } from "react";

export default function BookmarkForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!title.trim() || !url.trim()) {
      setError("Both title and URL are required.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    try {
      setLoading(true);
      await onAdd(title.trim(), url.trim());
      setTitle("");
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bookmark-form-card">
      <h2>➕ Add Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            className="input"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="bookmark-title-input"
            maxLength={100}
          />
          <input
            type="text"
            className="input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="bookmark-url-input"
          />
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: 12 }}>
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            id="add-bookmark-btn"
          >
            {loading ? "Adding..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
}
