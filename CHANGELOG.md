# Changelog

All notable changes to `achery-ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.1.0] - 2026-05-17

### Added
- Initial release of `achery-ui`
- 16 components: `AppBar`, `Badge`, `Button`, `Card`, `Eyebrow`, `Field`/`Input`/`Textarea`/`Select`/`SearchInput`, `Glyph`, `Marginalia`, `Modal`, `Sidebar`, `Table`, `Tabs`, `Toast`, `Toggle`, `Tooltip`, `Typography` (`Display`, `Heading`, `Body`, `Mono`)
- 33 SVG glyphs inlined as React components (botanical, alchemical, geometric, editorial, brand)
- Vanilla-extract theme system: `createThemeContract`, light/dark themes, 6 accent colours (`terracotta`, `moss`, `plum`, `ochre`, `rust`, `copper`)
- `AcheryProvider` with `data-theme` / `data-accent` CSS attribute switching
- `useTheme()` hook: `theme`, `toggleTheme`, `accent`, `setAccent`
- `/tokens` entry point — zero DOM, zero React, React Native safe
- `achery-ui/style.css` export for consumer CSS import
- Storybook 10 with autodocs, MDX documentation pages, accent picker, dark mode toggle
- TSDoc on all public APIs

[Unreleased]: https://github.com/fwestling/achery-workshop/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.1.0

<!-- When promoting Unreleased → versioned, update the Unreleased link to compare/vNEW...HEAD
     and add a new link: [NEW]: .../releases/tag/vNEW -->
