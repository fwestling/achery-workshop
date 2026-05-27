# Changelog

All notable changes to `achery-ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.5.3] - 2026-05-27

### Fixed
- `Sidebar`: removed `filter: invert(1)` from the active nav item glyph; glyphs now inherit `currentColor` from the nav item (which is already set to `--color-bg` when active), rendering correctly on non-white backgrounds such as the parchment theme

---

## [0.5.2] - 2026-05-26

### Added
- `global.css`: stable `--achery-color-*` / `--achery-font-*` / `--achery-space-*` CSS custom property aliases on `[data-achery-root]`; consumers can now safely use e.g. `var(--achery-color-fg)` in inline styles and they will resolve correctly across theme changes

### Fixed
- `global.css`: raw `<button>`, `<input>`, `<select>`, `<textarea>` elements inside `[data-achery-root]` now inherit `color` and `font-family` from the theme root, overriding the browser UA `ButtonText` system colour that previously caused raw buttons to show dark text in dark mode

---

## [0.5.1] - 2026-05-26

### Added
- `ThemeMode`: extended to `'light' | 'dark' | 'system'`; added `ResolvedTheme = 'light' | 'dark'` for the applied value
- `AcheryProvider`: persists colour-mode preference to `localStorage` under `'achery-theme-mode'`; restores it on mount; defaults to `'system'`; subscribes to `prefers-color-scheme` changes when mode is `'system'`
- `ThemeContextValue`: added `mode` (the user preference) alongside `theme` (the resolved DOM value); `setTheme` now accepts `'system'`

### Fixed
- ProgressBar: track background changed from `border` (#1f1d18, near-black) to `borderMute` (#b8ad94, warm light-grey); neutral fill changed from `fg2` to `fg` — bar is now clearly visible against the light background
- Sidebar: `navItem` link styles now correctly override the global `[data-achery-root] a` rule; nav links no longer show the accent-colour underline

---

## [0.5.0] - 2026-05-25

### Added
- `LetterStamp`: hard-edge square stamp displaying a single letter or glyph; 6 tone variants (`moss`, `rust`, `ochre`, `plum`, `copper`, `neutral`), 5 sizes (14–48px)
- `EntityPill`: compact entity identifier pill — `LetterStamp` + label; renders as `<button>`, `<a>`, or `<span>` depending on `onClick`/`href`; 2 sizes, 6 tones
- `Sparkline`: pure SVG inline sparkline, SSR-safe, no dependencies; `positive`/`negative`/`neutral` tone colours
- `KpiTile`: KPI summary tile — eyebrow label, large value, optional `<Badge>` delta, optional `<Sparkline>`; clickable variant renders as `<button>`
- `StatePill`: subscription state indicator wrapping `<Badge>`; states: `stable`, `drift-up`, `drift-down`, `new-price`, `renewing`
- `TypeTag`: monospace transaction type tag; types: `basic`, `internal`, `exceptional`, `fee`; colour-coded borders and backgrounds
- `Avatar`: circular initials avatar extracted from `AppBar`; props: `initials`, `size` (`sm`/`md`/`lg` = 24/32/40px), `tone` (`moss`/`neutral`)
- `SingleCombobox`: single-select variant of `Combobox` — value shown directly in input (no chips); `Backspace`/`Delete` when empty clears selection; `allowCustom` supported
- `AppBar`: `onMenuClick` prop — when provided, renders a hamburger glyph button at the leading edge for mobile sidebar toggling
- `AppBar`: `onSearch` prop — fires on Enter in the search field; `onSearchFocus` prop — fires when search input gains focus
- `Sidebar`: `mobileOpen` / `onMobileOpenChange` props — fixed-position overlay mode for mobile; backdrop rendered via portal, click to close
- `Sidebar`: `countTone?: 'accent' | 'neutral'` on `NavItemDef` — `'accent'` renders the count badge in the accent colour
- `Modal`: `size` prop (`'sm'` = 400px, `'md'` = 560px, `'lg'` = 760px); `scrollable` prop — body area becomes `overflow-y: auto` with `max-height: 70vh`
- `DatePicker`: `type` prop — `'date'` (default) or `'datetime-local'` for ISO datetime-local inputs
- `Table`: `toolbar` slot — rendered above the table with a bottom border; `emptyState` slot — shown when `data` is empty; pagination via `pageIndex`, `pageSize`, `totalRows`, `onPageChange`

### Changed
- `AppBar`: avatar circle extracted to standalone `<Avatar>` component; AppBar internally renders `<Avatar initials={avatarInitials} size="sm" />`

---

## [0.4.0] - 2026-05-21

### Fixed
- Imports migrated from .js to extensionless for better imports
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

[Unreleased]: https://github.com/fwestling/achery-workshop/compare/v0.5.3...HEAD
[0.5.3]: https://github.com/fwestling/achery-workshop/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/fwestling/achery-workshop/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/fwestling/achery-workshop/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.5.0
[0.4.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.4.0
[0.3.2]: https://github.com/fwestling/achery-workshop/releases/tag/v0.3.2
[0.3.1]: https://github.com/fwestling/achery-workshop/releases/tag/v0.3.1
[0.3.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.3.0
[0.2.1]: https://github.com/fwestling/achery-workshop/releases/tag/v0.2.1
[0.2.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.2.0
[0.1.0]: https://github.com/fwestling/achery-workshop/releases/tag/v0.1.0

<!-- When promoting Unreleased → versioned, update the Unreleased link to compare/vNEW...HEAD
     and add a new link: [NEW]: .../releases/tag/vNEW -->
