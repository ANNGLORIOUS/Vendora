# Skybee Backend

This folder contains the Node.js + Express backend for the Skybee storefront and admin dashboard.

## What the backend does

- serves the public storefront API
- authenticates the admin dashboard
- manages products, categories, discounts, settings, and orders
- stores data in PostgreSQL through Prisma

## Setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the database container (if needed):
   ```bash
   docker run --name skybee-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=skybee -p 5434:5432 -d postgres:16
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## API endpoints

- `GET /api/health` – health check
- `POST /api/auth/login` – admin login
- `GET /api/products` – list products
- `POST /api/products` – create a product
- `PUT /api/products/:id` – update a product
- `DELETE /api/products/:id` – delete a product
- `GET /api/categories` – list categories
- `POST /api/categories` – create a category
- `PUT /api/categories/:id` – update a category
- `DELETE /api/categories/:id` – delete a category
- `GET /api/discounts` – list discounts
- `POST /api/discounts` – create a discount
- `PUT /api/discounts/:id` – update a discount
- `DELETE /api/discounts/:id` – delete a discount
- `GET /api/orders` – list orders
- `GET /api/customers` – list customers
- `GET /api/settings` – get store settings
- `PUT /api/settings` – update store settings

## Default admin login

- Email: `admin@skybee.co`
- Password: `admin123`

## Important files

- `server.js` – API entry point
- `prisma/schema.prisma` – database schema
- `prisma/migrations/` – database migration history
- `.env` – local environment variables

## Ignore rules

The following files are ignored by Git:

- `node_modules/`
- `.env`
- generated Prisma client output
- npm debug logs
