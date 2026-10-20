import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

/** The widest a bar gets (a column's width, a row's height): the band's leftover is air. */
export const BAR_MAX = 24
/** Room for a vertical chart's value axis (tick labels). */
const AXIS = 36

export const root = style({
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp3,
  fontFamily: vars.font.body,
  color: vars.color.fg2,
  position: 'relative',
  minWidth: 0,
})

export const legend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${vars.space.sp1} ${vars.space.sp4}`,
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: '12px',
  color: vars.color.fg2,
})

export const legendItem = style({ display: 'flex', alignItems: 'center', gap: vars.space.sp2 })

export const swatch = style({ width: 10, height: 10, borderRadius: 2, flexShrink: 0 })

// ─── Vertical (columns) ───────────────────────────────────────────────────────

// Room above for the top tick's label
export const vPlot = style({ display: 'grid', gridTemplateColumns: `${AXIS}px 1fr`, gridTemplateRows: 'auto auto', minWidth: 0, paddingTop: 8 })

export const vAxis = style({ position: 'relative', fontSize: '11px', color: vars.color.fg3, fontVariantNumeric: 'tabular-nums' })

export const vTick = style({ position: 'absolute', right: vars.space.sp2, transform: 'translateY(50%)', lineHeight: 1 })

export const vArea = style({ position: 'relative', minWidth: 0 })

/** Recessive hairlines: one step off the surface, solid */
export const grid = style({ position: 'absolute', left: 0, right: 0, height: 1, background: vars.color.borderMute, opacity: 0.6 })

export const baseline = style({ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: vars.color.border2 })

export const vBands = style({ position: 'absolute', inset: 0, display: 'flex' })

/** A column's slot along the axis */
export const vBand = style({ flex: '1 1 0', minWidth: 0, height: '100%', display: 'flex' })

export const vLabels = style({ gridColumn: 2, display: 'flex', fontSize: '11px', color: vars.color.fg3, paddingTop: vars.space.sp2, minWidth: 0 })

/** A column's label slot; a shown label is centred on its column and may run over its (unlabelled) neighbours */
export const vLabel = style({ flex: '1 1 0', minWidth: 0, position: 'relative', height: '1.2em' })

export const vLabelText = style({ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' })

// ─── Horizontal (rows) ────────────────────────────────────────────────────────

export const hRows = style({ display: 'grid', gridTemplateColumns: 'minmax(0, max-content) 1fr', alignItems: 'center', columnGap: vars.space.sp3, rowGap: vars.space.sp1 })

export const hLabel = style({ fontSize: '12px', color: vars.color.fg2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 })

export const hTrack = style({ display: 'flex', alignItems: 'center', minWidth: 0, minHeight: 28 })

/** Where a row's bar runs: its value sits just past the bar's end */
export const hArea = style({ position: 'relative', boxSizing: 'border-box', flex: '1 1 auto', minWidth: 0, display: 'flex', alignItems: 'center' })

export const hValue = style({ position: 'absolute', top: '50%', transform: 'translateY(-50%)' })

// ─── Bars ─────────────────────────────────────────────────────────────────────

/** One bar's hit target: the whole band, bigger than the mark */
export const band = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  cursor: 'default',
  selectors: {
    '&:focus-visible': { outline: `2px solid ${vars.color.accent}`, outlineOffset: '1px' },
  },
})

export const bandKind = styleVariants({
  vertical: { flex: '1 1 0', minWidth: 0, height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' },
  // Room at the end for the longest bar's value
  horizontal: { flex: '1 1 auto', minWidth: 0, alignItems: 'center', height: 28, paddingRight: 48 },
})

export const linked = style({ cursor: 'pointer' })

/** The bar itself: its segments separated by a 2px surface gap */
export const bar = styleVariants({
  // Never shrunk: a full bar meets the axis' top
  vertical: { display: 'flex', flexDirection: 'column-reverse', gap: 2, width: `min(${BAR_MAX}px, 70%)`, flexShrink: 0 },
  horizontal: { display: 'flex', flexDirection: 'row', gap: 2, height: 16 },
})

/** A segment; the outermost gets the 4px rounded data end, square at the baseline */
export const segment = style({ display: 'block', transition: `filter ${vars.duration.fast} ${vars.ease.out}` })

export const end = styleVariants({
  vertical: { borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  horizontal: { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
})

/** The hovered or focused bar lifts */
globalStyle(`${band}:hover ${segment}, ${band}:focus-visible ${segment}`, { filter: 'brightness(1.12)' })

/** A bar's total, at its tip, in text ink */
export const value = style({ fontSize: '11px', color: vars.color.fg2, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', lineHeight: 1 })

/** A column's total, just above its tip (placed by the component) */
export const vValue = style({ position: 'absolute', left: '50%', transform: 'translateX(-50%)' })

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export const tooltip = style({
  position: 'absolute',
  zIndex: 2,
  pointerEvents: 'none',
  minWidth: 120,
  padding: `${vars.space.sp2} ${vars.space.sp3}`,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border2}`,
  boxShadow: vars.shadow.soft,
  fontSize: '12px',
  color: vars.color.fg2,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const tooltipTitle = style({ color: vars.color.fg3, marginBottom: 2 })

export const tooltipRow = style({ display: 'flex', alignItems: 'center', gap: vars.space.sp2 })

/** Series keyed by a short stroke, not a box */
export const key = style({ width: 10, height: 2, borderRadius: 1, flexShrink: 0 })

export const tooltipValue = style({ color: vars.color.fg, fontWeight: 600, fontVariantNumeric: 'tabular-nums' })

// ─── The table view (for assistive technology) ────────────────────────────────

export const srOnly = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
})
