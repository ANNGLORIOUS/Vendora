# Vendora Backend

Backend built with Django and Django REST Framework.

Quick start:

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export DJANGO_SECRET_KEY=replace-me
export POSTGRES_HOST=localhost
# configure other POSTGRES_* env vars
python manage.py migrate
python manage.py runserver
```
