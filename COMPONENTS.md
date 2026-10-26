# achery-ui — Component Inventory

Use this as context when analysing other projects for migration opportunities.

**Install:** `pnpm add achery-ui` · **CSS:** `import 'achery-ui/style.css'` · **Requires:** React 19+

---

## Theme

```tsx
import { AcheryProvider, useTheme } from 'achery-ui'

<AcheryProvider defaultTheme="light" defaultAccent="terracotta">
  {/* app */}
</AcheryProvider>

const { theme, toggleTheme, accent, setAccent } = useTheme()
```

`defaultTheme`: `'light' | 'dark' | 'system'`  
`defaultAccent`: `'terracotta' | 'moss' | 'plum' | 'ochre' | 'rust' | 'copper' | 'slate' | 'woad' | 'verdigris' | 'mauve' | 'amber' | 'fern' | 'blush' | 'olive'` (`olive` is a legacy alias of `moss`)  
`defaultDial`: `'underline' | 'chrome' | 'surface'` — how loudly the accent runs (default `'chrome'`)  
`defaultMaterial`: `'none' | 'leather' | 'wood' | 'copper'` — hero material signature for contained objects  
`defaultSurfaceOrigin`: `'web-first' | 'native-first' | 'parity' | 'native-only'` — adaptation ladder direction (default `'web-first'`)

---

## Components

### AppBar
Top-of-page bar with brand, search, theme/accent controls, avatar, custom actions.

```tsx
<AppBar
  brandName="My App"           // string
  brandSub="subtitle"          // string
  brandLogo={<img … />}        // ReactNode — replaces the default hex mark (~20×20)
  showSearch                   // boolean (default true)
  searchPlaceholder="…"        // string
  isDark={theme === 'dark'}    // boolean
  onToggleTheme={toggleTheme}  // () => void — shows toggle if present
  accent={accent}              // AccentColor — shows picker if present
  onAccentChange={setAccent}   // (AccentColor) => void
  avatarInitials="AB"          // string — shows <Avatar> at trailing edge
  onNewClick={() => {}}        // () => void — shows "New" button if present
  actions={<Node />}           // ReactNode — custom slot
  onMenuClick={() => {}}       // () => void — shows hamburger at leading edge
  onSearch={(q) => {}}         // (query: string) => void — fires on Enter in search
  onSearchFocus={() => {}}     // () => void — fires when search input focuses
/>
```

---

### Badge
Inline label for status, category, or metadata.

```tsx
<Badge
  tone="saved"      // 'saved' | 'drafting' | 'stopped' | 'archived' | 'neutral' (default)
                    // | 'success' | 'warn' | 'danger' | 'info'
  variant="outline" // 'outline' (default) | 'solid' | 'pill'
  dot               // boolean — status dot
>
  Published
</Badge>
```

The tone is carried by the border and dot; the label is `fg2`, so it reads at 4.5:1 or better on any ground in either theme (no tone colour does as 10px text everywhere). A solid badge fills with the tone and sets its label in a colour chosen per theme to pass on it. The colours come from `badgeTones` in `achery-ui/tokens`, shared with the native Badge and StatusDot.

---

### Button
Primary interactive element.

```tsx
<Button
  variant="primary"   // 'primary' | 'secondary' (default) | 'accent' | 'ghost' | 'danger'
  size="md"           // 'sm' | 'md' (default) | 'lg'
  glyph="book"        // GlyphName — optional icon
  glyphPosition="start" // 'start' (default) | 'end'
  kbd="⌘S"           // string — keyboard shortcut hint (display only)
  onClick={…}
>
  Save
</Button>

// secondary is the outline button: its border takes the accent under the chrome and surface dials
// href renders an <a> styled as a button — use for navigation
<Button variant="accent" size="lg" href="/signup">Start a list</Button>

// Style another element (e.g. a router Link) as a button
<Link to="/lists" className={buttonClassName({ variant: 'accent', size: 'md' })}>My lists</Link>
```

---

### Card
Container surface for grouping content.

```tsx
<Card
  variant="stamp"    // 'flat' (default) | 'stamp' (hard shadow)
  padding="md"       // 'none' | 'sm' | 'md' (default) | 'lg'
  header={<Node />}  // ReactNode — rendered above content with border
  marginalia="fern"  // GlyphName — decorative corner glyph
  marginaliaSize={80}// number px (default 80)
>
  content
</Card>
```

---

### Eyebrow
Uppercase section label with optional count.

```tsx
<Eyebrow count={12} after={<Node />}>Recipes</Eyebrow>
```

Under the `chrome` and `surface` dials, a short accent rule sits before the label; under `underline`, it doesn't. The label itself is always `fg2`.

---

### Form inputs
Layout wrapper + four input primitives. Compose `Field` with any input child.

```tsx
import { Field, Input, Textarea, Select, SearchInput } from 'achery-ui'

<Field label="Name" hint="e.g. Iron-Gall" error="Required">
  <Input value={…} onChange={…} error={!!error} />
</Field>

<Field label="Notes">
  <Textarea rows={4} error={false} />
</Field>

<Field label="Status">
  <Select value={…} onChange={…}>
    <option value="a">A</option>
  </Select>
</Field>

<SearchInput placeholder="Search…" value={…} onChange={…} />
```

A `Field`'s label names the control inside it and its hint/error describes it — automatic for
`Input`, `Textarea`, `Select` and `TagInput`. A control given its own `id` keeps it, and the label
points at that id. A custom control spreads `useFieldControl()`:

```tsx
const MyControl = () => <input {...useFieldControl()} />
<Field label="Colour" hint="Hex"><MyControl /></Field>
```

---

### TagInput
Chips-in-input for a list of short string tags. Web counterpart of the native `TagInput`.
Enter to add, Backspace or × to remove; autocompletes from `suggestions`. Chips use the
active accent.

```tsx
import { TagInput } from 'achery-ui'

const [tags, setTags] = useState<string[]>(['fiction', 'draft'])

<TagInput
  value={tags}
  onChange={setTags}
  suggestions={['fiction', 'fantasy', 'draft']}
  placeholder="Add a tag…"
/>
```

| Prop | Type | Notes |
|---|---|---|
| `value` | `string[]` | Selected tags (controlled) |
| `onChange` | `(tags: string[]) => void` | |
| `suggestions` | `string[]` | Optional autocomplete list |
| `normalize` | `(raw: string) => string` | Default: lowercase + trim + collapse whitespace |
| `placeholder` | `string` | Shown when empty |
| `disabled` | `boolean` | |

---

### Glyph
Single SVG icon from the 397-glyph set. Inherits `currentColor`.

```tsx
<Glyph
  name="fern"   // GlyphName (required)
  size={16}     // number px (default 16)
  title="Fern"  // string — accessible label; omit for decorative
/>
```

