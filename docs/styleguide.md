# Achery Workshop — Visual Language

This document is the design language reference for Achery UI. It describes the aesthetic intent behind decisions — not just what the values are, but why they are what they are.

---

## Design philosophy

Achery Workshop is a field guide interface. Its aesthetic borrows from:

- **Letterpress printing** — ink pushed into paper, leaving impression and texture
- **Botanical illustration** — meticulous, marginal, decorative but functional
- **Alchemical manuscripts** — symbolic glyphs, compressed type, dense with meaning
- **19th-century scientific publishing** — rigour, hierarchy, economy of ornament

The result is a UI that feels weighted, considered, and slightly antiquarian — without sacrificing usability. Hard edges, dense type, and stamp shadows are not stylistic accidents; they are the grammar of this system.

---

## Colour

### Light palette

The light theme uses warm parchment tones — ink on paper, not black on white.

| Role | Value | Name |
|---|---|---|
| Background | `#fbf8f0` | Parchment |
| Background 2 | `#f0e9d6` | Old paper |
| Sunken | `#e6dec5` | Pressed parchment |
| Surface | `#fdfaf3` | Cream |
| Foreground | `#1f1d18` | Ink |
| Foreground 2 | `#4a463c` | Faded ink |
| Foreground 3 | `#6e6a5e` | Light ink |
| Border | `#1f1d18` | Ink rule |
| Border mute | `#b8ad94` | Aged paper crease |

### Dark palette

The dark theme inverts to a deep warm black — candlelight and shadow, not blue-grey screens.

| Role | Value | Name |
|---|---|---|
| Background | `#14130f` | Lamp black |
| Surface | `#26241e` | Carbon |
| Foreground | `#e8dfc8` | Candlelight |
| Border | `#e8dfc8` | Candlelight rule |

### Accent system

Twelve accent colours are available, each with `-deep` and `-light` variants. All values are hex throughout — including in the token files — so React Native consumers work without conversion. The accent is used sparingly: primary CTAs, active navigation states, selected rows, focus rings.

**Original palette** — warm spectrum earths:

| Name | Character |
|---|---|
| Terracotta | Fired clay, warm orange-red — the default |
| Moss | Deep forest green, earthy |
| Plum | Muted purple, considered and quiet |
| Ochre | Golden yellow, warm and generous |
| Rust | Deep red-brown, dramatic |
| Copper | Metallic amber, refined |

**Extended palette** — wider hue territory, same muted earthy chroma:

| Name | Character |
|---|---|
| Slate | Dusty steel blue — utility tools, calm data surfaces |
| Verdigris | Aged-copper teal — apothecary, patina, scientific |
| Mauve | Dusty rose — editorial, considered, slightly formal |
| Amber | Warm amber-gold — workshop warmth, craft, food |
| Fern | Cool conservatory green — botanical, grounded |
| Blush | Dusty warm rose — personal, gentle, creative |

**Accent usage rules:**
- One accent colour per application instance
- One `variant="accent"` button per view — the primary CTA
- Active nav items, focus rings, selected table rows — via CSS vars automatically
- Never use the accent for informational or neutral states

### Semantic colours

Semantic colours are intentionally muted — they signal meaning without alarming.

| Role | Light | Character |
|---|---|---|
| Success | `#6ba03d` | Sage green, measured |
| Warning | `#b8924a` | Ochre, restrained |
| Danger | `#8a3a22` | Dark terracotta, serious |
| Info | `#7a5e8a` | Muted plum, quiet |

---

## Typography

Three typefaces, each with a clear role.

### Display — IM Fell English (serif)

A historic digital revival of the Fell Types — an irregular, humanist serif with genuine letterpress texture. Use for editorial headings, pull quotes, and the Display component. Its slight irregularity gives pages a handmade quality.

**Use for:** `Display`, hero headings, pull quotes, modal titles.
**Do not use for:** body text, UI labels, code.

### Body — Space Grotesk (sans-serif)

A contemporary geometric grotesque with slightly quirky details — especially notable in the `a`, `g`, and `&`. Legible at small sizes, distinctive at large ones. Used for all UI chrome.

**Use for:** `Heading`, `Body`, labels, buttons, nav items, table cells, all UI text.

### Mono — Space Mono (monospace)

The companion to Space Grotesk — shares its geometric personality in a fixed-width form. Used for code, IDs, measurements, and numeric data.

**Use for:** `Mono`, code blocks, identifiers, measurements, formula notation.

### Type scale

| Token | Size | Use |
|---|---|---|
| `sm` | 11px | Captions, kbd hints, secondary meta |
| `base` | 13px | Default mono, dense UI |
| `md` | 14px | Body text, labels, button labels |
| `lg` | 16px | Lead paragraphs |
| `xl` | 20px | h3, sub-headings |
| `xxl` | 26px | h1, modal titles |
| `disp` | 36px | Display text |

