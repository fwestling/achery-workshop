# achery-ui

Achery Workshop design system — autumn alchemy, hard edges, botanical marginalia.

A React component library with a strong visual identity: square corners, stamp shadows, compressed type, and decorative glyphs drawn from alchemical and botanical illustration traditions.

---

## Install

```sh
pnpm add achery-ui
# or
npm install achery-ui
```

**Peer dependencies** (install separately if not already present):

```sh
pnpm add react react-dom
```

Requires **React 19+**.

---

## Quick start

Wrap your application in `AcheryProvider` once, near the root:

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

Then use components anywhere in the tree:

```tsx
import { Button, Badge, Card, Heading } from 'achery-ui'

function RecipeCard({ recipe }) {
  return (
    <Card variant="stamp" marginalia="fern">
      <Heading level={2}>{recipe.name}</Heading>
      <Badge tone="saved">Published</Badge>
      <Button variant="accent" glyph="book">Open</Button>
    </Card>
  )
}
```

---

## Entry points

| Import | Contents | React Native safe? |
|---|---|---|
| `achery-ui` | All 16 components + theme | No (DOM + CSS) |
| `achery-ui/tokens` | Design tokens as TypeScript values | **Yes** |

The `/tokens` entry is zero-DOM, zero-React — safe to import from React Native or any non-browser context. See [src/tokens/README.md](src/tokens/README.md).

---

## Components

| Component | Description |
|---|---|
| `AcheryProvider` | Theme root — wraps your app |
| `useTheme` | Hook: read/set theme and accent |
| `Button` | Five variants, three sizes, glyphs, kbd hints |
| `Badge` | Status/category label with five tones |
| `Eyebrow` | Uppercase section label with optional count |
| `Toggle` | Binary on/off switch |
| `Glyph` | 33-icon SVG glyph set |
| `Marginalia` | Decorative corner glyph (aria-hidden) |
| `Typography` | `Display`, `Heading`, `Body`, `Mono` |
| `Field` | Form field wrapper: label + hint/error |
| `Input` | Single-line text input |
| `Textarea` | Multi-line text input |
| `Select` | Native select dropdown |
| `SearchInput` | Search input with compass icon |
| `Card` | Surface container: flat or stamp variant |
| `Tabs` | Accessible tab navigation |
| `Tooltip` | Hover/focus contextual label |
| `Sidebar` | Vertical nav with groups and active state |
| `AppBar` | Top bar: brand, search, accent picker, theme toggle |
| `Table` | Sortable data table, row selection, hybrid state |
| `Modal` | Accessible dialog with focus trap |
| `ToastProvider` | Toast queue provider |
| `useToast` | Hook: fire toast notifications imperatively |

Full props reference: [src/components/README.md](src/components/README.md)

---

## Theming

```tsx
import { useTheme } from 'achery-ui'

function Controls() {
  const { theme, toggleTheme, accent, setAccent } = useTheme()
  return (
    <Button glyph={theme === 'dark' ? 'sun' : 'moon'} onClick={toggleTheme} />
  )
}
```

**Accent colours:** `terracotta` · `moss` · `plum` · `ochre` · `rust` · `copper`

**Themes:** `light` · `dark`

Full theming guide: [src/theme/README.md](src/theme/README.md)

---

## Design language

See [docs/styleguide.md](docs/styleguide.md) for the full visual language reference — palette, typography, spacing, glyphs, and design principles.

---

## Development

```sh
pnpm install
pnpm storybook          # dev server at localhost:6006
pnpm build              # build library → dist/
pnpm build-storybook    # static storybook → storybook-static/
pnpm typecheck          # tsc --noEmit
```

---

## Package structure

```
src/
  tokens/       # /tokens entry point — React Native safe
  types/        # Shared TypeScript types
  theme/        # ThemeProvider, useTheme, CSS contracts
  glyphs/       # Glyph component + 33 SVGs
  components/   # All 16 UI components (stories colocated)
dist/           # Built output (gitignored)
```

---

## React Native

The `/tokens` entry is the designed cross-platform seam. A sibling `achery-ui-native` package can consume `achery-ui/tokens` for full token parity without any DOM dependency. The main `achery-ui` entry (components + theme) is web-only.
