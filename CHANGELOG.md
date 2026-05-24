# Changelog

All notable changes to `achery-ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.3.2] - 2026-05-21

### Fixed
- Imports migrated from .js to extensionless for better imports

---

### Fixed
- `SemanticTokens`: widened from `typeof lightTokens` to `typeof lightTokens | typeof darkTokens` — dark theme tokens can now be assigned to `SemanticTokens` without a type error
- `Sidebar`: added `collapsed` / `onCollapsedChange` props for icon-only mode (52px), `title` hint on collapsed items; `SidebarLinkProps` gains optional `title`

---

## [0.3.2] - 2026-05-21

### Fixed
- Modal: entry animation no longer jumps from top-left corner — `slideUp` keyframe now includes the centering transform

---

## [0.3.1] - 2026-05-21

### Added
- Combobox: multi-select free-text component built on `@radix-ui/react-popover` — props: `value: string[]`, `onChange`, `options`, `allowCustom?`, `placeholder?`; selected values render as removable chips; keyboard navigation (↑↓, Enter, Backspace, Escape)

## [0.3.0] - 2026-05-21

### Added
- Checkbox: new component built on `@radix-ui/react-checkbox` — props: `checked` (`boolean | 'indeterminate'`), `onChange`, `defaultChecked`, `disabled`, `label`, `aria-label`
- Menu: new dropdown component built on `@radix-ui/react-dropdown-menu` — props: `trigger`, `items: (MenuItemDef | MenuSeparator)[]` (with `label`, `glyph?`, `onSelect`, `disabled?`, `danger?`), `side`, `align`; renders into a portal
- DatePicker: thin wrapper around `<input type="date">` styled to match achery-ui — props: `value`, `onChange`, `min`, `max`, `disabled`, `error`; extends all standard input attributes

---

## [0.2.1] - 2026-05-21

### Added
- ProgressBar: new component — props: `value` (0–100), `size` (`sm | md`), `tone` (`neutral | accent`)

### Changed
- Sidebar: added `renderLink` prop (`ComponentType<SidebarLinkProps>`) so consumers can pass their router's `<Link>` for client-side navigation; falls back to `<a>` when omitted

---

## [0.2.0] - 2026-05-18

### Added
- `achery-ui/native` entry point: React Native component set (`NativeThemeProvider`, `useTheme`, `Text`, `Button`, `Card`, `Badge`, `Field`, `Input`) using achery-ui token values via `achery-ui/tokens` — no vanilla-extract dependency

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
