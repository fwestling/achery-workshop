# achery-ui

Achery Workshop design system — autumn alchemy, hard edges, botanical marginalia.

A React component library with a strong visual identity: square corners, stamp shadows, compressed type, and decorative glyphs drawn from alchemical and botanical illustration traditions.

---

## Install

```sh
pnpm add achery-ui
```

**Peer dependencies** (install separately if not already present):

```sh
pnpm add react react-dom
```

Requires **React 19+**.

---

## Quick start

```tsx
// 1. Import styles once at your app entry point
import 'achery-ui/style.css'

// 2. Wrap your app in AcheryProvider
import { AcheryProvider } from 'achery-ui'

export default function App() {
  return (
    <AcheryProvider defaultTheme="light" defaultAccent="terracotta">
      <YourApp />
    </AcheryProvider>
  )
}

// 3. Use components anywhere in the tree
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
| `achery-ui` | All components + theme | No (DOM + CSS) |
| `achery-ui/style.css` | Component styles | No |
| `achery-ui/tokens` | Design tokens as TypeScript values | **Yes** |
| `achery-ui/native` | React Native components + `NativeThemeProvider` | **Yes** |

The `/tokens` entry is zero-DOM, zero-React — safe to import from React Native or any non-browser context. The `/native` entry ships a full component set built on React Native primitives with no CSS dependency.

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
| `ToastProvider` + `useToast` | Imperative toast notifications |

Full props reference: [COMPONENTS.md](COMPONENTS.md) · Detailed docs: [src/components/README.md](src/components/README.md)

---

## Theming

```tsx
import { useTheme } from 'achery-ui'

const { theme, toggleTheme, accent, setAccent } = useTheme()
```

**Themes:** `light` · `dark` · `system`  
**Accents:** `terracotta` · `moss` · `plum` · `ochre` · `rust` · `copper` · `slate` · `verdigris` · `mauve` · `amber` · `fern` · `blush`  
**Dial:** `underline` · `chrome` · `surface` — controls how loudly the accent runs  
**Surface origin:** `web-first` · `native-first` · `parity` · `native-only` — declares the adaptation ladder

Full theming guide: [src/theme/README.md](src/theme/README.md)

---

## Design language

See [docs/styleguide.md](docs/styleguide.md) for the full visual language reference — palette rationale, typography roles, spacing scale, glyphs, motion, and copy voice.

For cross-surface adaptation (web ↔ mobile ↔ native) — the disclosure ladder, promotion ladder, and Achery-on-touch rules — see [src/native/README.md](src/native/README.md).

---

## Versioning

Versions follow [Semantic Versioning](https://semver.org). Changes are documented in [CHANGELOG.md](CHANGELOG.md).

On merge to `main`, a GitHub Action automatically creates a GitHub Release and publishes to npm if the version in `package.json` has changed since the last tag.

---

## Development

```sh
pnpm install
pnpm storybook          # component explorer at localhost:6006
pnpm build              # build library → dist/
pnpm build:watch        # rebuild on file changes
pnpm typecheck          # tsc --noEmit
pnpm build-storybook    # static storybook → storybook-static/
```

### Working on a branch

See [CLAUDE.md](CLAUDE.md) for the full contribution workflow, including versioning and changelog rules.

---

## Package structure

```
src/
  tokens/       # /tokens entry point — React Native safe
  types/        # Shared TypeScript types
  theme/        # ThemeProvider, useTheme, CSS contracts
  glyphs/       # Glyph component + 33 inlined SVG components
  components/   # All UI components (stories colocated)
  docs/         # Storybook MDX documentation pages
dist/           # Built output (gitignored)
.github/
  workflows/
    release.yml # Auto-release on version bump to main
```
