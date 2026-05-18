# Achery Workshop — Design System

> A thematic toolbox for a hobbyist's many products. Same skeleton, different skins. Autumn-leaning, alchemy-tinged, hand-set rather than auto-generated.

Achery Workshop is not a product. It is a **house style** worn by many products — a web app dashboard, a mobile app, an indie game, a documentation site, whatever comes next. Projects swap their primary accent and logo; everything else (type, spacing, borders, ornaments, voice) stays.

This system was created from scratch — there is no existing codebase or Figma to inherit from. The directional choices below were captured from the brief and a short intake form (palette: option 2 — dark with cream/olive/terracotta/plum; type: slab + grotesk; ornament: botanical/alchemical marginalia; vibe: mystical/occult ∩ workshop/artisanal ∩ editorial/zine ∩ organic/botanical; density: compact; corners: square).

---

## Index

| File / folder | What's in it |
| --- | --- |
| `colors_and_type.css` | All design tokens as CSS custom properties + semantic element styles. Light + dark in one file. Import this in every project. |
| `assets/wordmark.svg` | The full Achery Workshop wordmark — crest + "ACHERY / WORKSHOP". |
| `assets/mark.svg` | The crest alone — hex with an arrow piercing a circle. Use as favicon, app icon, profile pic. |
| `assets/glyphs/` | 30 small alchemical / botanical / geometric glyphs used as bullets, dividers, system icons. `currentColor` strokes. |
| `assets/patterns/` | Tileable SVG patterns (ticks, dots, diamonds, wave, crosshatch, double-rule, paper noise). For borders, dividers, hero backgrounds. |
| `fonts/` | _Empty._ Webfonts pulled from Google Fonts CDN — see _Substitutions_ below. |
| `preview/` | Cards that populate the Design System tab. Treat as a visual table of contents. |
| `ui_kits/web-dashboard/` | Hi-fi recreation of a dashboard surface. JSX components + interactive `index.html`. |
| `ui_kits/mobile-ios/` | Hi-fi iOS app surface. |
| `ui_kits/game-ui/` | Indie game HUD, dialog, menu screens. |
| `ui_kits/docs/` | Documentation site. |
| `SKILL.md` | Agent-Skills-compatible entry point. Drop this folder into Claude Code as a skill. |

---

## Content Fundamentals

The voice is **slightly bookish, dry, and occasionally amused.** Like a friendly librarian who knows the shelves and isn't above a small joke. Informative, never effusive, allergic to marketing fluff — but willing to land a wry line when the moment offers one.

**Casing.** Sentence case for everything: headings, buttons, menu items. ALL CAPS is reserved for *labels* (small caps, wide tracking, 11–12px) — section eyebrows, table headers, status pills. Title Case is rare and only for proper nouns.

**Person.** Mostly second-person ("you") for direct instruction, first-person plural ("we") only when the workshop itself is doing something on the user's behalf ("we'll keep this draft"). Avoid the imperial "we" of marketing copy.

**Length.** Short. One idea per line, one idea per button. Long-form copy is allowed in docs but uses paragraph breaks generously.

**Emoji.** No. Not in UI chrome, not in headings, not in microcopy. Substitute a glyph from `assets/glyphs/` if you need a visual anchor — a leaf, an asterism, a hex.

**Numerals.** Tabular figures everywhere (`font-variant-numeric: tabular-nums`). Dates: `12 NOV 2026` or `2026·11·12` in compact UI. Numbers in body copy spelled out below ten ("three errors", "thirty-four nodes").

**Examples**

| Don't say | Say |
| --- | --- |
| 🚀 Welcome to your dashboard! | A workbench. Pin what you'll actually use. |
| Loading… please wait | Steeping. |
| Oops! Something went wrong. | Something gave way. Probably the binding — check the log. |
| 0 results found | Nothing matched. Try fewer adjectives. |
| Save successful ✓ | Saved. The page knows. |
| You have new notifications! | Three new things. Probably non-urgent. |
| Click here to learn more about our features. | There's a footnote, naturally. |
| 100% Complete | Done. (or just remove the progress bar) |
| 🔥 Trending Now | Currently warm |

