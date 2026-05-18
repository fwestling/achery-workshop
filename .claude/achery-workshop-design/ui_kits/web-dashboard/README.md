# Workbench — web app dashboard

A hi-fi recreation of the design system applied to a workbench / project organizer dashboard. This is the "canonical" demonstration of Achery Workshop on the web.

## What's here

- `index.html` — interactive single-page demo. Click rows, open the composer, toggle dark mode, switch the accent color.
- `components.jsx` — primitives: `AppBar`, `Sidebar`, `RecipeList`, `RecipeDetail`, `Composer`, `Marginalia`, `Eyebrow`, `Button`, `Field`.
- `data.js` — fake recipe data.

## Conventions demonstrated

- Top app bar with wordmark · search · user.
- Left sidebar with section eyebrows + glyph bullets.
- Compact data table with tabular numerals + status dot column.
- Stamp-shadow card on selected detail.
- Botanical marginalia in bottom-right of main column.
- Composer modal: full ink-scrim backdrop with `backdrop-filter: blur(2px)`.
- Dark mode parity (toggle in app bar).
- Accent override (terracotta / olive / plum / ochre / moss / rust) via tweak.
