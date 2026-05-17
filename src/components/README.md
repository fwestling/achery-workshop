# Component Reference

All 16 Achery UI components. Every component is exported from the main `achery-ui` entry point.

---

## AcheryProvider

Root provider. Must wrap any part of the tree that uses Achery components.

```tsx
import { AcheryProvider } from 'achery-ui'

<AcheryProvider defaultTheme="light" defaultAccent="terracotta">
  <App />
</AcheryProvider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultTheme` | `'light' \| 'dark'` | `'light'` | Initial colour mode |
| `defaultAccent` | `AccentColor` | `'terracotta'` | Initial accent colour |
| `className` | `string` | — | Applied to the root div |
| `style` | `CSSProperties` | — | Inline styles on the root div |

See [theme README](../theme/README.md) for full theming details.

---

## useTheme

```tsx
const { theme, setTheme, toggleTheme, accent, setAccent } = useTheme()
```

| Return value | Type | Description |
|---|---|---|
| `theme` | `'light' \| 'dark'` | Active colour mode |
| `setTheme` | `(t: ThemeMode) => void` | Set mode explicitly |
| `toggleTheme` | `() => void` | Flip between light and dark |
| `accent` | `AccentColor` | Active accent colour |
| `setAccent` | `(a: AccentColor) => void` | Set accent colour |

---

## Button

Five variants, three sizes, optional glyph and keyboard hint.

```tsx
<Button variant="accent" glyph="plus" size="md">New entry</Button>
<Button variant="ghost" size="sm" glyph="cross" aria-label="Close" />
<Button variant="primary" kbd="⌘S">Save</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'danger'` | `'secondary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `glyph` | `GlyphName` | — | Icon alongside label |
| `glyphPosition` | `'start' \| 'end'` | `'start'` | Which side the glyph appears |
| `kbd` | `string` | — | Keyboard shortcut hint (display only) |

Extends all `<button>` HTML attributes.

---

## Badge

Compact status/category label.

```tsx
<Badge tone="saved">Published</Badge>
<Badge tone="drafting" dot>In progress</Badge>
<Badge tone="stopped" variant="solid">Blocked</Badge>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `'saved' \| 'drafting' \| 'stopped' \| 'archived' \| 'neutral'` | `'neutral'` | Semantic colour |
| `variant` | `'outline' \| 'solid'` | `'outline'` | Visual style |
| `dot` | `boolean` | `false` | Show a filled dot before the label |

Extends all `<span>` HTML attributes.

---

## Eyebrow

Uppercase section label with optional count badge.

```tsx
<Eyebrow>Ingredients</Eyebrow>
<Eyebrow count={12}>Recipes</Eyebrow>
<Eyebrow after={<Button size="sm" variant="ghost">Add</Button>}>Steps</Eyebrow>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | — | Numeric badge after the label |
| `after` | `ReactNode` | — | Content appended after label and count |

Extends all `<span>` HTML attributes.

---

## Toggle

Binary on/off switch. Supports controlled and uncontrolled usage.

```tsx
<Toggle defaultPressed label="Dark mode" />
<Toggle pressed={isDark} onPressedChange={setIsDark} label="Dark mode" />
<Toggle aria-label="Enable notifications" />  // icon-only
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `pressed` | `boolean` | — | Controlled state |
| `defaultPressed` | `boolean` | — | Initial uncontrolled state |
| `onPressedChange` | `(pressed: boolean) => void` | — | Change callback |
| `disabled` | `boolean` | — | Disable interaction |
| `label` | `ReactNode` | — | Visible label beside the track |
| `aria-label` | `string` | — | Accessible label (required if no `label`) |

---

## Glyph

Renders one of 33 SVG icons. Decorative by default (`aria-hidden`). Pass `title` for semantic use.

```tsx
<Glyph name="fern" size={24} />
<Glyph name="cross" size={16} title="Close" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `GlyphName` | — | **Required.** Icon name |
| `size` | `number` | `16` | Width and height in px |
| `title` | `string` | — | Accessible label; removes `aria-hidden` |

**Available glyphs:** `arrow-right` · `arrow-up` · `asterism` · `book` · `circle` · `compass` · `cross` · `eye` · `feather` · `fern` · `flask` · `flourish` · `hand` · `hex` · `key` · `leaf` · `mark` · `mercury` · `minus` · `moon` · `plus` · `salt` · `scroll` · `sigil` · `sprig` · `square` · `star` · `sulfur` · `sun` · `tick` · `triangle` · `triangle-down` · `wordmark`

Extends all SVG element props.

---

## Marginalia

Decorative, `aria-hidden` glyph for corner/edge ornamentation.

```tsx
<Marginalia glyph="asterism" size={160} opacity={0.25} />
```

Use the `Card` component's `marginalia` prop as a shorthand — Card positions it automatically.

| Prop | Type | Default | Description |
|---|---|---|---|
| `glyph` | `GlyphName` | `'fern'` | Glyph to display |
| `size` | `number` | `120` | Size in px |
| `opacity` | `number` | `0.4` | Opacity 0–1; keep low for decorative use |
| `accent` | `boolean` | — | Render in accent colour |

---

## Typography

Four components covering the type scale.

```tsx
import { Display, Heading, Body, Mono } from 'achery-ui'

