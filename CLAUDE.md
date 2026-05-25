# Claude Code — achery-workshop

## What this repo is

`achery-ui` is a published React component library. Autumn-palette, hard-edged, letterpress/botanical aesthetic. Built with vanilla-extract (zero-runtime CSS), Radix UI primitives, and React 19.

**Key files to orient yourself:**
- `COMPONENTS.md` — full component API inventory (props, variants, usage examples)
- `CHANGELOG.md` — what has changed and when
- `src/index.ts` — everything exported from the main `achery-ui` entry
- `src/tokens/index.ts` — everything exported from `achery-ui/tokens`
- `src/theme/vars.css.ts` — the CSS theme contract (all CSS custom property names)

**Related repos:**
- `../achery-example` — consumer demo app (recipe manager); uses `file:` dependency on this repo
- `../achery-exemplar` — fullstack monorepo boilerplate (Django + React + Expo); the primary driver of new component and pattern work

---

## The feedback loop

`achery-ui` is refined by real usage in `achery-exemplar` and projects forked from it. When a consumer hits a gap, the fix comes back here.

When adding or changing a component prompted by consumer feedback:
1. Implement in `src/components/<Name>/`
2. Update `COMPONENTS.md` — props, variants, usage example
3. Update `CHANGELOG.md` under `## [Unreleased]`
4. Bump `package.json` version (patch for fixes, minor for new components/variants)
5. Rebuild (`pnpm build`) so the `file:` consumer picks it up immediately

---

## Development workflow

```sh
pnpm install
pnpm storybook       # component explorer at localhost:6006
pnpm build           # build → dist/
pnpm build:watch     # watch rebuild (use alongside achery-example dev)
pnpm typecheck       # type check without building
```

### Working on a component

1. Edit source in `src/components/<Name>/`
2. Run `pnpm build:watch` — tsup rebuilds on save
3. The colocated `.stories.tsx` file is your live harness in Storybook
4. If testing in the example app: open `../achery-example` and run `pnpm dev` there; it will pick up rebuilt `dist/` automatically

### Adding a new component

Follow the pattern of any existing component (e.g. `src/components/Badge/`):

```
src/components/MyComponent/
  MyComponent.tsx       # component + exported types
  MyComponent.css.ts    # vanilla-extract styles using vars from src/theme/vars.css.ts
  MyComponent.stories.tsx
  index.ts              # re-export
```

Then add exports to `src/index.ts` and document in `COMPONENTS.md`.

### Glyph system

SVGs live in `src/glyphs/svg/`. They are compiled into `src/glyphs/GlyphComponents.tsx` (inlined React components, no Vite plugin required by consumers). If you add or modify SVGs:

```sh
node scripts/generate-glyphs.mjs
```

Then rebuild. Do not edit `GlyphComponents.tsx` directly.

---

## Versioning & changelog

**Always update `CHANGELOG.md` and `package.json` version when making changes on a branch.**

### On a feature/fix branch

1. **First change on a new branch** — bump `package.json` version:
   - Bug fix → patch: `0.1.0` → `0.1.1`
   - New component or feature → minor: `0.1.0` → `0.2.0`
   - Breaking API change → major: `0.1.0` → `1.0.0`
   - When in doubt, patch.

2. **Every change** — add an entry under `## [Unreleased]` in `CHANGELOG.md`:

   ```markdown
   ## [Unreleased]

   ### Added
   - Button: added `loading` prop with spinner glyph

   ### Fixed
   - Modal: footer buttons no longer overflow on small viewports
   ```

   Subsections: `Added` · `Changed` · `Fixed` · `Removed` · `Breaking`

3. **Changelog entry style:**
   - One line per logical change
   - Lead with the component or area: `Button: added \`loading\` prop`
   - Note the why only when non-obvious

### Phased / multi-version work

When a task is broken into versioned phases (e.g. v0.5.0 then v0.5.1), **pause between phases** so Fred can review, commit, and tag each version separately before continuing to the next phase. Do not implement multiple planned versions in a single unbroken session. Ask explicitly: "Ready to continue with v0.5.1?" before starting the next phase.

### Before merging a branch to main

Promote `[Unreleased]` to a dated version heading and update the comparison links at the bottom:

```markdown
## [Unreleased]           ← keep this, empty, for next cycle

---

## [0.1.1] - 2026-06-01  ← was [Unreleased]
### Fixed
- ...
```

Bottom of file — update links:
```markdown
[Unreleased]: https://github.com/fwestling/achery-workshop/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/fwestling/achery-workshop/releases/tag/v0.1.1
[0.1.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.1.0
```

### On merge to main

The GitHub Action (`.github/workflows/release.yml`) runs automatically:
- Detects whether `package.json` version has a new tag
- Extracts the versioned section from `CHANGELOG.md` as release notes
- Creates a GitHub Release tagged `v{version}`
- Publishes to npm via OIDC Trusted Publisher (no token required)

No manual steps needed after merge.

---

## Architecture notes

### CSS system
vanilla-extract generates static CSS at build time. All CSS custom properties are declared in `src/theme/vars.css.ts` via `createThemeContract`. Theme switching is done by swapping `data-theme` and `data-accent` attributes on the root element — no JavaScript at runtime.

### Portal inheritance
Modal, Tooltip, and Toast render into `document.body` (outside `[data-achery-root]`). `ThemeProvider` mirrors `data-theme`, `data-accent`, and `data-achery-root` onto `document.documentElement` via `useEffect` so portaled content inherits CSS vars correctly.

### Consumer CSS
Consumers must import `achery-ui/style.css` once at their app entry. This is vanilla-extract's static output — it is not auto-injected.

### file: dependency in achery-example
`../achery-example` uses `"achery-ui": "file:../achery-workshop"` — pnpm symlinks `node_modules/achery-ui` directly to this repo's directory. Consumers always read from `dist/`. Run `pnpm build` (or `build:watch`) here; no reinstall needed in the example app between rebuilds. Restart the example's dev server only if `package.json` exports change.