Letter-spacing is **negative** on display sizes (`-0.015em` to `-0.03em`) — pulling the wide display serif tighter for visual cohesion. Body text uses either neutral or very slightly positive tracking.

---

## Spacing

A **4px base scale**. Every spacing value is a multiple of 4.

| Step | Value | Name |
|---|---|---|
| sp1 | 2px | Hairline gap |
| sp2 | 4px | Tight inline spacing |
| sp3 | 6px | Icon-to-label gap |
| sp4 | 8px | Standard inline gap |
| sp5 | 12px | Section padding (compact) |
| sp6 | 16px | Standard padding |
| sp7 | 20px | Section separation |
| sp8 | 24px | Card padding |
| sp9 | 32px | Large section gap |
| sp10 | 40px | Component spacing (large) |
| sp11 | 56px | Section break |
| sp12 | 80px | Page-level spacing |

**Design intent:** The scale is intentionally dense at the low end. Achery UIs are compact — this is not an accident but a deliberate nod to the density of printed reference material. Use generous spacing only for structural separation, not padding within components.

---

## Elevation — stamp shadows

Achery has a single elevation model: the **stamp shadow**.

```
box-shadow: 2px 2px 0 0 var(--color-border);  /* standard */
box-shadow: 4px 4px 0 0 var(--color-border);  /* large */
```

No blur. No spread. A hard 2px or 4px offset — as if the element were pressed into a surface with a rubber stamp. This is the visual signature of the system.

**Contrast with conventional shadows:**
- Conventional: blurred, soft, approximating diffuse lighting
- Stamp: crisp, geometric, approximating a physical impression

**Usage:**
- `Button variant="primary"` and `variant="accent"` — stamp (offset lifts off background)
- `Card variant="stamp"` — stamp-lg
- Pressed state: offset collapses to `inset` shadow via CSS
- Interactive elements: shadow reduces or inverts on `:active` to simulate pressing

---

## Borders and corners

**All corners are square by default.** `border-radius: 0` unless there is a specific reason for rounding.

Exceptions:
- `radius.pill` (`999px`) — toggle track, avatar circle, pill badges
- `radius.sm` (`2px`) — used nowhere by default; available for consumers

Borders use `var(--color-border)` at full ink weight for primary interactive elements (inputs, focused buttons) and `var(--color-border-mute)` for structural containers (cards, dividers).

---

## Glyphs

33 SVG icons drawn in the vocabulary of alchemical and botanical illustration. All use `stroke="currentColor"` — they inherit colour from their context.

### Categories

**Geometric primitives:**
`circle` · `square` · `triangle` · `triangle-down` · `hex` · `minus` · `plus` · `cross` · `tick` · `arrow-right` · `arrow-up`

**Botanical & alchemical:**
`fern` · `sprig` · `leaf` · `feather` · `flourish` · `asterism` · `sigil` · `salt` · `sulfur` · `mercury`

**Editorial & instruments:**
`book` · `scroll` · `key` · `flask` · `compass` · `eye` · `hand` · `star` · `moon` · `sun`

**Brand:**
`mark` (hex logomark) · `wordmark` (full word mark)

### Usage conventions

- **Decorative/UI chrome:** Render with `aria-hidden="true"` (default behaviour of `Glyph`)
- **Semantic (icon-only buttons):** Pass `title` to `Glyph`, or add `aria-label` to the button
- **Marginalia:** Use large sizes (80px–160px) at low opacity (0.25–0.45) via the `Marginalia` component
- **Navigation glyphs:** 14px in sidebar items, 20px in the AppBar brand
- **Inline glyphs:** 12–14px alongside text in buttons

---

## Interactive states

| State | Treatment |
|---|---|
| `:hover` | Border colour shift from `borderMute` → `border` |
| `:focus-visible` | `2px solid var(--color-accent)` outline, `2px` offset — keyboard-only |
| `:active` | Stamp shadow collapses; slight brightness shift |
| `disabled` | 50% opacity; `cursor: not-allowed` |
| `selected` (table rows) | Left accent-colour rule (`4px solid var(--color-accent)`) |
| `active` (nav items) | Filled accent background, accent-fg text |

Focus rings are always visible on `:focus-visible` (keyboard/programmatic) and suppressed on `:focus:not(:focus-visible)` (mouse click). Never remove focus styles — only suppress them for pointer interactions.

---

## Motion

Motion in Achery is **minimal and purposeful**. Nothing bounces without reason.

| Duration | Value | Use |
|---|---|---|
| `fast` | 120ms | Micro-interactions: hover colour changes, focus ring |
| `base` | 180ms | Standard transitions: sidebar, tooltip |
| `slow` | 320ms | Entrance/exit: modal slide-up, toast |

