# Achery Workshop — Game UI Kit

An indie-game HUD/inventory/dialog overlay for an apothecary game called *Achery: The Workshop*. This kit shows how the design system stretches into a games context — leaning hard on the **materials palette** (leather, copper, silver, wood, gold) for the premium "object" feel that flat web UI can't really give you.

## What's modeled

- **Wood-grain backdrop** (CSS-only, repeating-linear-gradient + radial vignette)
- **HUD bar** — HP/MP bars (red/blue gradient fills, copper inset frames), location ribbon (slab, gilt-on-black, with `✦` crests), gold counter
- **Leather panels** — gradient leather background, copper-deep inset border, copper rivets in each corner. Reusable as `.gx-panel`.
- **Inventory grid** — 8 cols × 3 rows of slots with rarity-coloured insets (common / rare / epic / legendary / empty). Selected slot glows gold.
- **Inspect panel** — rarity eyebrow, slab name, italic flavour text with copper border-left, stat rows, gold/ghost action buttons.
- **Quest log** — bordered entries, urgency colour on the left rule (urgent red, side amber-copper, done moss).
- **Dialog box** — character portrait (placeholder face), italic slab dialogue with gold highlights for emphasised words, branching choice list with `[1][2][3]` keys.
- **Pressed-leather buttons** — gold variant for primary, leather for default, silver ghost for tertiary.
- **Keyboard hint strip** at the bottom-right.

## How it uses the design system

- **Colors** — pulls `--leather`, `--copper` (+ deep/light), `--silver` (+ deep/light), `--wood`, `--gold` (+ deep/light) directly. Common/rare/epic still use `--moss-light`, `#6aa0d8`, `--plum-light` from the core palette.
- **Type** — `--font-display` (Roboto Slab) for HUD numerals, panel titles, item names, dialogue; `--font-mono` (JetBrains Mono) for keybind labels, stat values, eyebrows.
- **Letterspacing** — heavier than the web UI to mimic stamped/engraved feel (0.16–0.24em on uppercase).
- **No round corners** — game UI follows the rest of the system: hard 1px–2px borders, ink shadows, no radii except on the coin sprite.

## What's deliberately not here

- No sprite/portrait art — the portrait is a CSS placeholder. Drop a real PNG in.
- No animation. A tweens-pack would live in a sibling `motion.jsx` if needed.
- No icons — item glyphs are unicode alchemical symbols. Replace with PNG sprites at production time.
