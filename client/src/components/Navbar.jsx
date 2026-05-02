import { logoutUser } from "../services/api";

export default function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">🔖</span>
          <span>
            Bookmark <span className="brand-accent">Saver</span>
          </span>
        </div>

        <div className="navbar-user">
          <span className="navbar-name">{user.name}</span>
          <img
            src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=e94560&color=fff`}
            alt={user.name}
            className="navbar-avatar"
            referrerPolicy="no-referrer"
          />
          <button
            className="btn btn-ghost"
            onClick={handleLogout}
            id="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