**GlyphName values** — browse and search them all at [workshop.achery.dev/glyphs](https://workshop.achery.dev/glyphs). In code: `GlyphCategories` (by category, the set `GlyphPicker` offers), `searchGlyphs(query, names)` and `glyphLabel(name)`.

**Renamed glyphs** — `mark` and `wordmark` are deprecated names for `hex-arrow` and `hex-arrow-lockup`. They still render, but neither drawing is the Achery logo. `RenamedGlyphs` maps old names to new; `currentGlyphName(name)` follows it (use it to migrate stored glyph names).

**Unknown names** render an empty box of the requested size rather than throwing.

---

### Marginalia
Decorative botanical/alchemical glyph for corner ornamentation. `aria-hidden`, positioned absolutely — parent needs `position: relative`.

```tsx
<Marginalia
  glyph="fern"   // GlyphName (default 'fern')
  size={120}     // number px (default 120)
  opacity={0.4}  // number 0–1 (default 0.4)
  accent         // boolean — use accent colour
/>
```

---

### Modal
Accessible dialog, portaled to `document.body`.

```tsx
<Modal
  open={open}                    // boolean — controlled
  onOpenChange={setOpen}         // (boolean) => void
  title="Edit Recipe"            // ReactNode
  description="…"               // ReactNode
  footer={<><Button>Cancel</Button><Button variant="accent">Save</Button></>}
  trigger={<Button>Open</Button>}// ReactNode — alternative to controlled open
  size="md"                      // 'sm' (400px, default) | 'md' (560px) | 'lg' (760px)
  scrollable                     // boolean — body overflow-y: auto, max-height: 70vh
  aria-describedby={messageId}   // string — id of body text that describes it, when there's no `description`
>
  {/* body content */}
</Modal>
```

---

### Sidebar
Vertical navigation with labelled groups.

```tsx
import { Sidebar, type NavGroupDef } from 'achery-ui'

const groups: NavGroupDef[] = [
  {
    label: 'Library',
    items: [
      { id: '/recipes', label: 'All Recipes', glyph: 'scroll', count: 8 },
      { id: '/archive', label: 'Archived',    href: '/archive' },
    ],
  },
]

<Sidebar
  groups={groups}
  activeId={currentPath}           // string
  onItemClick={id => navigate(id)}
  footer={<Node />}
  collapsed={isCollapsed}          // boolean — icon-only mode (52px)
  onCollapsedChange={setCollapsed} // (boolean) => void — shows the collapse toggle (desktop mode only)
  mobileOpen={menuOpen}            // boolean — passing it (even false) switches to fixed overlay mode
  onMobileOpenChange={setMenuOpen} // (boolean) => void — backdrop click and Escape fire this
/>
```

Items render as `<a>` when `href` is set, otherwise `<button>`.

**Overlay mode** (`mobileOpen` passed): pass it only on narrow viewports, with `useIsDesktop()` (see Hooks).
While open, Escape closes it, focus moves to the active item, and focus returns where it was (usually the
menu button) on close. While closed the panel is `inert`, so its links are out of the tab order.
`mobileBreakpoint` is deprecated and has no effect.

`NavItemDef` props: `id`, `label`, `glyph?`, `icon?`, `iconColor?`, `href?`, `count?`, `countTone?: 'accent' | 'neutral'`  
`countTone='accent'` renders the count badge in the current accent colour.  
`icon` — a custom leading `ReactNode` (monogram, avatar, bespoke mark) rendered in place of `glyph`; takes precedence over it. Keep it ~14–18px square.  
`iconColor` — tints the leading `glyph` via `currentColor` (any CSS colour). Ignored when a custom `icon` is supplied — colour that yourself.

---

### Table
Data table with sortable columns and row selection.

```tsx
import { Table, type ColumnDef } from 'achery-ui'

const columns: ColumnDef<Row>[] = [
  { key: 'name',  label: 'Name',  sortable: true },
  { key: 'qty',   label: 'Qty',   mono: true, width: '80px' },
  { key: 'badge', label: 'Status', render: row => <Badge>{row.status}</Badge> },
]

<Table
  columns={columns}
  data={rows}
  rowKey={r => r.id}
  selectedKeys={selected}          // string[] — controlled selection
  onRowClick={(key, row) => {}}    // row click handler
  defaultSortKey="name"            // uncontrolled initial sort
  defaultSortDir="asc"             // 'asc' | 'desc' | null — uncontrolled initial direction
  sortKey={sortKey}                // controlled sort column
  sortDir={sortDir}                // 'asc' | 'desc' | null
  onSortChange={(key, dir) => {}}
  toolbar={<SearchInput … />}      // ReactNode — rendered above table with bottom border
  emptyState={<span>No rows.</span>} // ReactNode — shown when data is empty
  pageIndex={page}                 // number (0-based) — enables pagination row
  pageSize={25}                    // number — rows per page
  totalRows={total}                // number — total across all pages
  onPageChange={setPage}           // (page: number) => void
/>
```

---

### Tabs
Accessible tab navigation, built on Radix Tabs.

```tsx
import { Tabs, type TabItem } from 'achery-ui'

const items: TabItem[] = [
  { value: 'overview',     label: 'Overview',     content: <Overview /> },
  { value: 'ingredients',  label: 'Ingredients',  content: <Ingredients />, disabled: false },
]

<Tabs
  items={items}
  defaultValue="overview"      // uncontrolled
  value={tab}                  // controlled
  onValueChange={setTab}
/>
```

Also exports `TabsPrimitive` (raw Radix) for custom layouts.

---

### Toast
Imperative notification system, portaled to `document.body`.

```tsx
// Wrap tree once (inside AcheryProvider)
import { ToastProvider, useToast } from 'achery-ui'
<ToastProvider>{children}</ToastProvider>

// Anywhere in the tree
const { toast } = useToast()
toast({ title: 'Saved.' })
toast({ title: 'Error', description: 'Detail', duration: 0, action: <Button>Retry</Button> })
```

`duration: 0` keeps the toast on screen until dismissed.

---

### Toggle
Binary on/off switch.

```tsx
<Toggle
  pressed={isDark}              // boolean — controlled
  onPressedChange={toggleTheme} // (boolean) => void
  label="Dark mode"             // ReactNode — visible label; also names the switch (aria-labelledby)
  aria-label="Toggle dark mode" // required if no visible label; overrides `label` as the name
  disabled={false}
/>
```

---

### Tooltip
Contextual label on hover/focus, portaled to avoid clipping.

```tsx
<Tooltip
  content="Archive this recipe" // ReactNode
  side="top"                    // 'top' (default) | 'right' | 'bottom' | 'left'
  delayDuration={400}           // ms (default 400)
>
  <Button>…</Button>  {/* must be a focusable element */}
</Tooltip>
```

---

### Typography
Four typographic components.

```tsx
import { Display, Heading, Body, Mono } from 'achery-ui'

<Display as="h1">Pull quote</Display>           // display serif, polymorphic

<Heading level={2}>Section title</Heading>       // h1–h5, level 1 default

<Body variant="lead">Intro paragraph</Body>      // 'base'(14px) | 'lead'(16px) | 'small'(12px)

<Mono variant="small" as="code">0x1F4A9</Mono>  // 'base'(12px) | 'small'(11px), polymorphic
```

---

## Tokens (React Native safe)

```tsx
import { palette, spacing, fontFamilies, fontSizes, shadows, radius,
         duration, easing, accentColors, lightTokens, darkTokens, chartColors, badgeTones } from 'achery-ui/tokens'
```

Zero DOM, zero React — safe for React Native or any non-browser context.

`chartColors.light` / `chartColors.dark` hold the chart palette (also on the web theme as `vars.chart.series1…6` and `vars.chart.ordinal1…5`):

- `series` — six categorical colours: achery's hues stepped up to chart chroma, in a fixed order. They're validated for colour-blind separation of adjacent slots and for 3:1 contrast against each mode's surface.
- `ordinal` — a five-step slate ramp. It runs light→dark in light mode and dark→light in dark mode, so "more" always stands out.

Text never wears these colours.

`badgeTones.light` / `badgeTones.dark` hold each Badge tone's `edge` (border and dot), `fill` and `onFill` (a solid badge's background and label).