**House rules.** Footnotes are welcome. Exclamation marks aren't. We never say *oops*. We do allow *a small mercy*. We avoid every word that means *delight*. We use *naturally* and *frankly* sparingly, but we use them.

**Vibe.** Reference desk. Apothecary label. Field journal. The product is a tool you reach for, with a quiet sense of humour about itself.

---

## Visual Foundations

### Color

The palette is autumn — olive, terracotta, plum, ochre, rust, moss — over warm cream (light) or deep ink (dark). **Blue is deliberately absent.** Tokens live in `colors_and_type.css`; semantic vars (`--fg`, `--bg`, `--accent`, etc.) auto-swap on `data-theme="dark"`.

- **Default accent** is terracotta. Each downstream project may override `--accent` with any of the palette (olive, plum, ochre, rust, moss) to stake out its own territory while keeping the rest of the system constant.
- **Pairings** are warm-on-warm: terracotta on cream, cream on ink, olive on ink, plum on cream. No bluish-purple gradients. No glow.

### Type

- **Display:** Roboto Slab — 900 for big "shop sign" treatments, 700 for headings, 500 for sub-heads. Tight letter-spacing (`-0.02em`).
- **Body / UI:** Space Grotesk — 400 body, 500 emphasis, 600 labels and buttons. 14px base (compact).
- **Mono:** JetBrains Mono — for code, kbd, HUD numerals, alchemical recipes in marginalia.

Scale is compact: body 14px, small labels 11–12px, headlines 26 → 46 → 64px → 88px display. See `preview/type-scale.html`.

### Spacing

4px base, compact. Scale: `2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80`. Most UI gaps are 6–12px; section breaks 24–40px. **Compact means tight, not cramped** — leading stays at 1.45.

### Corners & Borders

**Square.** `--r-0: 0` is the default. `--r-2: 2px` is the maximum allowed softening for inputs that absolutely need it. Pills (`--r-full`) appear only for true badges and dots, never for buttons.

Borders are **1px solid ink** in light mode, **1px solid cream** in dark — high-contrast hairlines, never grey-on-grey. The system reads like it was set with a ruler. A heavier `2px` border marks primary CTAs and selected states.

### Shadows

Shadows are not glows. Two flavors:

- **Letterpress press:** `inset 0 1px 0 rgba(20,19,15,.18)` — for pressed buttons and sunken fields.
- **Stamp offset:** `2px 2px 0 0 var(--ink)` — a hard, registration-mark drop on cards and primary buttons. No blur. This is the system's signature elevation.

No soft Material shadows. No glow. No backdrop blur.

### Backgrounds

Surfaces are flat warm cream or deep ink. Where ornament is wanted:

- **Paper noise** (`assets/patterns/paper-noise.svg`) — a faint grain layered at 6–10% opacity on hero areas and modal backdrops.
- **Repeating ornaments** — `ticks` and `dots` along section dividers; `crosshatch` as a fill for empty states; `wave` as a footer band.
- **Botanical marginalia** — a sprig or sigil glyph parked in the empty quadrant of a hero or sidebar, never centered, always at the edge.

Full-bleed photography is rare; when used, treat it monochrome-toned warm (sepia / duotone with the accent color).

### Animation

Restrained and short. The workshop doesn't bounce.

- **Easing:** `cubic-bezier(.2,.7,.2,1)` for entrances; `cubic-bezier(.5,1.6,.4,1)` only for the *snap* of a toggle or a stamp. Never spring-loaded UI elements.
- **Duration:** 120–180ms for most state changes; 320ms is the absolute cap (modal/drawer slide-in).
- **No fades by default** — opacity changes are paired with a 2–4px translate so the element feels physical.
- **Hover** does not move; it changes color or border weight only.

### Hover & press states

- **Hover (buttons, cards):** background shifts one tone warmer (cream→cream-soft, ink→surface), border thickens to 2px, OR the accent underline grows from 1px → 2px. Pick one per component family, not all three.
- **Hover (links):** color shifts to `--accent`; underline color inverts (becomes `--fg`).
- **Press:** elements with stamp shadow lose it (`0 0 0 0 var(--ink)`) and translate `2px 2px` into the press — the button "lands" on the page. Buttons without stamp shadow get an inset `--shadow-press` instead.
- **Focus:** a 2px outline in `--accent` offset by 2px. Never the browser default.

