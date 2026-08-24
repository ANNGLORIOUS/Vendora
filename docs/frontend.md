# Vendora — Frontend Technical Specification

This document describes the frontend architecture and structure for Vendora.

Stack
- React + TypeScript + Vite
- Tailwind CSS
- TanStack Query (React Query)
- Axios
- React Hook Form + Zod
- React Router
- Lucide React (icons)

Folder structure (recommended)

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── schemas/
│   ├── routes/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

Responsibilities
- Displaying Vendora UI
- Client-side validation
- Authentication state
- Calling Django REST API
- Displaying loading/error/success states
- Protecting routes and responsive layouts

Design System
- Establish typography, spacing, shadows, and a small set of UI primitives
- For Vendora prototype work, use a clean business-first system based on emerald accents, light neutral backgrounds, and subtle borders rather than high-gloss startup gradients

Prototype Design Direction
- Brand accent: #059669
- Background: #F8FAFC
- Surface: #FFFFFF
- Text primary: #0F172A
- Text secondary: #475569
- Muted: #64748B
- Border: #E2E8F0
- Success: #16A34A
- Warning: #D97706
- Danger: #DC2626
- Info: #2563EB
- Typography: Inter or a modern sans-serif stack
- Radius: rounded-lg / rounded-xl / rounded-2xl
- Shadows: minimal and subtle, mostly border-led cards
- Goal: trustworthy, practical, modern, and warm for Kenyan small-business users

UI principles for this app
- Keep financial values prominent and easy to scan
- Use green as an accent, not as the entire interface
- Prioritize clear status labels such as Paid, Pending, and Overdue alongside colored badges
- Keep navigation simple and business-focused: Dashboard, Customers, Orders, Payments, Products, Receivables, Reports, Settings
- Avoid over-styled gradients, excessive shadows, or overly playful visuals
- Design for mobile and desktop, but keep the dashboard layout structured and consistent

Core Components and Layouts
- `components/ui/*` : Button, Input, Card, Spinner, Table, Modal, Toast
- `components/layout/*` : Sidebar, Navbar, UserMenu, MobileNavigation
- `layouts/DashboardLayout.tsx` for authenticated pages

Routing
- Public routes: `/login`, `/forgot-password`, `/reset-password`
- Protected routes: `/dashboard`, `/customers`, `/orders`, `/payments`, `/products`, `/receivables`, `/reports`, `/settings`

API
- Use `services/api.ts` (Axios) and `services/queryClient.ts` (TanStack Query)

Forms
- Use React Hook Form + Zod for validation and schema

Notes
- Frontend must treat backend as source of truth for balances, totals, and business logic.
# Frontend

Frontend architecture: React + TypeScript + Vite + Tailwind.
