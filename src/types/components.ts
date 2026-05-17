/** Standard three-stop size scale shared across components. */
export type ComponentSize = 'sm' | 'md' | 'lg'

/**
 * Visual variant for the {@link Button} component.
 * - `primary` — high-emphasis, ink fill with stamp shadow
 * - `secondary` — medium-emphasis, surface fill
 * - `accent` — accent-colour fill; one per view
 * - `ghost` — minimal border-only; for toolbar/icon buttons
 * - `danger` — destructive actions
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'

/**
 * Semantic colour tone for the {@link Badge} component.
 * - `saved` — green; completed or published
 * - `drafting` — amber; in-progress or pending
 * - `stopped` — red; error, blocked, or inactive
 * - `archived` — muted; historical or soft-deleted
 * - `neutral` — no semantic weight; informational
 */
export type BadgeTone = 'saved' | 'drafting' | 'stopped' | 'archived' | 'neutral'

/**
 * Visual style for the {@link Badge} component.
 * - `outline` — tinted background with border (lighter weight)
 * - `solid` — filled background (higher visual weight)
 */
export type BadgeVariant = 'outline' | 'solid'

/**
 * Union of all valid glyph names in the Achery icon set.
 * Pass to the `name` prop of {@link Glyph}, or to any component that accepts
 * a `glyph?: GlyphName` prop (Button, Card, Sidebar items, etc.).
 */
export type GlyphName =
  | 'arrow-right'
  | 'arrow-up'
  | 'asterism'
  | 'book'
  | 'circle'
  | 'compass'
  | 'cross'
  | 'eye'
  | 'feather'
  | 'fern'
  | 'flask'
  | 'flourish'
  | 'hand'
  | 'hex'
  | 'key'
  | 'leaf'
  | 'mark'
  | 'mercury'
  | 'minus'
  | 'moon'
  | 'plus'
  | 'salt'
  | 'scroll'
  | 'sigil'
  | 'sprig'
  | 'square'
  | 'star'
  | 'sulfur'
  | 'sun'
  | 'tick'
  | 'triangle'
  | 'triangle-down'
  | 'wordmark'

/** @internal */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * Sort direction for the {@link Table} component.
 * `null` means no active sort (natural/insertion order).
 */
export type SortDirection = 'asc' | 'desc' | null
