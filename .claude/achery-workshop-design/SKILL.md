---
name: achery-workshop-design
description: Use this skill to generate well-branded interfaces and assets for Achery Workshop, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Achery Workshop — Design Skill

Achery Workshop is a thematic toolbox for designing across web, desktop, mobile, and indie-game surfaces. It is **autumn-alchemical, workshop-artisanal, slightly bookish, and dry-witted**. Compact density, hard borders, paper textures, slab serif + grotesk, botanical/alchemical marginalia.

## Quickstart

1. Read `README.md` for the full system: voice, visual foundations, iconography, file index.
2. Read `colors_and_type.css` for tokens. **Always import this file** at the top of any HTML you produce.
3. Browse `preview/` for self-contained specimen cards (colors, type, spacing, components, brand).
4. Browse `ui_kits/<product>/` for reference implementations:
   - `web-dashboard/` — info-dense workbench (sidebar / list / detail / composer)
   - `mobile-ios/` — field notebook (entries / today / almanac / settings)
   - `game-ui/` — indie game HUD / dialog / inventory / menu
   - `docs/` — documentation site (sidebar nav, prose, footnotes, code blocks)
5. Pull what you need into the artifact's project folder. **Copy assets, don't reference them across project boundaries.**

## When making a visual artifact (slides, mocks, prototypes)

- Copy `colors_and_type.css` and link it with `<link rel="stylesheet" href="colors_and_type.css">`.
- Copy `assets/mark.svg`, `assets/wordmark.svg`, and any `assets/glyphs/*.svg` or `assets/patterns/*.svg` you'll reference.
- Use existing UI kit components as reference — read the JSX, don't reinvent. Cosmetic recreations are fine; you do not need to match implementation.
- Default to compact density, hard 1px ink borders, near-zero radii, slab display + grotesk body.

## When working on production code

- Adopt `colors_and_type.css` as foundation tokens. The `--accent` token is **the** override point per project; everything else stays.
- Follow the component patterns from `ui_kits/web-dashboard/components.jsx` — they reflect the canonical visual language.
- Voice guide is in `README.md` under **Content Fundamentals**. Footnotes are welcome. Exclamation marks aren't.

## The non-negotiables

- **Hard borders.** 1px ink lines, no rounding above 2px (except pills/dots).
- **Compact.** 4px base spacing. 14px base type. Don't pad like a marketing site.
- **Slab + grotesk.** `Roboto Slab` for display, `Space Grotesk` for body, `JetBrains Mono` for code.
- **Autumn palette.** Terracotta, moss, plum, ochre, rust — never blue-first.
- **Materials accents.** Leather, copper, silver, wood, gold — use sparingly for premium / object surfaces.
- **Marginalia.** Botanical / alchemical SVG glyphs in card corners, page edges, section dividers. Subtle (~30–55% opacity).
- **Dry-witted copy.** Bookish, slightly amused, never marketing-y. See `preview/brand-voice.html`.

## If user invokes this skill without guidance

Ask what they want to build or design. Ask 3–5 focused questions (surface, density, light/dark, accent choice, copy tone). Then act as an expert designer and output either HTML artifacts or production-ready code, depending on need.