---

## Checkbox

```tsx
import { Checkbox } from 'achery-ui'

<Checkbox label="Accept terms" />
<Checkbox checked={done} onChange={setDone} label="Mark done" />
<Checkbox checked="indeterminate" onChange={handleAll} label="Select all" />
<Checkbox checked disabled label="Locked" />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `checked` | `boolean \| 'indeterminate'` | — | Controlled state |
| `defaultChecked` | `boolean \| 'indeterminate'` | — | Uncontrolled initial state |
| `onChange` | `(v: boolean \| 'indeterminate') => void` | — | |
| `disabled` | `boolean` | — | |
| `label` | `ReactNode` | — | Rendered as associated `<label>` |
| `aria-label` | `string` | — | Use when no visible label |
| `id` | `string` | auto | Auto-generated when `label` is set |
| `className` | `string` | — | |

A ticked box fills with the accent under the `chrome` and `surface` dials, and with ink under `underline`.

---

## Menu

```tsx
import { Menu } from 'achery-ui'
import type { MenuItemDef, MenuSeparator } from 'achery-ui'

<Menu
  trigger={<Button variant="ghost" size="sm">•••</Button>}
  items={[
    { id: 'edit', label: 'Edit', glyph: 'key', onSelect: () => {} },
    { type: 'separator', id: 'sep1' },
    { id: 'delete', label: 'Delete', danger: true, onSelect: () => {} },
  ]}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `trigger` | `ReactNode` | — | Rendered as Radix `asChild` trigger |
| `items` | `(MenuItemDef \| MenuSeparator)[]` | — | |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred open side |
| `align` | `'start' \| 'center' \| 'end'` | `'end'` | Alignment to trigger |
| `className` | `string` | — | Applied to content panel |

**`MenuItemDef`:** `id`, `label`, `onSelect`, `glyph?`, `disabled?`, `danger?`

**`MenuSeparator`:** `{ type: 'separator', id }`

Renders into a portal — safe inside overflow-hidden containers.

---

## DatePicker

```tsx
import { DatePicker } from 'achery-ui'

<DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
<DatePicker value={date} min="2026-01-01" max="2026-12-31" onChange={...} />

// With Field wrapper
<Field label="Scheduled date">
  <DatePicker value={date} onChange={...} error={!!errors.date} />
</Field>
```

```tsx
// datetime-local
<DatePicker type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `'date' \| 'datetime-local'` | `'date'` | Input type |
| `value` | `string` | — | ISO date (`YYYY-MM-DD`) or datetime (`YYYY-MM-DDTHH:mm`) |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | |
| `min` | `string` | — | ISO date/datetime string |
| `max` | `string` | — | ISO date/datetime string |
| `disabled` | `boolean` | — | |
| `error` | `boolean` | — | Applies danger border |
| `placeholder` | `string` | — | |

Extends all native `<input>` attributes (except `type`).

---

## Combobox

```tsx
import { Combobox } from 'achery-ui'

// Fixed options
<Combobox
  value={tags}
  onChange={setTags}
  options={['computer', 'outside', 'quick-win']}
  placeholder="Add tags…"
/>

// Free-text + suggestions
<Combobox
  value={contextTags}
  onChange={setContextTags}
  options={knownTags}
  allowCustom
  placeholder="Add context tags…"
/>

// With Field wrapper
<Field label="Context">
  <Combobox value={selected} onChange={setSelected} options={opts} allowCustom />
</Field>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string[]` | — | Controlled selected values |
| `onChange` | `(v: string[]) => void` | — | |
| `options` | `string[]` | `[]` | Suggested values shown in dropdown |
| `allowCustom` | `boolean` | `false` | Let user type values not in `options` |
| `placeholder` | `string` | — | Shown when no values selected |
| `disabled` | `boolean` | — | |
| `error` | `boolean` | — | Applies danger border |
| `className` | `string` | — | |

**Keyboard:** ↑↓ navigate options, Enter/comma confirm, Backspace removes last chip, Escape closes.

---

## SingleCombobox

Single-select variant of `Combobox`. Selected value is shown directly in the input (no chips). Backspace/Delete when empty clears the selection.

```tsx
import { SingleCombobox } from 'achery-ui'

<SingleCombobox
  value={category}
  onChange={setCategory}
  options={['Subscriptions', 'Utilities', 'Groceries']}
  placeholder="Select a category…"
/>

// Free-text allowed
<SingleCombobox value={val} onChange={setVal} options={opts} allowCustom />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string \| null` | — | Controlled selected value |
| `onChange` | `(v: string \| null) => void` | — | |
| `options` | `string[]` | `[]` | Suggested values |
| `allowCustom` | `boolean` | `false` | Accept typed values not in options |
| `placeholder` | `string` | — | |
| `disabled` | `boolean` | — | |
| `error` | `boolean` | — | Applies danger border |
| `className` | `string` | — | |

**Keyboard:** ↑↓ navigate, Enter selects, Backspace/Delete clears, Escape closes.

---

## Avatar

Circular initials avatar.

```tsx
import { Avatar } from 'achery-ui'

<Avatar initials="FW" />
<Avatar initials="FW" size="lg" tone="moss" />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `initials` | `string` | — | Up to 2 chars, uppercased automatically |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 24 / 32 / 40 px |
| `tone` | `'moss' \| 'neutral'` | `'neutral'` | `neutral` = bg2 fill; `moss` = green fill |
| `className` | `string` | — | |

---

## LetterStamp

Hard-edged square stamp displaying a single letter or glyph. Used inside `EntityPill`.

```tsx
import { LetterStamp } from 'achery-ui'

<LetterStamp letter="A" tone="moss" size={28} />
<LetterStamp glyph="flask" tone="rust" size={36} />
<LetterStamp letter="X" colour="#2a5c8a" size={28} />  // hex escape hatch
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `letter` | `string` | — | Single char, uppercased. Mutually exclusive with `glyph` |
| `glyph` | `GlyphName` | — | Glyph rendered centred. Mutually exclusive with `letter` |
| `size` | `14 \| 20 \| 28 \| 36 \| 48` | `28` | Stamp dimension in px |
| `tone` | `'moss' \| 'rust' \| 'ochre' \| 'plum' \| 'copper' \| 'neutral'` | `'neutral'` | Fill colour pair |
| `colour` | `string` | — | Raw hex — overrides `tone` background |
| `className` | `string` | — | |

---

## EntityPill

Compact entity identifier — `LetterStamp` + label. Renders as `<button>`, `<a>`, or `<span>`.

```tsx
import { EntityPill } from 'achery-ui'

