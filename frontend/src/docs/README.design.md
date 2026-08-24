Vendora Design Tokens and Tailwind theme

This file lists the design tokens used across the frontend and explains the usage of CSS variables defined in `index.css`.

Tokens
- `--primary`: primary brand color (Vendora emerald)
- `--primary-dark`: darker primary for hover/active
- `--primary-light`: light tint for backgrounds
- `--bg`: page background
- `--panel`: surface color for cards
- `--border`: default border color
- `--text`: primary text color
- `--muted`: secondary text color
- `--shadow-soft`, `--shadow-card`: shadow presets

Usage
- Use `bg-[color:var(--primary)]` and `text-[color:var(--primary-dark)]` in components.

Do not move to production without reviewing colors and tokens.
