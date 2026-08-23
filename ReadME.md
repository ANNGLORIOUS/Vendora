
# Vendora

Vendora is a business management platform for meat suppliers and small businesses.

This repository contains initial scaffolding for frontend (React + Vite) and backend (Django + DRF).

Quick start:

Frontend:

```
cd frontend
npm install
npm run dev
```

Backend:

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export DJANGO_SECRET_KEY=replace-me
python manage.py migrate
python manage.py runserver
```