Two easing curves:

- **`out`** (`cubic-bezier(.2,.7,.2,1)`) — decelerates into place; natural and calm; default for most transitions
- **`snap`** (`cubic-bezier(.5,1.6,.4,1)`) — slight overshoot with spring return; use for toggle thumb, confirmation actions

**What not to animate:** colour changes in response to theme switching should be instant (no `transition` on the root element). Animating theme changes causes perceived lag and flicker.

---

## Marginalia — decorative composition

The botanical/alchemical glyphs used as large background ornaments are a signature element of the system. Guidelines:

- **Position:** absolute, corner-anchored (bottom-right is canonical; vary for emphasis)
- **Size:** 80px (card margin) to 240px (full-page background)
- **Opacity:** 0.25–0.45 — present but subordinate
- **Colour:** inherits foreground or accent; do not override with arbitrary colours
- **Glyphs to prefer:** `fern`, `sprig`, `flourish`, `asterism`, `sigil` — the most abstract and ornamental

Use marginalia to add visual weight to otherwise spare surfaces. Do not use them on every component — their impact depends on restraint.

---

## Writing style (UI copy)

The Achery voice is spare, precise, and slightly bookish. It avoids conversational filler.

**Labels and headings:**
- Short nouns: "Recipes", "Ingredients", "Process notes"
- Avoid gerunds as headings: not "Managing recipes", just "Recipes"

**Placeholder text:**
- Concrete examples: `"e.g. Iron-gall ink"` — not `"Enter a name"`
- Sensory and specific: `"Describe the process, proportions, notes from the bench…"`

**Toast messages:**
- Declarative past tense: "Saved." not "Your changes have been saved successfully."
- Understated: "Something gave way." not "An error occurred. Please try again."
- One clause, no exclamation marks

**Button labels:**
- Imperative verbs: "Save", "Delete", "Open" — not "OK", "Submit", "Confirm"
- Ghost buttons: "Cancel" (not "Go back" or "Never mind")

---

## Surface adaptation (web ↔ mobile ↔ native)

Achery apps span surfaces. The guiding principle is **parity of access, not parity of layout**: every datum reachable on one surface is reachable on the other. Layout changes to fit the canvas; data never disappears in either direction. Some capabilities are platform-bound (camera, haptics, drawn edges) but the data they produce is always reachable everywhere.

### Declaring a source of truth

Each app sets a direction once via `defaultSurfaceOrigin` on `AcheryProvider` / `NativeThemeProvider`. This picks which ladder applies:

| Value | Direction | Ladder |
|---|---|---|
| `'web-first'` | Dense desk view → phone | Disclosure ladder (descend) |
| `'native-first'` | Phone view → desk | Promotion ladder (ascend) |
| `'parity'` | Agreed feature set, neither dominates | Design the data model first |
| `'native-only'` | No web twin | Achery touch rules apply in full |

### The disclosure ladder (web-first)

When a web view is too dense for a phone, climb this ladder in order and **stop at the first rung that resolves the density**:

| Rung | Pattern | When |
|---|---|---|
| 1 | **Reflow** — multi-column → single stack (CSS only) | Always try first |
| 2 | **Scale step** — `@media (pointer: coarse)`: 14→16px base, 44px hit areas | Always on for any touch surface |
| 3 | **Collapse** — supporting content folds to a `Disclosure` (scratchpad, activity, links) | Content is secondary, read occasionally |
| 4 | **Tab** — peer sections → `Tabs` segmented strip | Sections don't need co-visibility |
| 5 | **Sheet** — action clusters + short edits → `BottomSheet` (row overflow, filters, quick-add) | A cluster of actions crowds a row or header |
| 6 | **Drill** — sub-entity gets its own pushed screen (`ScreenNav`) | Content is too heavy for a sheet |
| 7 | **Defer authoring** — last resort; the gesture goes read-only, artifact stays viewable | Nothing above resolves it |

### The promotion ladder (native-first)

The inverse of disclosure. A phone view promoted to desk gains pointer-only power progressively:

- Hover states, right-click context menus, keyboard shortcuts
- Multi-select (checkboxes materialise on hover)
- `BottomTabBar` → sidebar nav
- Drawn edges and spatial gestures (desk-only)

### House rules on touch surfaces

- **44px minimum hit area** on every interactive element — achieved by padding/min-size, never by rounding into bubbles
- **Sheets are stamped** — 2px ink top-rule + tracing-paper scrim; never soft iOS corner cards
- **Hairlines, square corners, and stamp shadows survive** at every breakpoint
- **Marginalia glyph survives** — it scales down in size but never disappears
- **`BottomTabBar`** replaces the desk sidebar for root nav: ≤4 primaries, overflow into a "More" sheet
