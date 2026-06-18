# achery-ui/native

React Native component library for the Achery design system. Same visual language as the web package — square corners, stamp shadows, compact type, botanical marginalia — built on React Native primitives with no CSS dependency.

```sh
import { NativeThemeProvider, Button, Card, Tabs } from 'achery-ui/native'
```

Setup and full component reference: [COMPONENTS.md](../../COMPONENTS.md#react-native-achery-uinative)

---

## Designing across surfaces

Achery apps span web, mobile, and native. This document is the practical guide for how any view carries between them without losing data and without losing the workshop.

### The stance

**Parity of access, not parity of layout.**

Every datum reachable on one surface is reachable on the other. The *layout* changes to fit the canvas; the *data* never disappears in either direction. Some *capabilities* are platform-bound — a desk-only edge-draw, a phone-only camera capture — but the data they produce stays reachable everywhere. A capability may be native-only; access to its data never is. Nothing becomes "open it on the other device."

### Declaring a direction

Before any ladder, an app declares its **source of truth** once — on `NativeThemeProvider` (or `AcheryProvider` on the web). That one flag picks which ladder applies.

```tsx
// Native app with no web twin
<NativeThemeProvider defaultSurfaceOrigin="native-only">

// Mobile-first product that also has a web view
<NativeThemeProvider defaultSurfaceOrigin="native-first">

// Web dashboard that also ships a mobile app
<AcheryProvider defaultSurfaceOrigin="web-first">
```

| Value | Direction | Ladder | Typical use |
|---|---|---|---|
| `'web-first'` | Desk is the source; phone is re-laid from it | Disclosure ladder (descend) | Dashboards, planning tools, web apps |
| `'native-first'` | Phone is the source; desk un-folds and adds power | Promotion ladder (ascend) | Capture apps, trackers, field tools |
| `'parity'` | Neither leads; both meet at an agreed feature set | Design the data model first | Cross-device products |
| `'native-only'` | No web twin — neither ladder applies | Achery on touch rules apply in full | Games, single-platform apps |

---

## The disclosure ladder — web → mobile

When a web view is too dense for a phone, climb this ladder in order and **stop at the first rung that resolves the density**. Each rung trades a little more "see it all at once" for "fits the thumb." Never jump to rung 7 when rung 3 would do — collapsing a scratchpad is cheaper, and kinder, than exiling it to the desktop.

| Rung | Pattern | achery-ui component | When |
|---|---|---|---|
| 1 | **Reflow** — multi-column → single stack | CSS only | Always start here. Most pages need nothing more. |
| 2 | **Scale step** — 14→16px base type, 44px hit areas | `@media (pointer: coarse)` (automatic) | Not optional — applied to every mobile view automatically. |
| 3 | **Collapse** — secondary content folds to a toggle | `Disclosure` | Content is *supporting*, read occasionally. Scratchpad, activity, links. |
| 4 | **Tab** — peer sections → sticky segmented strip | `Tabs` | Sections are equals a user switches between — Overview / Deps / Timeline. |
| 5 | **Sheet** — action clusters + short edits slide up | `BottomSheet` + `SheetRow` | A cluster of actions or controls crowds a row or header. |
| 6 | **Drill** — sub-entity gets its own pushed screen | `ScreenNav` | The child has enough of its own content that inline expansion would bury the parent. |
| 7 | **Defer authoring** — gesture goes read-only | (no component — platform constraint) | Last resort, and only for the *gesture*. The data is never deferred — only the way you'd edit it. |

**Rules:**
- Lowest rung that fits wins.
- Rung 2 is always on.
- Rung 7 defers the *gesture*, never the *data*.

### Pattern map — common web constructs on the phone

| Web construct | On the phone | Rung |
|---|---|---|
| Asymmetric 2-col (content + right gutter) | Single stack; gutter content drops below as collapsed `Disclosure`s | Reflow + Collapse |
| Project sub-tabs (Overview / Deps / Timeline) | Sticky `Tabs` segmented strip under the header | Tab |
| Right-gutter scratchpad + marginalia notes | A "Notes" `Disclosure` at the foot of the view, closed by default | Collapse |
| Inline row micro-actions (edit · ✕ · count) | Count stays inline; actions move into a `⋯` `BottomSheet` per row | Sheet |
| Header action cluster (edit · delete · plan) | One primary stays; the rest fold into the header `⋯` sheet | Sheet |
| Dense table / Docket view | One card per row — horizontal scroll for true matrices only | Reflow |
| Context-tag filter bar (multi-select chips) | A "Filter" button opens a `BottomSheet` of chips; active filters summarised on the trigger | Sheet |
| Top app bar + left sidebar nav | `BottomTabBar` — 4 primaries; anything past 4 lives in a "More" sheet | Tab + Sheet |
| Phase row with inline task strip | Phase is a card; tapping drills to a phase screen when tasks get long | Drill |
| Dependency graph / Timeline (wide canvas) | Pinch-zoom + pan, read-only. Drawing edges + drag-resize stay on the desk. | Defer authoring |

---

## The promotion ladder — native → web

Native-first apps run the ladder in reverse. Going up you *gain* canvas, pointer precision, hover, and a keyboard — so the moves invert, then you add affordances the phone never had. Climb until the extra room is used well; don't leave a phone layout stranded on a 27-inch monitor.

| Rung | Pattern | When |
|---|---|---|
| 1 | **Reflow up** — single stack opens into columns; right gutter returns | Always first. |
| 2 | **Density step** — `@media (pointer: fine)`: 16→14px, hairline rows return | Not optional — applied to every web view automatically. |
| 3 | **Reveal** — disclosures open into always-visible panels (scratchpad, links live in the gutter again) | Inverse of Collapse. Canvas can afford to show supporting content at rest. |
| 4 | **Unify** — segmented strip becomes side-by-side panes or sub-tabs | Inverse of Tab. Two sections fit on screen together. |
| 5 | **Inline** — bottom sheets become inline toolbars, hover popovers, right-click menus | Inverse of Sheet. A precise pointer makes small inline controls usable again. |
| 6 | **Master–detail** — pushed screens collapse to a two-pane list + detail | Inverse of Drill. List and item fit on screen together; back button disappears. |
| 7 | **Enable authoring** — light up desk-only power | The additive rung. Draw edges, drag-resize, multi-select, hover previews, keyboard shortcuts, dense bulk editing. |

**Rules:**
- Promotion is additive — undo the folds, then add pointer-only power.
- Rung 2 is always on.
- Hover, right-click, keyboard, and multi-select have no phone twin — that's fine. Parity is of *data*, not *gesture*.

---

## Native-only

When `defaultSurfaceOrigin="native-only"`, neither ladder applies — there is no web surface to adapt to or from. But **Achery on touch still governs the surface in full**. This is not a relaxed mode; it is the same house style, built for glass from the start.

The same principles apply as any touch surface (see below). The difference is that promotion-ladder thinking is irrelevant — you're not adapting a web view up, you're designing natively.

---

## Achery on touch — rules that hold everywhere

These apply to any touch surface: a web view on a phone, a native app, or `native-only`. The trap is letting "touch" quietly mean "generic iOS card UI." It doesn't. The furniture holds at every size.

### The furniture holds

A bigger tap target is just more padding — never a rounded bubble. Hairline borders, square corners, stamp shadows, and small-caps pills stay exactly as they are. Type steps once (14→16px); it does not balloon.

### The marginalia survives

One glyph in the bottom-right negative space, 40–60% opacity. The signature move makes the trip down to the phone intact. A screen without it reads like a template, not like Achery.

### Sheets are stamped, not soft

The `BottomSheet` wears a 2px ink top-rule and a tracing-paper scrim — not an iOS pill-corner card with a soft shadow. It slides in ≤320ms, paired with a translate. The workshop still doesn't bounce.

### Capability parity

Some primitives only exist on one platform. Parity does not mean every surface performs the same gesture — it means the *data* a capability produces is reachable everywhere, and a missing capability degrades to an equivalent or an honest absence, never a dead end.

| Native primitive | On the web | Rule |
|---|---|---|
| Swipe, long-press, pinch | Buttons, hover affordances, scroll + zoom controls | Never the only path to an action — always a visible control too |
| Haptics | Silent no-op | Always pair with a visual change |
| Biometric unlock | Password / passkey | Same data, different gate |
| Camera / mic capture | File upload or manual entry | Degrade down a chain; never block capture |
| Push notifications | In-app inbox, email, web-push | The message reaches the user on every surface |
| Share sheet / location | Copy-link / download · manual or coarse geolocation | An equivalent, or an honest "not here" |

A truly native-only feature is noted as such — parity is asserted on its *data*, not its mechanics.

---

## Component reference for this ladder

| Component | Ladder role |
|---|---|
| `Disclosure` | Rung 3 — collapse secondary content behind a labelled toggle |
| `Tabs` | Rung 4 — peer sections as a sticky scrollable strip |
| `BottomSheet` + `SheetRow` | Rung 5 — action clusters and short edits |
| `ScreenNav` | Rung 6 — navigation bar for pushed screens |
| `BottomTabBar` | Promotion rung 6 (inverse) — desk sidebar → bottom nav |

Full props: [COMPONENTS.md](../../COMPONENTS.md#react-native-achery-uinative)