<EntityPill label="Acme Corp" letter="A" tone="moss" />
<EntityPill label="Open" glyph="flask" tone="rust" href="/entities/1" />
<EntityPill label="Click me" letter="C" tone="ochre" onClick={handleClick} />
<EntityPill label="Small" letter="S" tone="neutral" size="sm" />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Visible text |
| `letter` | `string` | — | Single char for stamp. Mutually exclusive with `glyph` |
| `glyph` | `GlyphName` | — | Glyph for stamp. Mutually exclusive with `letter` |
| `tone` | `'moss' \| 'rust' \| 'ochre' \| 'plum' \| 'copper' \| 'neutral'` | `'neutral'` | Stamp fill + border colour |
| `colour` | `string` | — | Hex escape hatch for stamp background |
| `size` | `'sm' \| 'md'` | `'md'` | `sm` = 22px height; `md` = 28px |
| `onClick` | `() => void` | — | Makes pill a `<button>` |
| `href` | `string` | — | Makes pill an `<a>` |
| `className` | `string` | — | |

---

## Sparkline

Inline SVG sparkline chart. Pure SVG, no dependencies, SSR-safe.

```tsx
import { Sparkline } from 'achery-ui'

<Sparkline data={[1, 3, 2, 5, 4, 6]} tone="positive" />
<Sparkline data={values} tone="negative" width={120} height={36} />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `data` | `number[]` | — | Data points. Fewer than 2 renders empty |
| `width` | `number` | `80` | SVG width in px |
| `height` | `number` | `28` | SVG height in px |
| `tone` | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` | Line colour: success / danger / accent |
| `className` | `string` | — | |

---

## BarChart

Bar and stacked-bar chart. HTML/CSS (no chart dependency), themed by the chart tokens, light and dark.

```tsx
import { BarChart } from 'achery-ui'

// Rows, an ordered series, each bar linking to the list it counts
<BarChart
  label="Entities by status"
  orientation="horizontal"
  scale="ordinal"
  series={['Stub', 'Draft', 'Complete']}
  data={[
    { label: 'NPCs', values: [12, 9, 4], href: '/w/npc?status=stub' },
    { label: 'Locations', values: [3, 8, 14], href: '/w/location' },
  ]}
/>

// Columns over time, one series
<BarChart label="Hours per day" series={['Hours']} data={days} formatValue={(v) => `${v}h`} />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Required. Names the chart for assistive technology and captions its table |
| `data` | `BarChartDatum[]` | — | `{ label, values: number[], href?, onSelect? }` — one value per series (missing, negative or not a number count as 0, everywhere); `href` makes the bar a link, `onSelect` a button |
| `series` | `string[]` | — | In a fixed order — colours follow it, so keep it stable as filters change. ≥ 2 stack, with a legend |
| `scale` | `'categorical' \| 'ordinal'` | `'categorical'` | Categorical for identity (≤ 6 series); ordinal for ordered series, one hue light→dark (≤ 5) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Columns with a value axis, or rows with labels at the left |
| `height` | `number` | `180` | Plot height (vertical) |
| `showValues` | `boolean` | horizontal: `true`, vertical: `false` | Each bar's total at its tip |
| `formatValue` | `(v: number) => string` | `formatCompact` | 1,284 · 12.9K · 4.2M |

- Bars are at most 24px thick, from one baseline, with a 4px rounded end; stacked segments are separated by a 2px gap.
- The axis tops out at a clean number. Ticks are whole when every value is, and fractional ticks show their own precision (0.25, not 0.3).
- Column labels are thinned to fit the measured width, never cropped.
- Hovering or focusing a bar shows every series' value.
- A visually hidden table carries the same numbers.
- More series than the palette holds throws: fold the rest into "Other".

`formatCompact(n, decimals = 1)` is exported too: 1,284 · 12.9K · 4.2M, rounding before it picks a unit (999,999 → 1M).

---

## KpiTile

KPI summary tile — eyebrow label, large value, optional delta badge, optional sparkline.

```tsx
import { KpiTile } from 'achery-ui'

<KpiTile
  label="Total Income"
  value="$4,200"
  delta="+$340 vs last month"
  deltaTone="positive"
  sparkData={[3200, 3500, 3800, 4200]}
  onClick={() => navigate('/income')}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Eyebrow text above value |
| `value` | `string` | — | Pre-formatted value string |
| `delta` | `string` | — | Delta label shown as a Badge |
| `deltaTone` | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` | Badge and Sparkline colour |
| `sparkData` | `number[]` | — | Passed to Sparkline |
| `onClick` | `() => void` | — | Makes tile a clickable `<button>` |
| `className` | `string` | — | |

---

## StatePill

Subscription state indicator wrapping `Badge`.

```tsx
import { StatePill } from 'achery-ui'
import type { SubscriptionState } from 'achery-ui'

<StatePill state="drift-up" />
<StatePill state="stable" />
```

| State | Badge tone | Label |
|-------|-----------|-------|
| `stable` | neutral | Stable |
| `drift-up` | stopped | Drift up |
| `drift-down` | saved | Drift down |
| `new-price` | drafting | New price |
| `renewing` | drafting | Renewing soon |

| Prop | Type | Default |
|---|---|---|
| `state` | `SubscriptionState` | — |
| `className` | `string` | — |

---

## TypeTag

Monospace transaction type tag with colour-coded border and background.

```tsx
import { TypeTag } from 'achery-ui'
import type { TransactionType } from 'achery-ui'

<TypeTag type="basic" />
<TypeTag type="exceptional" />
```

| Type | Text colour | Background |
|------|------------|-----------|
| `basic` | `fg3` | transparent |
| `internal` | `fg3` | transparent |
| `exceptional` | `danger` | danger at 8% |
| `fee` | `warn` | warn at 8% |

| Prop | Type | Default |
|---|---|---|
| `type` | `'basic' \| 'internal' \| 'exceptional' \| 'fee'` | — |
| `className` | `string` | — |

---

## DetailRail

Slide-in contextual detail panel. Appears from the right on desktop; slides up as a bottom sheet on mobile (≤640px). Useful for showing detail alongside a list or table without navigating away.

```tsx
import { DetailRail } from 'achery-ui'

<DetailRail
  open={!!selected}
  onClose={() => setSelected(null)}
  title="Transaction detail"
  eyebrow="Transaction"
  footer={<Button variant="primary" size="sm">Save</Button>}
>
  <Field label="Amount"><Input value={selected?.amount} /></Field>
</DetailRail>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `open` | `boolean` | — | required |
| `onClose` | `() => void` | — | required |
| `title` | `string` | — | required |
| `eyebrow` | `string` | — | Small label above title |
| `children` | `ReactNode` | — | Body content |
| `footer` | `ReactNode` | — | Sticky footer, typically action buttons |
| `width` | `number` | `360` | Desktop width in px |
| `className` | `string` | — | |

---

## ColourInput

