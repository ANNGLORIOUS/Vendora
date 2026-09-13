# Skybee

This repository contains the full Skybee storefront project.

## Project structure

- `frontend/` – React + Vite storefront and admin UI
- `backend/` – Node.js + Express API with Prisma and PostgreSQL

## Quick start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

## Notes

- The frontend connects to the backend at `http://localhost:5000`.
- The backend uses PostgreSQL and Prisma for persistent storage.
- Sensitive files such as `.env`, local database files, generated Prisma output, and dependency folders are ignored by Git.
