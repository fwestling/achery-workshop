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

Around forty web components (buttons, form fields, tables, dialogs, menus, charts and more) and a React Native set. Every one, with live examples in any theme and accent: [workshop.achery.dev/components](https://workshop.achery.dev/components). Props and usage: [COMPONENTS.md](COMPONENTS.md).

---

## Theming

```tsx
import { useTheme } from 'achery-ui'

const { theme, toggleTheme, accent, setAccent } = useTheme()
```

**Themes:** `light` · `dark` · `system`  
**Accents:** `terracotta` · `moss` · `plum` · `ochre` · `rust` · `copper` · `slate` · `woad` · `verdigris` · `mauve` · `amber` · `fern` · `blush` (and `olive`, a legacy alias of `moss`)  
**Dial:** `underline` · `chrome` · `surface` — how loudly the accent runs  
**Material:** `none` · `leather` · `wood` · `copper` — for contained, occasional objects  
**Surface origin:** `web-first` · `native-first` · `parity` · `native-only` — declares the adaptation ladder

Full theming guide: [src/theme/README.md](src/theme/README.md)

---

## Design language

See [docs/styleguide.md](docs/styleguide.md) for the full visual language reference — palette rationale, typography roles, spacing scale, glyphs, motion, and copy voice.

For cross-surface adaptation (web ↔ mobile ↔ native) — the disclosure ladder, promotion ladder, and Achery-on-touch rules — see [src/native/README.md](src/native/README.md).

---

## Versioning

Versions follow [Semantic Versioning](https://semver.org). Changes are documented in [CHANGELOG.md](CHANGELOG.md).

Pushing a `v*` tag runs a GitHub Action that publishes that version to npm and creates a GitHub Release from its `CHANGELOG.md` section.

---

## Development

```sh
pnpm install
pnpm storybook          # component explorer at localhost:6006
pnpm build              # build library → dist/
pnpm build:watch        # rebuild on file changes
pnpm typecheck          # tsc --noEmit
pnpm build-storybook    # static storybook → storybook-static/
pnpm --filter achery-workshop-site dev   # the documentation site, at localhost:5190
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
  glyphs/       # Glyph component + 397 generated SVG components
  components/   # All UI components (stories colocated)
  native/       # /native entry point — React Native components (+ their stories, for the site)
  docs/         # MDX documentation pages (Storybook, and rendered by the site)
site/           # workshop.achery.dev — the documentation site (private workspace package)
dist/           # Built output (gitignored)
.github/
  workflows/
    release.yml # npm publish + GitHub Release on a pushed v* tag
```
