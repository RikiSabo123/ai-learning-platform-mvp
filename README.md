# AI Learning Platform

A modern full-stack AI-powered learning platform built with React, Node.js, Express, PostgreSQL, and OpenAI.

---

## Overview

This application provides an AI-assisted learning experience where users can interact with an AI assistant, manage their learning history, and access personalized content.

The project follows a full-stack architecture with authentication, REST APIs, database persistence, and Docker support.

---

## Features

- AI-powered learning assistant
- Real-time AI response streaming
- JWT authentication
- HTTP-only cookie authentication
- Role-based authorization (Admin/User)
- User learning history
- Admin dashboard
- RESTful API
- Docker Compose support

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Material UI
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM

### Database
- PostgreSQL

### Authentication
- JWT
- HTTP-only Cookies

### AI
- OpenAI API

### DevOps
- Docker
- Docker Compose

---

## Architecture

```
React
      │
      ▼
REST API (Express)
      │
      ▼
Business Logic
      │
      ▼
PostgreSQL
```

---

## Project Structure

```
backend/
frontend/
docker-compose.yml
README.md
```

---

## Installation

```bash
git clone <repository-url>

docker-compose up --build
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Required variables:

```
PORT
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD

OPENAI_API_KEY

JWT_SECRET
JWT_EXPIRES_IN

ADMIN_PHONE
ADMIN_NAME
ADMIN_ROLE
```

---

## API Features

Authentication

- Register
- Login
- Logout

AI

- Stream AI responses
- Save learning history

Admin

- Manage users
- Manage prompts

---

## Future Improvements

- Chat history search
- Multiple AI providers
- Unit testing
- CI/CD

---

## License

MIT