### Transparency & blur

Used sparingly. The only place blur appears is behind modals (`backdrop-filter: blur(2px)` on a 60% ink scrim) — it reads as a tracing-paper overlay. Surfaces themselves are never translucent.

### Imagery

Warm-toned, slightly desaturated, with a hint of grain. Botanical photography (pressed leaves, dried herbs, old paper) and still life favored over people. When humans appear they are mid-task — hands at a workbench, not faces smiling at a camera.

### Cards

A card is: `1px solid var(--border)`, no radius, optional `2px 2px 0 0 var(--ink)` stamp shadow. Padding is `16–24px`. Header has a `border-bottom: 1px solid var(--border)` and a small caps label. No gradients, no inner ring, no halo.

### Layout

- **Asymmetric grids.** The system prefers 12-column with intentional empty cells over centered symmetry. Headlines flush-left, body indented one column, marginalia in the right gutter.
- **Fixed elements** are rare — only the top app bar (when present) and modal/toast. No floating action buttons.
- **Density is compact** — 8px between siblings is normal, 16–24px between groups.

### "Quirk" — the signature move

**Botanical marginalia in the right gutter.** Every primary view has one glyph (`sprig`, `leaf`, `fern`, `sigil`, `compass`, `eye`) anchored in the bottom-right negative space at 40–60% opacity. The same glyph appears in section headers as a bullet, in empty states as the centerpiece, in the favicon. This is what makes a screen feel like Achery and not like a template.

---

## Iconography

There is **one icon set**: `assets/glyphs/` — 30 hand-tuned SVGs, all 24×24, `stroke="currentColor"` with `stroke-width="1.4"`. They cover:

- **Alchemical:** mercury, sulfur, salt, sun, moon, star, sigil, flask, key
- **Botanical:** leaf, sprig, fern
- **Geometric:** triangle (up/down), square, circle, hex, cross
- **UI primitives:** tick, plus, minus, arrow-up, arrow-right, eye, hand, compass, feather, book, scroll
- **Marginalia:** asterism (• • •), flourish (— ❦ —)

These are intentionally hand-drawn (single stroke weight, square caps, slightly imperfect geometry) — not Heroicons-precise. They are the icon system, the bullet system, and the decorative system at the same time.

**Sizing.** 14 / 16 / 20 / 24 / 32px. Below 14px, switch to a filled glyph (square, circle, triangle) — strokes don't read at small sizes.

**Color.** Always `currentColor`. They inherit from text. Tinting with `--accent` is allowed in dedicated places (empty-state hero, sidebar marginalia).

**Emoji.** Not used. Substitute the closest glyph. If none fits, use a unicode geometric character (`◆ ◇ ◯ △ ▽ ✦ ✧ ✺`) styled in Roboto Slab.

**PNG / raster icons.** None. Everything is SVG.

**No CDN icon set is linked.** If the project needs an icon not in the set, draw it in the same style (24×24 viewBox, 1.4px stroke, square caps, single-color) rather than reaching for Lucide/Heroicons — mixing icon sets is the single fastest way to break the workshop feeling.

---

## Substitutions / asks for the user

- **Fonts** are loaded from Google Fonts (Roboto Slab, Space Grotesk, JetBrains Mono). For offline / production, drop `.woff2` files into `fonts/` and switch the `@import` at the top of `colors_and_type.css` to local `@font-face` declarations. **Flag:** no custom display face was specified — if you'd like something more peculiar (e.g. Redaction, Editorial New, Reckless), let me know and I'll swap.
- **Wordmark.** Drawn as a placeholder around the alchemical-arrow crest. Open `assets/wordmark.svg` and replace if you want different proportions / a hand-drawn letterform.
- **Photography.** Not included — the system describes the treatment but ships no stock imagery.
- **Per-project accent.** The default accent is terracotta. To stake out a project, override `--accent` (and optionally `--accent-2`, `--accent-3`) at the project root.

---

_Made for the workshop, not the storefront._
