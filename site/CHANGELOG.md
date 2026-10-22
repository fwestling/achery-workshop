# Changelog — workshop.achery.dev

The documentation site's own history, versioned in `site/package.json`. It is separate from the library's
`CHANGELOG.md`: a site-only change bumps this file, not `achery-ui`. A change to both bumps both.

The site isn't published to npm. It deploys from `main` (`.github/workflows/site-deploy.yml`), so versions
here mark reviewed milestones rather than releases. Tag them `site-v<version>` — never `v<version>`, which
is the library's tag and triggers the npm release.

## [Unreleased]

---

## [0.4.0] - 2026-10-22

### Added
- React Native: a setup page (from COMPONENTS.md's React Native section) and one page per native component (27), rendering stories from `src/native/components/*.stories.tsx` through react-native-web, inside `NativeThemeProvider` with the preview settings applied
- Native API sections from each component's row of COMPONENTS.md's React Native table, and its own section where it has one
- `virtual:native-story-index`: native titles and descriptions read from the story files at build time (TypeScript AST), so react-native-web loads only on native pages; a test checks it against the real metas
- Site-only stand-ins for the native glyph loader (it require()s .svg files for Metro) and for React Native's `codegenNativeComponent`

---

## [0.3.0] - 2026-10-22

### Added
- Components: an index and one page per web component (37), each rendering the component's own Storybook stories live, with their descriptions and code
- Preview settings on each component page: theme, accent, dial and material, applied to every example
- API reference on each component page, from its `COMPONENTS.md` section
- A small CSF renderer for the stories (args, render, decorators, function stories, parameters), with a test that fails if a story uses a feature it doesn't support
- Home: "Browse components" is the main call to action

### Changed
- Examples that open a dialog on mount (`defaultOpen`) wait for a click, so a page never opens with dialogs over it

---

## [0.2.0] - 2026-10-22

### Added
- Foundations: Colour, Accents & dial, Typography, Space & shape, Motion, Materials, Chart colours and Glyphs pages, built from `achery-ui/tokens` and live components
- Colour and accent pages: WCAG contrast for every semantic token and accent fill, in both themes
- Usage notes for every token, from a copy of the design system's `tokens.json` (`src/data/design-system-tokens.json`)
- Drift test: fails when achery-ui's token values and the design system's disagree
- Typography: each design-system type style rendered with its achery-ui component, with its measured size, weight, line height and tracking
- Glyphs: every glyph, by category, searchable with `searchGlyphs`; select one to copy its name
- Principles page, and the Motion guidance, rendered from sections of `src/docs/Styleguide.mdx`

### Fixed
- Tests resolved `achery-ui` to the built `dist/` instead of `../src`; they now share the site's Vite config

---

## [0.1.0] - 2026-10-22

### Added
- Site skeleton: Vite + React, prerendered to static HTML, rendering achery-ui from `../src` (not npm)
- Shell built from achery-ui's own `AppBar` and `Sidebar`; theme toggle and accent swatches in the app bar,
  mode and accent controls in the sidebar footer at phone width
- Home page: version, links to npm and GitHub, and `src/docs/GettingStarted.mdx` rendered as the page body
- Docker image (nginx), `checks.yml` and `site-deploy.yml` workflows, compose block and `DEPLOY.md`

[Unreleased]: https://github.com/fwestling/achery-workshop/compare/site-v0.4.0...HEAD
[0.4.0]: https://github.com/fwestling/achery-workshop/compare/site-v0.3.0...site-v0.4.0
[0.3.0]: https://github.com/fwestling/achery-workshop/compare/site-v0.2.0...site-v0.3.0
[0.2.0]: https://github.com/fwestling/achery-workshop/compare/site-v0.1.0...site-v0.2.0
[0.1.0]: https://github.com/fwestling/achery-workshop/releases/tag/site-v0.1.0
