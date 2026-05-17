# Theming Guide

Achery UI uses [vanilla-extract](https://vanilla-extract.style/) for all styles. Theme switching is implemented via HTML data attributes — no runtime style injection, no CSS-in-JS overhead at runtime.

---

## How it works

`AcheryProvider` renders a root div with three data attributes:

```html
<div data-achery-root data-theme="light" data-accent="terracotta">
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

Six accent colours ship with the system:

| Name | Light | Dark | Character |
|---|---|---|---|
| `terracotta` | `#c46a3a` | `#d97a4a` | Warm orange-red; the default |
| `moss` | `#4a5a32` | `#8da866` | Deep green; earthy |
| `plum` | `#5d4a6a` | `#8b6fa8` | Muted purple; considered |
| `ochre` | `#b8924a` | `#e0bc70` | Golden yellow; warm |
| `rust` | `#8a3a22` | `#c46a3a` | Deep red-brown; dramatic |
| `copper` | `#b8742a` | `#d68f48` | Metallic amber; refined |

Each accent automatically adjusts between light and dark themes — the light value is a richer, darker tone; the dark value is brighter for legibility against dark backgrounds.

---

## CSS custom properties

The full set of CSS vars available within `[data-achery-root]`:

| Variable | Description |
|---|---|
| `--color-bg` | Page background |
| `--color-bg2` | Secondary background, alternating rows |
| `--color-bg-sunken` | Recessed areas, input backgrounds |
| `--color-surface` | Card/panel surfaces |
| `--color-surface2` | Secondary surface |
| `--color-fg` | Primary text and icons |
| `--color-fg2` | Secondary text |
| `--color-fg3` | Tertiary text |
| `--color-fg-mute` | Disabled/placeholder text |
| `--color-border` | Primary borders |
| `--color-border2` | Secondary borders |
| `--color-border-mute` | Subtle/muted borders |
| `--color-rule` | Horizontal rules |
| `--color-accent` | Active accent colour |
| `--color-accent-fg` | Foreground on accent background |
| `--color-success` | Positive semantic colour |
| `--color-warn` | Warning semantic colour |
| `--color-danger` | Error/destructive semantic colour |
| `--color-info` | Informational semantic colour |
| `--font-display` | Display (serif) typeface stack |
| `--font-body` | Body (sans-serif) typeface stack |
| `--font-mono` | Monospace typeface stack |
| `--space-sp1` … `--space-sp12` | Spacing scale (2px–80px) |
| `--radius-none` … `--radius-pill` | Border radius values |
| `--shadow-stamp` | Standard hard-offset shadow |
| `--shadow-stamp-lg` | Large hard-offset shadow |
| `--shadow-press` | Inset pressed-state shadow |
| `--duration-fast` … `--duration-slow` | Animation durations |
| `--ease-out` · `--ease-snap` | Easing curves |

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

`Modal`, `Tooltip`, and `Toast` render into `document.body` via React portals. They inherit theme CSS vars because `AcheryProvider` mirrors `data-achery-root`, `data-theme`, and `data-accent` onto `document.documentElement` via a `useEffect`. This means:

1. Portal content is always styled correctly
2. No extra wrapper is needed around portals
3. The cleanup on unmount removes those attributes

---

## Multiple providers

Nesting multiple `AcheryProvider` instances (e.g. for a component that must always use a specific accent) works, but each provider writes to `document.documentElement` — the innermost provider wins. For isolated theming within a subtree without affecting portals, use the `data-*` attributes directly on a container div with your own CSS vars.
