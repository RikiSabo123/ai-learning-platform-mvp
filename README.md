# AI Learning Platform

A full-stack learning platform built with a modern React frontend and a Node.js backend.

## 🚀 Overview
This project provides an AI-driven learning experience with:
- React + Vite frontend
- Express.js backend
- PostgreSQL database using Sequelize ORM
- OpenAI/AI streaming integration
- User authentication and role-based access
- Admin dashboard and user history tracking
- Docker Compose setup for easy local development

## 🌐 Key Features
- Register and login users by phone number
- Persist user session using JWT authentication
- Create AI prompts and stream AI responses in real time
- Save and display user learning history
- Admin-only routes for managing users and prompts
- Configurable admin credentials via environment variables

## 🧱 Tech Stack
- Frontend: React, Vite, Material UI, React Router, Axios
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Auth: JWT, cookies, role-based access control
- DevOps: Docker Compose

## ▶️ Run Locally
From the project root:

```bash
docker-compose up --build
```

This starts:
- `frontend` on `http://localhost:5173`
- `backend` on `http://localhost:3000`
- PostgreSQL database on `localhost:5432`

## 🔧 Environment Variables
Copy the backend env example and update with real values:

```bash
cd backend
cp .env.example .env
```

Required variables:
- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `OPENAI_API_KEY`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NODE_ENV`
- `ADMIN_PHONE`
- `ADMIN_NAME`
- `ADMIN_ROLE`

## 🧪 Notes
- The backend automatically seeds admin user data on startup.
- The frontend communicates with the backend using Axios and includes credentials for auth.
- User history is stored and retrieved from the database.

## ✅ Good to Know
- Login and admin access are handled by user role.
- The project supports both cookies and bearer auth for protected routes.
- Docker Compose makes the full stack easy to launch and test.

## 📁 Project Structure
- `backend/` - Express server, models, controllers, routes, services
- `frontend/` - React app, pages, UI, API services
- `docker-compose.yml` - orchestrates backend, frontend, and PostgreSQL

---

If you want, I can also improve the frontend README and add a short admin setup section.