Hex colour picker: a native `<input type="color">` swatch paired with a text field for direct hex entry. Normalises 3-digit shorthand (`#abc` → `#aabbcc`) on blur. Wrap in `Field` for a label.

```tsx
import { ColourInput, Field } from 'achery-ui'

<Field label="Category colour">
  <ColourInput value={colour} onChange={setColour} />
</Field>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | `'#000000'` | Hex colour string |
| `onChange` | `(value: string) => void` | — | |
| `error` | `boolean` | `false` | Applies danger border |
| `placeholder` | `string` | `'000000'` | Text field placeholder |
| `disabled` | `boolean` | `false` | |
| `className` | `string` | — | |

---

## SegmentedControl

Inline button group where exactly one option is active. Use for mutually exclusive view modes, filter toggles, or quick status selection.

```tsx
import { SegmentedControl } from 'achery-ui'

<SegmentedControl
  options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
  value={period}
  onChange={setPeriod}
/>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `options` | `SegmentOption[]` | — | `{ value: string; label: ReactNode }[]` |
| `value` | `string` | — | required |
| `onChange` | `(value: string) => void` | — | required |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `disabled` | `boolean` | `false` | |
| `className` | `string` | — | |

Also available as a native component via `achery-ui/native`.

---

## ConfirmDialog

Promise-based yes/no dialog. Mount `ConfirmDialogProvider` once, then `await confirm({...})` anywhere below it: `true` on confirm, `false` on cancel or dismiss. Built on `Modal`.

```tsx
import { ConfirmDialogProvider, useConfirm } from 'achery-ui'

<ConfirmDialogProvider>
  <App />
</ConfirmDialogProvider>

const confirm = useConfirm()
if (await confirm({ title: 'Delete task?', message: "This can't be undone.", confirmLabel: 'Delete', destructive: true })) {
  await deleteTask(id)
}
```

| Option | Type | Default | Notes |
|---|---|---|---|
| `message` | `ReactNode` | — | Required. The body text |
| `title` | `ReactNode` | — | |
| `confirmLabel` | `string` | `'Confirm'` | |
| `cancelLabel` | `string` | `'Cancel'` | |
| `confirmVariant` | `'accent' \| 'secondary' \| 'ghost'` | `'accent'` | Ignored when `destructive` |
| `destructive` | `boolean` | `false` | Confirm uses Button's `danger` variant |

The message describes the dialog (`aria-describedby`), so a screen reader announces it with the title when it opens. `useConfirm()` throws outside a `ConfirmDialogProvider`.

---

## GlyphPicker

A trigger button that opens a searchable popover of every glyph in `GlyphCategories`, grouped by category. Search uses `searchGlyphs`.

```tsx
import { GlyphPicker } from 'achery-ui'

<GlyphPicker value={glyph} onChange={setGlyph} />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `GlyphName` | — | `undefined` for none |
| `onChange` | `(name: GlyphName \| undefined) => void` | — | Picking the selected glyph again clears it |
| `placeholder` | `string` | `'Pick a glyph…'` | Also the trigger's accessible name when empty |
| `clearable` | `boolean` | `true` | Shows a clear button in the trigger when a value is set |
| `disabled` | `boolean` | — | |
| `className` | `string` | — | |

---

## MaterialCard

A contained surface wearing the project's material signature, for objects that *arrive*: dialogs, a featured card, a receipt. The working page stays paper and ink. The signature comes from `<AcheryProvider defaultMaterial="leather | wood | copper">`; `intensity` sets how loudly this object wears it.

```tsx
import { MaterialCard } from 'achery-ui'

<MaterialCard intensity="surface" header="Close the month" footer={<Button>Bind & archive</Button>}>
  <Body>Seal the ledger and file it to the archive.</Body>
</MaterialCard>
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `intensity` | `'chrome' \| 'surface' \| 'full'` | `'chrome'` | Spine and trim on paper · a material header band · the whole object (rare moments) |
| `header` | `ReactNode` | — | The bar at the top; a string becomes its title |
| `footer` | `ReactNode` | — | Below a rule; usually actions |
| `children` | `ReactNode` | — | |