<Display as="h1">The Alchemist's Field Guide</Display>
<Heading level={2}>Mordants & Fixatives</Heading>
<Body variant="lead">An introduction to the chapter.</Body>
<Body variant="small">Last updated 3 days ago.</Body>
<Mono>Fe₂(SO₄)₃</Mono>
```

### Display

Large editorial text in the display (serif) typeface. Polymorphic via `as` prop (default `<p>`).

### Heading

Semantic `<h1>`–`<h5>` elements. `level` prop controls both the element and the size.

| Prop | Type | Default |
|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4 \| 5` | `1` |

### Body

Paragraph text. Three size variants.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'base' \| 'lead' \| 'small'` | `'base'` | `base`=14px · `lead`=16px · `small`=12px |

### Mono

Monospace text. Polymorphic via `as` prop (default `<span>`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'base' \| 'small'` | `'base'` | `base`=13px · `small`=11px |

---

## Field, Input, Textarea, Select, SearchInput

Form primitives. Compose `Field` with an input element to add labels and validation text.

```tsx
import { Field, Input, Textarea, Select, SearchInput } from 'achery-ui'

<Field label="Name" hint="As it appears on the jar">
  <Input placeholder="Iron-gall ink" />
</Field>

<Field label="Notes" error="Required">
  <Textarea error rows={4} />
</Field>

<Field label="Chapter">
  <Select>
    <option value="ink">Ink</option>
  </Select>
</Field>

<SearchInput placeholder="Search…" />
```

### Field

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible label |
| `hint` | `string` | Helper text (hidden when `error` is set) |
| `error` | `string` | Error message; also hides hint |

### Input / Textarea / Select

All extend their native HTML element's attributes. Share one additional prop:

| Prop | Type | Description |
|---|---|---|
| `error` | `boolean` | Apply error border colouring |

### SearchInput

Extends `<input>` attributes. Includes a built-in compass glyph.

---

## Card

Surface container. Two variants, four padding sizes, optional header and marginalia.

```tsx
<Card variant="stamp" header={<Eyebrow>Field notes</Eyebrow>} marginalia="fern">
  <Body>Mix oak gall and vitriol…</Body>
</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'flat' \| 'stamp'` | `'flat'` | `stamp` adds the hard-offset shadow |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `header` | `ReactNode` | — | Rendered above body with border-bottom |
| `marginalia` | `GlyphName` | — | Decorative corner glyph |
| `marginaliaSize` | `number` | `80` | Size of the marginalia glyph |

Extends all `<div>` HTML attributes.

---

## Tabs

Accessible tab navigation with roving tabindex and arrow-key support.

```tsx
<Tabs
  items={[
    { value: 'details', label: 'Details', content: <DetailsPanel /> },
    { value: 'history', label: 'History', content: <HistoryPanel /> },
    { value: 'notes', label: 'Notes', content: <NotesPanel />, disabled: true },
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TabItem[]` | — | **Required.** Tab definitions |
| `value` | `string` | — | Controlled active tab |
| `defaultValue` | `string` | first item | Initial tab for uncontrolled usage |
| `onValueChange` | `(v: string) => void` | — | Change callback |

### TabItem

| Field | Type | Description |
|---|---|---|
| `value` | `string` | Unique identifier |
| `label` | `ReactNode` | Tab button content |
| `content` | `ReactNode` | Panel content |
| `disabled` | `boolean` | Make tab non-selectable |

---

## Tooltip

Contextual label on hover/focus. Portaled — never clipped by overflow.

```tsx
<Tooltip content="Steeping time: three minutes" side="top">
  <Button variant="ghost" glyph="eye" aria-label="More info" />
</Tooltip>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | — | **Required.** Tooltip body |
| `children` | `ReactNode` | — | **Required.** Trigger element |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred side; auto-flips |
| `delayDuration` | `number` | `400` | ms before opening |
| `open` | `boolean` | — | Controlled open state |

---

## Sidebar

Vertical navigation with labelled groups, active item, and a footer slot.

```tsx
<Sidebar
  activeId={currentPage}
  onItemClick={navigate}
  groups={[
    {
      label: 'Workshop',
      items: [
        { id: 'recipes', label: 'Recipes', glyph: 'book', count: 12 },
        { id: 'ingredients', label: 'Ingredients', glyph: 'flask' },
      ],
    },
  ]}
  footer={<Body variant="small">v0.1.0</Body>}
