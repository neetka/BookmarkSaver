# Bookmark Saver — Full Stack Web Application

A minimal full-stack bookmark management app with **Google OAuth 2.0** authentication, built with **React + Vite** (frontend) and **Node.js + Express** (backend). Bookmarks are stored in-memory per authenticated user.

---

## 🛠️ Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Frontend       | React 18 + Vite                  |
| Backend        | Node.js + Express                |
| Authentication | Google OAuth 2.0 (Passport.js)   |
| Storage        | In-memory array (no database)    |
| Styling        | Vanilla CSS (custom design system) |

---

## 📁 Folder Structure

```
assignment/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── BookmarkForm.jsx
│   │   │   └── BookmarkList.jsx
│   │   ├── pages/           # Page-level components
│   │   │   ├── LoginPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                  # Express backend
│   ├── config/
│   │   └── passport.js      # Google OAuth strategy
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   └── auth.js          # Auth middleware
│   ├── routes/
│   │   ├── auth.js
│   │   └── bookmarks.js
│   ├── index.js             # Server entry point
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Google Cloud Console project with OAuth 2.0 credentials

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth Client ID**
5. Choose **Web application**
6. Add Authorized redirect URI: `http://localhost:5001/auth/google/callback`
7. Copy the **Client ID** and **Client Secret**

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and fill in your credentials:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SESSION_SECRET=any_random_string_here
JWT_SECRET=another_random_string_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies & Run

**Terminal 1 — Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm install
npm run dev
```

### 4. Open the App

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📝 API Endpoints

| Method   | Endpoint               | Auth     | Description              |
| -------- | ---------------------- | -------- | ------------------------ |
| `GET`    | `/auth/google`         | No       | Initiate Google login    |
| `GET`    | `/auth/google/callback`| No       | OAuth callback           |
| `GET`    | `/auth/me`             | No       | Get current user session |
| `POST`   | `/auth/logout`         | No       | Logout and clear session |
| `GET`    | `/api/bookmarks`       | Required | Get user's bookmarks     |
| `POST`   | `/api/bookmarks`       | Required | Add a new bookmark       |
| `DELETE` | `/api/bookmarks/:id`   | Required | Delete a bookmark        |

---

## ✨ Features

- **Google OAuth 2.0** — Secure authentication via Passport.js
- **User Profile** — Displays name, email, and profile picture
- **Bookmark CRUD** — Add, view, and delete bookmarks
- **URL Validation** — Validates URLs before saving
- **Duplicate Prevention** — Blocks duplicate URLs per user
- **In-Memory Storage** — No database setup required
- **Responsive Design** — Works on desktop and mobile
- **Session Persistence** — Stays logged in via Express sessions
- **Loading & Error States** — Proper UX feedback throughout

---

## 🚢 Deployment Notes

### Backend (Render / Railway)

1. Set the root directory to `server`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add all `.env` variables in the platform's environment settings
5. Update `CLIENT_URL` to your deployed frontend URL

### Frontend (Vercel / Netlify)

1. Set the root directory to `client`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Update the API base URL in `src/services/api.js` to point to your deployed backend

> **Note:** When deploying separately, update CORS origins and cookie settings for cross-domain auth.

---

## 📄 License

MIT — Built as a full-stack assignment project.
