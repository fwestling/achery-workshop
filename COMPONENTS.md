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
  brandName="My App"         // string
  brandSub="subtitle"        // string
  showSearch                 // boolean (default true)
  searchPlaceholder="…"      // string
  isDark={theme === 'dark'}  // boolean
  onToggleTheme={toggleTheme}// () => void — shows toggle if present
  accent={accent}            // AccentColor — shows picker if present
  onAccentChange={setAccent} // (AccentColor) => void
  avatarInitials="AB"        // string — shows avatar if present
  onNewClick={() => {}}      // () => void — shows "New" button if present
  actions={<Node />}         // ReactNode — custom slot
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
  activeId={currentPath}       // string
  onItemClick={id => navigate(id)}
  footer={<Node />}
/>
```

Items render as `<a>` when `href` is set, otherwise `<button>`.

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
  selectedKeys={selected}       // string[] — controlled selection
  onRowClick={(key, row) => {}} // row click handler
  defaultSortKey="name"         // uncontrolled initial sort
  sortKey={sortKey}             // controlled sort column
  sortDir={sortDir}             // 'asc' | 'desc' | null
  onSortChange={(key, dir) => {}}
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

## Known gaps (as of v0.1.0)

Components not yet in achery-ui that commonly appear in apps:

- **Checkbox / Radio** — no form selection primitives yet
- **DatePicker / TimePicker** — no date inputs
- **Pagination** — no page controls
- **Breadcrumb** — no wayfinding
- **Combobox / Autocomplete** — Select is native only; no searchable dropdown
- **Avatar** — AppBar renders initials internally but no standalone component
- **Progress / Spinner** — no loading states
- **Accordion** — no collapsible sections
- **Menu / ContextMenu / Dropdown** — no action menus
- **NumberInput / Stepper** — no numeric input with increment/decrement