Also accepts `div` attributes. Signatures and intensities side by side: [workshop.achery.dev/materials](https://workshop.achery.dev/materials).

---

## ProgressBar

A determinate bar from 0 to 100, with `role="progressbar"` and its value exposed.

```tsx
import { ProgressBar } from 'achery-ui'

<ProgressBar value={62} tone="accent" />
<ProgressBar value={0} loading />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `number` | — | Required. Clamped to 0–100 |
| `size` | `'sm' \| 'md'` | `'md'` | Track height |
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | Fill colour |
| `loading` | `boolean` | `false` | Renders a `Skeleton` the height of the track instead |
| `aria-label` | `string` | — | What is progressing ("Upload"). A progress bar needs a name: give it this… |
| `aria-labelledby` | `string` | — | …or the id of visible text that names it |
| `className` | `string` | — | |

---

## Skeleton

Placeholder for content that's loading: one or more lines, or a block. Hidden from assistive technology (`aria-hidden`), so announce loading some other way.

```tsx
import { Skeleton } from 'achery-ui'

<Skeleton lines={3} width={['100%', '90%', '60%']} />
<Skeleton block height="120px" />
<Skeleton width="32px" style={{ height: '32px', borderRadius: '50%' }} />
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `lines` | `number` | `1` | Stacked with a small gap |
| `width` | `string \| string[]` | `'100%'` | One width for every line, or one per line |
| `block` | `boolean` | `false` | A tall rectangle instead of lines |
| `height` | `string` | — | Block height; ignored without `block` |
| `style` | `CSSProperties` | — | Shape overrides |
| `className` | `string` | — | |

---

## React Native (`achery-ui/native`)

A subset of components available for React Native via `achery-ui/native`. Uses React Native's `StyleSheet` system and `SemanticTokens` directly — no vanilla-extract, no CSS.

Live examples of each, rendered through react-native-web: [workshop.achery.dev/native](https://workshop.achery.dev/native).

### Setup

```sh
# Required native peer deps
pnpm add react-native-svg
pnpm add -D react-native-svg-transformer
```

**`metro.config.js`** — add the transformer and force registry singletons:

```js
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')
const config = getDefaultConfig(__dirname)

// Singleton modules — must resolve from one location only.
// react-native's view config registry must be a singleton or native component
// registrations (e.g. RNSVGCircle) land in a different Map than the renderer uses.
const singletonDir = path.resolve(__dirname, 'node_modules')
const singletonModules = new Set([
  'react',
  'react-native',
  'react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry',
  'react-native/Libraries/NativeComponent/NativeComponentRegistry',
])
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (singletonModules.has(moduleName)) {
    return context.resolveRequest(
      { ...context, originModulePath: path.join(singletonDir, 'react-native', 'index.js') },
      moduleName, platform,
    )
  }
  return context.resolveRequest(context, moduleName, platform)
}

// SVG transformer — required for Glyph component
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
}
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
}
module.exports = config
```

**`.svgrrc`** (in your app root) — maps `currentColor` to the `color` prop:

```json
{ "replaceAttrValues": { "currentColor": "{props.color}" } }
```

### Accessibility

Interactive components announce a role and state to VoiceOver / TalkBack (buttons, tabs with `selected`, disabled states, a header for `ScreenNav`'s title), and icon-only controls inside the library carry their own names (Toast "Dismiss", TagInput "Remove <tag>" / "Add <tag>").

An icon-only `Button` has no visible text to read, so name it:

```tsx
<Button variant="ghost" size="sm" onPress={skip} accessibilityLabel="Skip">
  <Glyph name="close" size={12} />
</Button>
```

Native `Button` accessibility props:

| Prop | Type | Default |
|---|---|---|
| `accessibilityLabel` | `string` | — (read from text children) |
| `accessibilityHint` | `string` | — |
| `testID` | `string` | — |

A `Glyph` with an `accessibilityLabel` is announced as an image with that name; without one it is decorative. Label a glyph only when it carries meaning on its own — inside a labelled `Button`, the button's label is enough.

These also make components findable in tests by role and name (`getByRole('button', { name: 'Skip' })`).

### Available components

| Component | Notes |
|---|---|
| `NativeThemeProvider` / `useTheme` | Theme + accent + dial + material context. Three-way colour mode (`light`/`dark`/`system`) + opt-in persistence — see below. |
| `Text` | Display/heading/body/mono/eyebrow/caption variants |
| `Button` | primary/secondary/accent/ghost/danger variants. Announced as a button (with disabled state); `accessibilityLabel` is required when the content is only a glyph — see below. |
| `Card` | flat/stamp variants, optional header |
| `Badge` | tone-based (neutral/saved/drafting/stopped/archived), solid/outline. Same colours as the web Badge (`badgeTones`): the label is `fg2`, the tone on the border and dot |
| `Field` / `Input` | Label + hint + error wrapper + text input |
| `MaterialCard` / `MaterialEyebrow` | Leather/wood/copper material cards |
| `Glyph` | All 397 glyphs via react-native-svg-transformer. Requires setup above. |
| `GlyphPicker` | Modal sheet with search + 8-column grid |
| `Skeleton` | Animated opacity-pulse placeholder (lines or block) |
| `ProgressBar` | 0–100 value, sm/md, neutral/accent tone. Announced as a progress bar with its value; name it with `accessibilityLabel` |
| `Checkbox` | Controlled/uncontrolled, indeterminate, optional label |
| `Toggle` | Animated pill switch (`value`/`onChange` — note: differs from web's `pressed`/`onPressedChange`) |
| `Tabs` | Horizontal scrollable tab bar with active underline. Announced as tabs with their selected state. |
| `ToastProvider` / `useToast` | Absolute overlay toasts, auto-dismiss. Mount at nav root. |
| `Textarea` | Multi-line text input. `rows` prop controls min height. Wrap in `Field` for label. |
| `StatusDot` | Small filled dot for compact status indicators. Same `tone` palette as `Badge`. |
| `SegmentedControl` | Inline exclusive button group. `options` / `value` / `onChange`. Options are announced as tabs with their selected state; give a non-string `label` an `accessibilityLabel`. |
| `ScreenNav` | Navigation bar for modal push screens: back button (`backLabel` default `"Back"`) + centred title (truncates to one line) + optional action. |
| `Disclosure` | Collapsible section (rung 3 — disclosure ladder). Labelled toggle, 44px hit area, height animation. |
| `Modal` | Centred dialog — native counterpart of web `Modal`. Title/description/body/footer, scrollable body, `dismissible={false}` for questions that must be answered. |
| `ConfirmDialogProvider` / `useConfirm` | Promise-based yes/no dialog — same options as web `useConfirm`. Mount once inside `NativeThemeProvider`. |
| `BottomSheet` + `SheetRow` | Slide-up overlay (rung 5). 2px ink top-rule, tracing-paper scrim, square corners. `SheetRow` = 44px touch row with optional danger tint. |
| `AdaptivePanel` | Width-adaptive disclosure surface. A `BottomSheet` when narrow; a docked side column at ≥900pt, displacing content rather than covering it. Ships `useIsPanelDocked`. |
| `BottomTabBar` | Root navigation bar (promotion ladder). ≤4 primary tabs; overflow into a "More" `BottomSheet`. 2px accent top stripe on active tab. |
| `Marginalia` | Decorative corner glyph (RN counterpart to web `Marginalia`). `corner`/`inset`/`opacity`/`accent`. Non-interactive. |
| `TagInput` | Chips-in-input tag field with autocomplete. Comma/space/return confirm, Backspace removes last. `onLeather` variant for ghost-on-leather. |
| `BarChart` | Native counterpart of web `BarChart` — same props, but `onPress` per bar instead of `href`/`onSelect`. Tapping a bar shows its values beneath the chart; with `onPress`, long-press does. |
| `Sparkline` | Native counterpart of web `Sparkline` — same props, plus `accessibilityLabel` (without one it's decorative). Requires `react-native-svg`. |

### `NativeThemeProvider` / `useTheme` (native)

Mirrors the web `AcheryProvider` contract: a three-way colour-mode *preference*
(`light` / `dark` / `system`), an accent colour, and the dial/material
signatures. `'system'` follows the OS appearance live.

```tsx
import { NativeThemeProvider, useTheme } from 'achery-ui/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

<NativeThemeProvider defaultMode="system" defaultAccent="moss" storage={AsyncStorage}>
  <App />
</NativeThemeProvider>

// anywhere below
const { mode, setTheme, theme, dark, accent, setAccent } = useTheme()
setTheme('system')        // preference — may be 'system'
theme                     // resolved — always 'light' | 'dark'
```

**Persistence is opt-in.** React Native has no built-in synchronous key-value
store and achery-ui will not depend on one — pass any adapter with
`getItem`/`setItem` (`expo-secure-store`, AsyncStorage, MMKV…). Omit `storage`
and the provider is in-memory only, as before. Keys match the web provider's
(`achery-theme-mode`, `achery-accent`, `achery-dial`, `achery-material`).

Because native storage is async, stored values load *after* first paint: the
provider renders with the `default*` props, then swaps once loaded. A preference
the user changes before hydration completes is never clobbered. Read `hydrated`
to hold a splash screen and avoid a light→dark flash.

| Prop | Type | Default |
|---|---|---|
| `defaultMode` | `'light' \| 'dark' \| 'system'` | `'system'` |
| `defaultDark` | `boolean` | `false` — **deprecated**, use `defaultMode` |
| `defaultAccent` | `AccentColor` | `'terracotta'` |
| `defaultDial` | `AccentDial` | `'chrome'` |
| `defaultMaterial` | `MaterialSignature` | `'none'` |
| `defaultSurfaceOrigin` | `SurfaceOrigin` | `'native-only'` |
| `storage` | `ThemeStorage` | — (no persistence) |
| `fonts` | `NativeFonts` | — (platform font) |

**Brand fonts (opt-in).** Native text uses the platform font unless the app loads the fonts and maps them. React Native picks weights by family name, so map each weight you load:

```tsx
import { useFonts, RobotoSlab_700Bold, RobotoSlab_900Black } from '@expo-google-fonts/roboto-slab'
// …SpaceGrotesk_400Regular, _500Medium, _600SemiBold, _700Bold; JetBrainsMono_400Regular

<NativeThemeProvider
  fonts={{
    display: { bold: 'RobotoSlab_700Bold', black: 'RobotoSlab_900Black' },
    body: { regular: 'SpaceGrotesk_400Regular', medium: 'SpaceGrotesk_500Medium',
            semibold: 'SpaceGrotesk_600SemiBold', bold: 'SpaceGrotesk_700Bold' },
    mono: { regular: 'JetBrainsMono_400Regular' },
  }}
>
```

A role and weight left out falls back to the platform font at that weight. Every native component sets its text through `useTheme().font(role, weight)`, which custom components can use too.

**`useTheme()` returns:**

| Key | Type | Notes |
|---|---|---|
| `tokens` | `SemanticTokens` | Resolved colour tokens for the active mode + accent |
| `mode` | `ThemeMode` | The *preference* — may be `'system'` |
| `theme` | `'light' \| 'dark'` | The *resolved* mode actually rendered |
| `setTheme` | `(mode: ThemeMode) => void` | Persisted when `storage` is given |
| `dark` | `boolean` | `theme === 'dark'` |
| `toggle` | `() => void` | Flips to explicit light/dark (resolves `'system'` first) |
| `accent` / `setAccent` | `AccentColor` | Persisted |
| `dial` / `setDial` | `AccentDial` | Persisted |
| `material` / `setMaterial` | `MaterialSignature` | Persisted |
| `surfaceOrigin` | `SurfaceOrigin` | Set once on the provider |
| `hydrated` | `boolean` | False until storage has been read; always true without `storage` |
| `font` | `(role, weight?) => FontStyle` | `{ fontFamily }` from `fonts`, or `{ fontWeight }` for the platform font |

The dial is stored and exposed here, but native components don't change with it yet.

`dark` and `toggle` are unchanged from earlier versions — existing code keeps
working.

### `Glyph` (native)

```tsx
import { Glyph } from 'achery-ui/native'

<Glyph name="flask" size={24} />
<Glyph name="moon" color="#ff0000" size={20} />
```

| Prop | Type | Default |
|---|---|---|
| `name` | `GlyphName` | required |
| `size` | `number` | `24` |
| `color` | `string` | theme `fg` token |
| `accessibilityLabel` | `string` | — (decorative) |
| `style` | `ViewStyle` | — |

With `accessibilityLabel`, the glyph is wrapped in a `View` that carries the label (and `style`), announced as an image. Without it, the SVG renders on its own as before.

The `hex-arrow-lockup` glyph (formerly `wordmark`) is not available on native (uses unsupported SVG features).

### `Disclosure` (native)

Rung 3 of the disclosure ladder — secondary content folds behind a labelled toggle.

```tsx
import { Disclosure } from 'achery-ui/native'

<Disclosure label="Scratchpad">
  <Textarea placeholder="Half-baked thoughts…" />
</Disclosure>
```

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `children` | `ReactNode` | required |
| `defaultOpen` | `boolean` | `false` |
| `open` | `boolean` | — (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — |
| `contentPaddingHorizontal` | `number` | `16` |
| `style` | `ViewStyle` | — |

### `Modal` (native)

Centred dialog for questions and short forms. Square corners, 1.5px ink border, hard stamp shadow, tracing-paper scrim; fades and rises 8px in ≤220ms. The body scrolls when content outgrows the screen.

```tsx
import { Modal, Button } from 'achery-ui/native'

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Rename list"
  footer={
    <>
      <Button variant="ghost" size="sm" onPress={() => setOpen(false)}>Cancel</Button>
      <Button variant="accent" size="sm" onPress={save}>Save</Button>
    </>
  }
>
  <Field label="Name"><Input value={name} onChangeText={setName} /></Field>
</Modal>

// A question that must be answered: no scrim/back/✕ dismissal
<Modal open={!answered} dismissible={false} title="Share usage data?" footer={…}>
  Usage and crash reports help find bugs.
</Modal>
```

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | required |
| `onClose` | `() => void` | — (called on scrim tap, ✕, Android back) |
| `title` | `ReactNode` | — (strings render in the display face) |
| `description` | `ReactNode` | — |
| `children` | `ReactNode` | — (strings render as body text) |
| `footer` | `ReactNode` | — (right-aligned row with a top rule) |
| `dismissible` | `boolean` | `true` — `false` disables scrim, back button and ✕ |
| `showClose` | `boolean` | `true` (ignored when not dismissible) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` (400 / 560 / 760, capped to the screen) |
| `style` | `ViewStyle` | — |

Differs from web `Modal`: controlled only (`open` + `onClose` rather than `onOpenChange` / `trigger`), matching native `BottomSheet`.

### `ConfirmDialogProvider` / `useConfirm` (native)

Same options and hook as the web `ConfirmDialog`. `confirm()` resolves `true` on confirm, `false` on cancel, scrim tap or back.

```tsx
import { ConfirmDialogProvider, useConfirm } from 'achery-ui/native'

// Once, inside NativeThemeProvider
<ConfirmDialogProvider><App /></ConfirmDialogProvider>

const confirm = useConfirm()
const ok = await confirm({
  title: 'Delete task?',
  message: "This can't be undone.",
  confirmLabel: 'Delete',
  destructive: true,
})
```

| Option | Type | Default |
|---|---|---|
| `title` | `ReactNode` | — |
| `message` | `ReactNode` | required |
| `confirmLabel` | `string` | `'Confirm'` |
| `confirmVariant` | `'accent' \| 'secondary' \| 'ghost'` | `'accent'` (ignored when `destructive`) |
| `cancelLabel` | `string` | `'Cancel'` |
| `destructive` | `boolean` | `false` — confirm button uses the `danger` variant |

### `BottomSheet` + `SheetRow` (native)

Rung 5 — action clusters and short edits slide up from the bottom.

```tsx
import { BottomSheet, SheetRow } from 'achery-ui/native'

<BottomSheet open={open} onClose={() => setOpen(false)} title="Row actions">
  <SheetRow label="Edit" onPress={handleEdit} />
  <SheetRow label="Delete" onPress={handleDelete} danger />
</BottomSheet>
```

**`BottomSheet` props:**

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | — |
| `showClose` | `boolean` | `false` |
| `children` | `ReactNode` | required |
| `maxContentHeight` | `number` | — (grows with content) |
| `avoidKeyboard` | `boolean` | `true` — lifts the sheet above the keyboard when a field inside is focused (and shortens the scroll body to stay on-screen). Set `false` to manage avoidance yourself. |
| `style` | `ViewStyle` | — |

**`SheetRow` props:**

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `onPress` | `() => void` | required |
| `danger` | `boolean` | `false` |
| `accessory` | `ReactNode` | — |
| `disabled` | `boolean` | `false` |

### `AdaptivePanel` (native)

A disclosure surface that changes container with window width. Below the breakpoint it *is* a `BottomSheet`. At or above it, the panel docks as a bordered side column in normal layout flow — so it **displaces** sibling content instead of covering it, and the user can keep working with it open. Use for reference/properties/outline surfaces that are welcome to stay open on a tablet or a resized desktop window.

Because the docked form participates in layout, render it **inside a row-direction container**, next to the content it sits beside — not at the end of a screen the way a sheet can be. In sheet mode it renders into a `Modal`, so tree position is irrelevant.

```tsx
import { AdaptivePanel, useIsPanelDocked } from 'achery-ui/native'

const docked = useIsPanelDocked()

<View style={{ flex: 1, flexDirection: 'row' }}>
  <View style={{ flex: 1 }}>{editor}</View>
  <AdaptivePanel open={panel === 'reference'} onClose={close} title="Reference">
    {references}
  </AdaptivePanel>
</View>
```

**Props:**

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | — |
| `showClose` | `boolean` | `false` — docked mode always shows a close button regardless, since there is no scrim to tap |
| `children` | `ReactNode` | required |
| `width` | `number` | `340` — docked width in pt; ignored in sheet mode |
| `side` | `'left' \| 'right'` | `'right'` |
| `breakpoint` | `number` | `ADAPTIVE_PANEL_BREAKPOINT` (900) |
| `maxContentHeight` | `number` | — sheet mode only |
| `avoidKeyboard` | `boolean` | `true` — sheet mode only |
| `style` | `ViewStyle` | — |

**`useIsPanelDocked(breakpoint?)`** — returns whether the panel docks at the current width. Needed to pick the matching *trigger* affordance, which lives outside the panel: an overflow menu of rows when narrow, a row of toggle buttons when docked.

**`ADAPTIVE_PANEL_BREAKPOINT`** — `900`. Puts iPad landscape in the docked layout while leaving iPad portrait (834pt on an 11") as sheets, where there isn't room for content plus a panel.

### `BottomTabBar` (native)

Promotion-ladder replacement for the desk sidebar. ≤4 primary tabs visible; extras go into a "More" sheet.

```tsx
import { BottomTabBar } from 'achery-ui/native'
import type { BottomTabItem } from 'achery-ui/native'

const tabs: BottomTabItem[] = [
  { value: 'today',    label: 'Today',    glyph: 'calendar' },
  { value: 'projects', label: 'Projects', glyph: 'folder' },
  { value: 'metrics',  label: 'Metrics',  glyph: 'chart-bar' },
  { value: 'inbox',    label: 'Inbox',    glyph: 'inbox' },
  { value: 'settings', label: 'Settings', glyph: 'settings' }, // overflows to More
]

<BottomTabBar
  items={tabs}
  value={activeTab}
  onValueChange={setActiveTab}
  safeAreaBottom={34}  // useSafeAreaInsets().bottom
/>
```

| Prop | Type | Default |
|---|---|---|
| `items` | `BottomTabItem[]` | required |
| `value` | `string` | required |
| `onValueChange` | `(value: string) => void` | required |
| `safeAreaBottom` | `number` | `0` |
| `style` | `ViewStyle` | — |

**`BottomTabItem`:**

| Field | Type | Notes |
|---|---|---|
| `value` | `string` | Unique key |
| `label` | `string` | Shown beneath icon |
| `glyph` | `GlyphName` | From the Achery icon set |
| `hidden` | `boolean` | Exclude from bar entirely |

### `Marginalia` (native)

Decorative corner glyph — the RN counterpart to the web `Marginalia`. Non-interactive (hidden from accessibility).

```tsx
import { Marginalia } from 'achery-ui/native'

// Anchored bottom-right of a full-screen view
<Marginalia glyph="fern" size={100} opacity={0.12} />
```

| Prop | Type | Default |
|---|---|---|
| `glyph` | `GlyphName` | `'fern'` |
| `size` | `number` | `120` |
| `opacity` | `number` | `0.4` |
| `accent` | `boolean` | `false` (uses muted fg) |
| `corner` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'none'` | `'bottom-right'` |
| `inset` | `number` | `16` |

Anchors absolutely — the parent should be `position: 'relative'` (a full-screen `View` usually is). `corner="none"` renders inline.

### `TagInput` (native)

Chips-in-input tag field. Type to add; comma or trailing space confirms a chip; return also confirms; Backspace on an empty input removes the last chip. Autocompletes from `suggestions`.

```tsx
import { TagInput, Field } from 'achery-ui/native'

<Field label="Tags">
  <TagInput value={tags} onChange={setTags} suggestions={known} placeholder="Add tags…" />
</Field>

// Ghost-on-leather, e.g. over a shoot-mode HUD
<TagInput value={tags} onChange={setTags} onLeather />
```

| Prop | Type | Default |
|---|---|---|
| `value` | `string[]` | required |
| `onChange` | `(tags: string[]) => void` | required |
| `suggestions` | `string[]` | `[]` |
| `placeholder` | `string` | — |
| `onLeather` | `boolean` | `false` (gold-deep chips + cream text) |
| `normalize` | `(raw: string) => string` | lowercase + trim + collapse whitespace |
| `disabled` | `boolean` | `false` |

### `BarChart` (native)

The same layout as the web `BarChart`, with Views — no SVG needed.

```tsx
import { BarChart } from 'achery-ui/native'

<BarChart
  label="Entities by status"
  orientation="horizontal"
  scale="ordinal"
  series={['Stub', 'Draft', 'Complete']}
  data={[{ label: 'NPCs', values: [12, 9, 4], onPress: () => router.push('/npcs') }]}
/>
```

- Props are as on the web, except `onPress?: () => void` per datum and `style?: ViewStyle`.
- Each bar announces its label, total and every series' value.
- Legend, axis and labels are hidden from screen readers, since the bars already say it all.

### `Sparkline` (native)

```tsx
import { Sparkline } from 'achery-ui/native'

<Sparkline data={[3, 5, 4, 8]} tone="positive" accessibilityLabel="Up from 3 to 8" />
```

---

## Hooks

### `useMediaQuery(query: string): boolean`

Reactive wrapper around `window.matchMedia`. Returns `false` during SSR. Updates on viewport resize.

```tsx
const isWide = useMediaQuery('(min-width: 1024px)')
```

### `useIsDesktop(breakpoint?: number): boolean`

Returns true when the viewport is at least `breakpoint` px wide (default: **768** — matches `Sidebar`'s mobile overlay breakpoint).

Designed for the AppBar + Sidebar responsive shell pattern:

```tsx
const isDesktop = useIsDesktop()
const [mobileOpen, setMobileOpen] = useState(false)

<AppBar onMenuClick={isDesktop ? undefined : () => setMobileOpen(o => !o)} />
<Sidebar
  {...(isDesktop ? {} : { mobileOpen, onMobileOpenChange: setMobileOpen })}
/>
```

On desktop: `Sidebar` renders permanently in-flow. On mobile: hamburger button appears in `AppBar`, `Sidebar` slides in as a fixed overlay with a backdrop.

---

## Known gaps (as of v0.25.0)

Components not yet in achery-ui that commonly appear in apps:

- **Radio** — no radio group primitives
- **Breadcrumb** — no wayfinding
- **Spinner** — no indeterminate loading indicator (ProgressBar exists for determinate values)
- **NumberInput / Stepper** — no numeric input with increment/decrement
- **FAB** — no floating action button for quick capture on native
