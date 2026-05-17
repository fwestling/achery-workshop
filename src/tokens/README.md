# Token Reference

Design tokens available from the `achery-ui/tokens` entry point. This entry is **React Native safe** — zero DOM, zero React, pure TypeScript values.

```ts
import { palette, spacing, fontFamilies, shadows } from 'achery-ui/tokens'
```

---

## Palette

Raw colour values. All colours are specified as hex strings.

```ts
import { palette } from 'achery-ui/tokens'

palette.parchment    // '#fbf8f0' — primary background (light)
palette.ink          // '#1f1d18' — primary foreground (light)
palette.terracotta   // '#c46a3a' — default accent (light)
```

The palette is grouped into families: `parchment`, `fog`, `stone`, `ink`, `terracotta`, `moss`, `plum`, `ochre`, `rust`, `copper`, plus semantic entries for `success`, `warn`, `danger`, `info`.

Use `PaletteKey` for type-safe key access.

---

## Accent colours

```ts
import { accentColors, accentColorNames } from 'achery-ui/tokens'
import type { AccentColor } from 'achery-ui/tokens'

accentColorNames
// ['terracotta', 'moss', 'plum', 'ochre', 'rust', 'copper']

accentColors.terracotta
// { main: '#c46a3a', fg: '#fbf8f0', light: '#c46a3a', dark: '#d97a4a' }
```

Each accent has a `main` colour (light-mode) and per-theme variants with an appropriate `fg` (foreground on that background).

---

## Spacing

A 4px-base scale. Twelve steps — sp1 (2px) through sp12 (80px).

```ts
import { spacing, spacingScale, px } from 'achery-ui/tokens'

spacing.sp4   // '8px'
spacing.sp6   // '16px'
spacing.sp9   // '32px'

spacingScale  // [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 56, 80]

px(4)         // '4px'  — helper to convert a number to a px string
```

| Token | Value |
|---|---|
| `sp1` | 2px |
| `sp2` | 4px |
| `sp3` | 6px |
| `sp4` | 8px |
| `sp5` | 12px |
| `sp6` | 16px |
| `sp7` | 20px |
| `sp8` | 24px |
| `sp9` | 32px |
| `sp10` | 40px |
| `sp11` | 56px |
| `sp12` | 80px |

---

## Typography

```ts
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  googleFontsUrl,
} from 'achery-ui/tokens'

fontFamilies.display  // '"IM Fell English", Georgia, serif'
fontFamilies.body     // '"Space Grotesk", system-ui, sans-serif'
fontFamilies.mono     // '"Space Mono", "Fira Mono", monospace'

fontSizes.sm    // '11px'
fontSizes.base  // '13px'
fontSizes.md    // '14px'
fontSizes.lg    // '16px'
fontSizes.xl    // '20px'
fontSizes.xxl   // '26px'
fontSizes.disp  // '36px'

fontWeights.normal    // 400
fontWeights.medium    // 500
fontWeights.semibold  // 600
fontWeights.bold      // 700
```

`googleFontsUrl` — the `<link>` href to load all three typefaces from Google Fonts. Injected automatically by `AcheryProvider` via `GlobalStyles`.

---

## Radius

Square-cornered by design. Radius tokens for the rare cases where rounding is intentional.

```ts
import { radius } from 'achery-ui/tokens'

radius.none     // '0'      — default; square corners
radius.hairline // '1px'   — imperceptible; softens pixel-art edges
radius.sm       // '2px'   — subtle; badge corners
radius.pill     // '999px' — fully rounded; avatar, toggle track
```

---

## Shadows

Hard-offset stamp shadows — no blur, no spread. The signature elevation style.

```ts
import { shadows } from 'achery-ui/tokens'

shadows.stamp    // '2px 2px 0 0 {ink}'   — standard elevation
shadows.stampLg  // '4px 4px 0 0 {ink}'   — modal / hero card
shadows.press    // 'inset 0 1px 0 …'     — pressed/active state
shadows.soft     // '0 1px 0 …'           — subtle separator
```

Shadow values use ink-colour offsets in light mode and parchment-colour offsets in dark mode — the contrast flips but the hard-edge character is maintained.

---

## Motion

```ts
import { duration, easing, zIndex } from 'achery-ui/tokens'

duration.fast  // '120ms' — micro-interactions, button press
duration.base  // '180ms' — standard transitions
duration.slow  // '320ms' — entrance/exit animations

easing.out   // 'cubic-bezier(.2,.7,.2,1)'  — standard decelerate
easing.snap  // 'cubic-bezier(.5,1.6,.4,1)' — spring-like overshoot

zIndex.overlay  // 100 — modal backdrop
zIndex.modal    // 101 — modal content
zIndex.toast    // 200 — toast stack
```

---

## Semantic tokens

Light and dark colour maps keyed to the same semantic names used in CSS vars.

```ts
import { lightTokens, darkTokens } from 'achery-ui/tokens'
import type { SemanticTokens } from 'achery-ui/tokens'

lightTokens.color.bg       // '#fbf8f0'
lightTokens.color.accent   // '#c46a3a'
darkTokens.color.bg        // '#14130f'
darkTokens.color.accent    // '#d97a4a'
```

These are the same values bound to CSS custom properties by `AcheryProvider`. Use them in non-browser contexts (React Native StyleSheet, email templates, etc.) where CSS vars are not available.
