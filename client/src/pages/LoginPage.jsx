import { GOOGLE_LOGIN_URL } from "../services/api";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="login-icon">🔖</div>
        <h1>
          <span className="accent">Bookmark</span> Saver
        </h1>
        <p className="login-subtitle">
          Save, organize, and access your favorite links — all in one place.
        </p>

        <a href={GOOGLE_LOGIN_URL} className="google-btn" id="google-login-btn">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Continue with Google
        </a>

        <div className="login-features">
          <div className="login-feature">
            <span className="feature-icon">🔒</span>
            <span>Secure Google authentication</span>
          </div>
          <div className="login-feature">
            <span className="feature-icon">⚡</span>
            <span>Save bookmarks instantly</span>
          </div>
          <div className="login-feature">
            <span className="feature-icon">🌐</span>
            <span>Access from any device</span>
          </div>
        </div>
      </div>
    </div>
  );
}