/>
```

| Prop | Type | Description |
|---|---|---|
| `groups` | `NavGroupDef[]` | **Required.** Navigation groups |
| `activeId` | `string` | ID of the active item |
| `onItemClick` | `(id: string) => void` | Button-item click callback |
| `footer` | `ReactNode` | Content pinned to the bottom |

### NavGroupDef

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Optional group heading |
| `items` | `NavItemDef[]` | Nav items in this group |

### NavItemDef

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Visible label |
| `glyph` | `GlyphName` | Optional icon |
| `count` | `number` | Optional trailing badge |
| `href` | `string` | Renders as `<a>` when provided |

---

## AppBar

Top-of-page application bar. Each built-in slot is opt-in via its callback/prop.

```tsx
const { theme, toggleTheme, accent, setAccent } = useTheme()

<AppBar
  brandName="Achery"
  brandSub="Field Guide"
  isDark={theme === 'dark'}
  onToggleTheme={toggleTheme}
  accent={accent}
  onAccentChange={setAccent}
  onNewClick={() => setModalOpen(true)}
  avatarInitials="FW"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `brandName` | `string` | `'Achery'` | Primary brand name |
| `brandSub` | `string` | — | Secondary descriptor after divider |
| `showSearch` | `boolean` | `true` | Show the search field |
| `searchPlaceholder` | `string` | `'Search…'` | Search placeholder |
| `searchKbd` | `string` | — | Keyboard hint inside search |
| `accent` | `AccentColor` | — | Drives accent picker selection |
| `onAccentChange` | `(a: AccentColor) => void` | — | Show accent picker |
| `onToggleTheme` | `() => void` | — | Show theme toggle button |
| `isDark` | `boolean` | — | Controls sun/moon icon |
| `onNewClick` | `() => void` | — | Show accent "New" button |
| `avatarInitials` | `string` | — | Show user avatar (up to 2 chars) |
| `actions` | `ReactNode` | — | Extra content before avatar |

---

## Table

Sortable data table with hybrid controlled/uncontrolled sort state and row selection.

```tsx
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', render: r => <Badge tone={r.tone}>{r.status}</Badge> },
    { key: 'id', label: 'ID', mono: true, width: '100px' },
  ]}
  data={recipes}
  rowKey={r => r.id}
  defaultSortKey="name"
  onRowClick={(key, row) => navigate(`/recipes/${key}`)}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `ColumnDef<T>[]` | — | **Required.** Column config |
| `data` | `T[]` | — | **Required.** Row data |
| `rowKey` | `(row: T) => string` | — | **Required.** Unique key per row |
| `selectedKeys` | `string[]` | — | Highlighted rows (accent rule) |
| `onRowClick` | `(key, row) => void` | — | Row click handler |
| `sortKey` | `string` | — | Controlled sort column |
| `sortDir` | `SortDirection` | — | Controlled sort direction |
| `defaultSortKey` | `string` | — | Initial sort column (uncontrolled) |
| `defaultSortDir` | `SortDirection` | `null` | Initial sort direction |
| `onSortChange` | `(key, dir) => void` | — | Sort change callback |

### ColumnDef\<T\>

| Field | Type | Description |
|---|---|---|
| `key` | `string` | Row object field |
| `label` | `string` | Header text |
| `sortable` | `boolean` | Enable sort on this column |
| `mono` | `boolean` | Render cell in monospace |
| `render` | `(row: T) => ReactNode` | Custom cell renderer |
| `width` | `string` | CSS width (e.g. `'120px'`) |

---

## Modal

Accessible dialog with focus trap, backdrop, and `Escape` to close. Portaled to `document.body`.

```tsx
<Modal
  trigger={<Button variant="accent" glyph="plus">New recipe</Button>}
  title="New recipe"
  description="Add a recipe to the field guide."
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
>
  <Field label="Name"><Input autoFocus /></Field>
</Modal>
```

| Prop | Type | Description |
|---|---|---|
| `trigger` | `ReactNode` | Element that opens the dialog |
| `title` | `ReactNode` | Dialog title |
| `description` | `ReactNode` | Secondary description line |
| `children` | `ReactNode` | Dialog body |
| `footer` | `ReactNode` | Action buttons (confirm/cancel) |
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Initial uncontrolled state |
| `onOpenChange` | `(open: boolean) => void` | State change callback |

---

## ToastProvider + useToast

Imperative toast notifications rendered in a portal. Place `ToastProvider` once near the root.

```tsx
// root
<AcheryProvider>
  <ToastProvider>
    <App />
  </ToastProvider>
</AcheryProvider>

// anywhere inside
const { toast } = useToast()

toast({ title: 'Saved.' })
toast({ title: 'Entry deleted.', duration: 0, action: <Button size="sm">Undo</Button> })
```

### useToast

Returns `{ toast }` — call `toast(data)` to show a notification.

### ToastData

| Field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | **Required.** Primary message |
| `description` | `string` | — | Secondary detail line |
| `duration` | `number` | `4000` | ms before auto-dismiss; `0` = persistent |
| `action` | `ReactNode` | — | Action element (e.g. Undo button) |
