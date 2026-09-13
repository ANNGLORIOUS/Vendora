# Fayorganiks Frontend

This folder contains the React + Vite storefront for Fayorganiks.

## What the frontend does

- shows the public home, products, about, and contact pages
- renders products from the backend API
- provides the admin login and dashboard experience
- allows admins to manage products, categories, discounts, and settings

## Setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Main folders

- `src/Pages/` – public pages and admin pages
- `src/Components/` – shared UI components like the navbar and footer
- `src/context/` – authentication context
- `public/` – static assets such as images

## Important notes

- The frontend expects the backend to run on `http://localhost:5000`.
- Product images and product data are loaded from the backend API.
- Admin changes such as new products, discounts, and images will appear in the frontend once the backend is running.

## Ignore rules

The frontend already ignores build output, local logs, and dependency folders so they do not end up in version control.
