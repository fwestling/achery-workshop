# Changelog

All notable changes to `achery-ui` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.6.1] - 2026-05-28

### Fixed
- `Table`: row `onClick` now ignores clicks that originate from within an interactive element (`a`, `button`, `input`, `select`, `textarea`, or any element with `role="checkbox"` or `role="button"`). Previously, clicking a chip, action button, or checkbox inside a cell would fire both the cell's own handler and the row navigation.

---

## [0.6.0] - 2026-05-28

### Added
- `Skeleton`: new component — animated shimmer placeholder for loading states. Supports `lines` (stacked text lines), `width` (single value or per-line array), `block` (tall rectangular placeholder), `height` (block height override), and `style` (inline escape hatch for shape overrides like circular avatars). Exported from the package root.
- `Table`: `loading` prop — when true, renders skeleton placeholder rows in the tbody while keeping the header, toolbar, and pagination controls live. Row count defaults to `pageSize` (or 10). Skeleton widths vary per row for a natural appearance.
- `KpiTile`: `loading` prop — when true, renders skeleton lines in place of the value and delta while keeping the card shell in place to prevent layout shift.
- `Avatar`: `loading` prop — when true, renders a circular skeleton at the correct size for the given `size` variant.
- `ProgressBar`: `loading` prop — when true, renders a skeleton track at the correct height for the given `size` variant.
- `Button`: `loading` prop — when true, replaces the button content with a spinning `spinner` glyph and a `loadingLabel` (default `'Loading…'`), and disables the button to prevent double-submission. Layout does not shift.
- `Input`, `Textarea`, `Select`: `status` prop (`'idle' | 'saving' | 'saved' | 'error'`) — when set to anything other than `'idle'`, renders a small trailing icon: spinning `spinner` glyph for `'saving'`, accent-coloured `tick` for `'saved'`, danger-coloured `cross` for `'error'`. Intended for auto-save feedback on blur. `InputStatus` type exported from the package root.
- `Checkbox`, `Toggle`: `status` prop (same `InputStatus` type) — renders the same status icon inline after the label. Useful for controls that immediately persist their state.
- `DatePicker`: `status` prop (same `InputStatus` type) — trailing icon in the same position as `Input`.
- `Glyph`: new `spinner` glyph — 3/4-arc circle; designed to read clearly when spinning. Available as `'spinner'` in `GlyphName`.
- Stories: `Loading` and `LoadingCustomLabel` stories added for `Button`; `Loading` stories added for `Table`, `KpiTile`, `Avatar`, `ProgressBar`, and `Skeleton`; `SaveStatus` stories added for `Input`, `Checkbox`, `Toggle`, and `DatePicker`.

---

## [0.5.9] - 2026-05-28

### Added
- `Table`: `height` prop — when set, the wrapper becomes a fixed-height flex column; toolbar and pagination stay in place and only the body scrolls
- `Table`: `thead` is now `position: sticky; top: 0` so the header remains visible during body scroll (harmless no-op when no scroll container is present)
- `Table`: `FixedHeight` and `FixedHeightWithPagination` stories

---

## [0.5.8] - 2026-05-28

### Added
- `Table`: first/last page buttons (`«`/`»`) and single-step prev/next (`‹`/`›`) alongside the existing page number window
- `Table`: clickable page number window — always shows page 1 and last, current ± `paginationWindow` pages, with `…` ellipsis for gaps
- `Table`: `paginationWindow` prop (default `2`) — controls how many pages either side of the current page appear in the number window
- `Table`: `pageSizeOptions` prop — when provided, renders a rows-per-page selector on the left of the pagination bar
- `Table`: `onPageSizeChange` prop — called when the user picks a new page size; caller is responsible for resetting `pageIndex` to `0`
- `Table`: `WithPaginationWindow` and `WithPageSizeSelector` stories for verifying pagination controls

---

## [0.5.7] - 2026-05-28

### Fixed
- `Table`: horizontal overflow now scrolls correctly — only the `<table>` element is wrapped in the scroll container; toolbar and pagination sit outside it, so they never stretch wider than the component boundary
- `Table`: when `pageSize` is set, the scroll area reserves a stable `minHeight` (`37px` thead + `pageSize × 38px` per row), preventing the pagination controls from jumping when navigating to a partial last page
- `Table`: removed the `&:last-child { borderBottom: none }` row rule; the scroll container now carries the bottom border, so the table edge is consistent on both full and partial pages

### Added
- `Table`: `WideOverflow` story — resizable 600px container with a 10-column wide table for verifying horizontal scroll behaviour

---

## [0.5.6] - 2026-05-27

### Fixed
- `Sidebar`: mobile search field and footer now wrapped in a shared `bottomSlot` container with `marginTop: auto`, so both sit together at the bottom of the sidebar regardless of which combination is present

---

## [0.5.5] - 2026-05-27

### Added
- `AppBar` + `Sidebar`: automatic mobile search mirroring — when `AppBar` renders with `showSearch={true}`, it publishes its search config into a shared `AppBarSearchContext` (provided by `AcheryProvider`); `Sidebar` reads this and renders a matching search field above the footer, visible only on mobile (below 768px). Zero consumer changes required.

### Fixed
- `AppBar`: when `showSearch={false}`, actions were left-aligned instead of trailing — the search area now always renders as a flex-grow spacer; its contents are conditionally omitted

---

## [0.5.4] - 2026-05-27

### Changed
- `AppBar`: responsive layout — below 768px, the search field, `brandSub`, and all action slots except the avatar are hidden via CSS media query; no JS or prop changes required by consumers

### Documentation
- `AppBar.actions`: added note that the slot is CSS-hidden on mobile and cross-references the `Sidebar.footer` pattern for keeping actions accessible in the mobile overlay
- `Sidebar.footer`: expanded TSDoc to document the responsive action pattern — pass the same node to both `AppBar.actions` (desktop) and `Sidebar.footer` (mobile overlay); includes a code example

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

[Unreleased]: https://github.com/fwestling/achery-workshop/compare/v0.6.1...HEAD
[0.6.1]: https://github.com/fwestling/achery-workshop/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/fwestling/achery-workshop/compare/v0.5.9...v0.6.0
[0.5.9]: https://github.com/fwestling/achery-workshop/compare/v0.5.8...v0.5.9
[0.5.8]: https://github.com/fwestling/achery-workshop/compare/v0.5.7...v0.5.8
[0.5.7]: https://github.com/fwestling/achery-workshop/compare/v0.5.6...v0.5.7
[0.5.6]: https://github.com/fwestling/achery-workshop/compare/v0.5.5...v0.5.6
[0.5.5]: https://github.com/fwestling/achery-workshop/compare/v0.5.4...v0.5.5
[0.5.4]: https://github.com/fwestling/achery-workshop/compare/v0.5.3...v0.5.4
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
