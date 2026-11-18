# NoteNest

A full-stack note-taking app. Users sign up, log in, and manage their own private notes. Notes are strictly scoped to their owner: no user can read, edit, or delete another user's notes.

**Live app:** https://note-taking-app-task.vercel.app · **API:** https://note-taking-app-task-production.up.railway.app

## Features

- Register / login / logout with bcrypt-hashed passwords
- JWT stored in an `httpOnly` cookie (not readable by JavaScript)
- Protected API routes and protected React routes
- Create, view, edit, delete notes
- Per-user data isolation enforced in every database query
- Loading states, validation, and clear error messages
- Responsive layout with automatic dark mode

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs, cookie-parser |

## Project structure

```
server/   config/ models/ middleware/ controllers/ routes/ server.js
client/   src/ (api.js, context/, components/, pages/)
```

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | – | Create account, set cookie |
| POST | `/api/auth/login` | – | Log in, set cookie |
| POST | `/api/auth/logout` | – | Clear cookie |
| GET | `/api/auth/me` | ✔ | Current user |
| GET | `/api/notes` | ✔ | List my notes |
| POST | `/api/notes` | ✔ | Create note |
| PUT | `/api/notes/:id` | ✔ | Update my note |
| DELETE | `/api/notes/:id` | ✔ | Delete my note |

## Installation

Requirements: Node.js 18+, a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (allow your IP under Network Access).

```bash
git clone <your-repo-url>
cd Note-Taking-App-Task
```

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env` (see `.env.example`):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/notenest
JWT_SECRET=<long random string>
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Generate a secret with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

```bash
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
```

Create `client/.env.local` (see `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open http://localhost:5173.

## Deployment

- **Backend (Railway, also works on Render):** root `server`, start command `npm start`. Set `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, and `CLIENT_URL` (your frontend URL, no trailing slash).
- **Frontend (Vercel/Netlify):** root `client`, build `npm run build`, output `dist`. Set `VITE_API_URL` to `https://<your-api>/api`. Add an SPA rewrite of all paths to `/index.html`.
- In production the cookie is sent with `Secure` and `SameSite=None`, which allows a frontend and API on different domains over HTTPS.

## Security notes

- Passwords hashed with bcrypt, never returned by the API
- Notes always queried with the logged-in user's id; update only accepts `title` and `content`
- Secrets live in `.env`, which is git-ignored
