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

`defaultTheme`: `'light' | 'dark'`  
`defaultAccent`: `'terracotta' | 'moss' | 'plum' | 'ochre' | 'rust' | 'copper'`

---

## Components

### AppBar
Top-of-page bar with brand, search, theme/accent controls, avatar, custom actions.

```tsx
<AppBar
  brandName="My App"           // string
  brandSub="subtitle"          // string
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
  variant="outline" // 'outline' (default) | 'solid'
  dot               // boolean — status dot
>
  Published
</Badge>
```

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

---

### Glyph
Single SVG icon from the 33-icon set. Inherits `currentColor`.

```tsx
<Glyph
  name="fern"   // GlyphName (required)
  size={16}     // number px (default 16)
  title="Fern"  // string — accessible label; omit for decorative
/>
```

**GlyphName values** — geometric: `circle` `square` `triangle` `triangle-down` `hex` `minus` `plus` `cross` `tick` `arrow-right` `arrow-up` · botanical/alchemical: `fern` `sprig` `leaf` `feather` `flourish` `asterism` `sigil` `salt` `sulfur` `mercury` · editorial: `book` `scroll` `key` `flask` `compass` `eye` `hand` `star` `moon` `sun` · brand: `mark` `wordmark`

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
  onCollapsedChange={setCollapsed} // (boolean) => void
  mobileOpen={menuOpen}            // boolean — fixed overlay mode
  onMobileOpenChange={setMenuOpen} // (boolean) => void — backdrop click fires this
/>
```

Items render as `<a>` when `href` is set, otherwise `<button>`.

`NavItemDef` props: `id`, `label`, `glyph?`, `href?`, `count?`, `countTone?: 'accent' | 'neutral'`  
`countTone='accent'` renders the count badge in the current accent colour.

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
  label="Dark mode"             // ReactNode — visible label
  aria-label="Toggle dark mode" // required if no visible label
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

<Mono variant="small" as="code">0x1F4A9</Mono>  // 'base'(13px) | 'small'(11px), polymorphic
```

---

## Tokens (React Native safe)

```tsx
import { palette, spacing, fontFamilies, fontSizes, shadows, radius,
         duration, easing, accentColors, lightTokens, darkTokens } from 'achery-ui/tokens'
```

Zero DOM, zero React — safe for React Native or any non-browser context.

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

## Known gaps (as of v0.5.0)

Components not yet in achery-ui that commonly appear in apps:

- **Radio** — no radio group primitives
- **Breadcrumb** — no wayfinding
- **Progress / Spinner** — no loading states (ProgressBar exists, but no indeterminate spinner)
- **Accordion** — no collapsible sections
- **NumberInput / Stepper** — no numeric input with increment/decrement
