# Theming Guide

Achery UI uses [vanilla-extract](https://vanilla-extract.style/) for all styles. Theme switching is implemented via HTML data attributes — no runtime style injection, no CSS-in-JS overhead at runtime.

---

## How it works

`AcheryProvider` renders a root div with its theme, accent and dial as data attributes (and `data-material` when one is set):

```html
<div data-achery-root data-theme="light" data-accent="terracotta" data-dial="chrome">
  …
</div>
```

All CSS custom properties are scoped to `[data-achery-root][data-theme="light"]` and `[data-achery-root][data-theme="dark"]`. Changing the `data-theme` attribute instantly swaps the entire token set — no style recalculation, no flash.

The same attributes are also mirrored onto `<html>` so that portaled content (Modal, Tooltip, Toast) inherits the correct vars even though it renders outside the root div.

---

## Quick setup

```tsx
import { AcheryProvider } from 'achery-ui'

export default function App() {
  return (
    <AcheryProvider defaultTheme="light" defaultAccent="terracotta">
      <YourApp />
    </AcheryProvider>
  )
}
```

---

## Reading and setting the theme

Use `useTheme()` anywhere inside `<AcheryProvider>`:

```tsx
import { useTheme } from 'achery-ui'

function ThemeControls() {
  const { theme, toggleTheme, accent, setAccent } = useTheme()

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
      <select value={accent} onChange={e => setAccent(e.target.value)}>
        <option value="terracotta">Terracotta</option>
        <option value="moss">Moss</option>
        <option value="plum">Plum</option>
      </select>
    </>
  )
}
```

The `AppBar` component wraps this pattern into a pre-built UI — pass `onToggleTheme`, `accent`, and `onAccentChange`:

```tsx
<AppBar
  isDark={theme === 'dark'}
  onToggleTheme={toggleTheme}
  accent={accent}
  onAccentChange={setAccent}
/>
```

---

## Accent colours

Fourteen accent colours ship with the system (thirteen hues, plus `olive` as a legacy alias of `moss`). All values are hex throughout (palette, tokens, CSS) so React Native consumers work without conversion. Each accent automatically adjusts between light and dark themes — the light value is a richer, darker tone; the dark value is brighter for legibility.

**Original palette:**

| Name | Light | Dark | Character |
|---|---|---|---|
| `terracotta` | `#c46a3a` | `#e6895a` | Warm orange-red; the default |
| `moss` | `#4a5a32` | `#718654` | Deep green; earthy |
| `plum` | `#5e486d` | `#8c769e` | Muted purple; considered |
| `ochre` | `#b8924a` | `#d6b676` | Golden yellow; warm |
| `rust` | `#912e29` | `#db786b` | Brick red; dramatic |
| `copper` | `#b8742a` | `#d68f48` | Metallic amber; refined |

**Extended palette** — wider hue territory, same muted earthy chroma:

| Name | Light | Dark | Character |
|---|---|---|---|
| `slate` | `#195a73` | `#5189a1` | Dusty steel blue |
| `woad` | `#445282` | `#6f7eae` | Indigo; fills the gap between slate and plum |
| `verdigris` | `#04665e` | `#3f9086` | Aged-copper teal |
| `mauve` | `#76425b` | `#a56c87` | Dusty rose |
| `amber` | `#9a6839` | `#be8c61` | Warm amber-gold |
| `fern` | `#36643e` | `#618d67` | Cool conservatory green |
| `blush` | `#955c63` | `#bc848a` | Dusty warm rose |
| `olive` | `#4a5a32` | `#718654` | Legacy alias of `moss`; prefer `moss` |

---

## Accent dial

`defaultDial` sets how loudly the accent runs across the interaction layer; `useTheme().setDial` changes it. The paper, ink hairlines and square corners never change.

| Dial | The accent appears on |
|---|---|
| `underline` | Links, focus rings and the active-tab underline. Ticks are ink. |
| `chrome` (default) | The above, plus checkbox ticks, an accent rule before each eyebrow, and outline (secondary) button borders |
| `surface` | As chrome, and the one `.signature-surface` panel per view floods with the accent |

The accent goes on marks, never text: as small text it would miss 4.5:1 for several accents (terracotta, copper, ochre and amber on paper; most hues on dark cards). Components read the dial through `--achery-dial-*` custom properties set on the root (`src/theme/dial.ts`).

---

## CSS custom properties

Inside `[data-achery-root]`, these stable aliases point at the theme's values. Use them in plain CSS or inline styles:

| Variables | |
|---|---|
| `--achery-color-bg`, `-bg2`, `-bgSunken`, `-surface`, `-surface2` | Grounds |
| `--achery-color-fg`, `-fg2`, `-fg3`, `-fgMute` | Text |
| `--achery-color-border`, `-border2`, `-borderMute`, `-rule` | Lines |
| `--achery-color-accent`, `-accentFg`, `-accent2`, `-accent3` | The project's accent, and text on it |
| `--achery-color-accentSoft`, `-accentSoftStrong` | Accent tints (18% and 28%) for selected rows and chips |
| `--achery-color-success`, `-warn`, `-danger`, `-info` | Status |
| `--achery-color-selectionBg`, `-selectionFg` | Text selection |
| `--achery-font-display`, `-body`, `-mono` | Font stacks |
| `--achery-space-sp1` … `--achery-space-sp9` | Spacing, 2px–32px |

Radius, shadows, motion and the larger spacing steps have no alias: use `vars` (below) in vanilla-extract, or the values in `achery-ui/tokens`. Every colour, with usage and contrast: [workshop.achery.dev/colour](https://workshop.achery.dev/colour).

---

## Surface origin

`defaultSurfaceOrigin` declares the design direction of the app — it determines which adaptation ladder governs components across surfaces. It does not drive CSS directly; `@media (pointer: coarse)` and component variants handle that. The value is available via `useTheme().surfaceOrigin` for any code that needs to know the declared direction.

```tsx
<AcheryProvider defaultSurfaceOrigin="web-first">
```

| Value | Direction | Ladder |
|---|---|---|
| `'web-first'` | Dense desk view descends to phone | Disclosure ladder |
| `'native-first'` | Phone view promoted to desk | Promotion ladder |
| `'parity'` | Agreed feature set; neither ladder dominates | Design data model first |
| `'native-only'` | No web twin | Achery touch rules apply in full |

Default is `'web-first'`. See [docs/styleguide.md](../../docs/styleguide.md#surface-adaptation-web--mobile--native) for the full ladder reference.

---

## Type-safe token access in custom CSS

If you are writing `vanilla-extract` styles in your own application and want to reference Achery tokens type-safely, import `vars` from the main entry:

```ts
import { vars } from 'achery-ui'
import { style } from '@vanilla-extract/css'

export const myElement = style({
  color: vars.color.fg,
  background: vars.color.surface,
  boxShadow: vars.shadow.stamp,
  fontFamily: vars.font.body,
})
```

`vars` is the vanilla-extract theme contract — TypeScript will catch any misspelled token names at compile time.

---

## Server-side rendering

The theme data attributes are set by `AcheryProvider` in React — on first paint (before hydration) the attributes are absent. To avoid a flash, set `data-achery-root`, `data-theme`, and `data-accent` on `<html>` server-side before rendering:

```html
<!-- In your HTML shell or _document.tsx -->
<html data-achery-root data-theme="light" data-accent="terracotta">
```

---

## Portaled content

`Modal`, `Tooltip`, and `Toast` render into `document.body` via React portals. They inherit theme CSS vars because `AcheryProvider` mirrors `data-achery-root`, `data-theme`, `data-accent`, `data-dial` and `data-material` onto `document.documentElement` via a `useEffect`. This means:

1. Portal content is always styled correctly
2. No extra wrapper is needed around portals
3. The cleanup on unmount removes those attributes

---

## Multiple providers and nested scopes

Nesting `AcheryProvider`s works, but each writes its attributes to `document.documentElement`, so the innermost wins there, and portals follow it. To give a subtree a different theme, accent or dial without touching portals, put the attributes on a plain element instead: a nested `[data-achery-root]` re-scopes every variable for its subtree.

```html
<div data-achery-root data-theme="dark" data-accent="moss" data-dial="underline">…</div>
```

It also picks up the root's base font size, line height and background, which you may want to reset.
