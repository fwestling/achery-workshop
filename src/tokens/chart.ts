/**
 * Chart colours — one set per colour mode, shared by the web and native charts.
 *
 * achery's own palette is deliberately muted; most of its hues sit below the chroma a chart mark needs
 * to read as a colour rather than a grey. These are its hues (terracotta, slate, gold, verdigris, plum,
 * moss) stepped up just enough to be told apart, validated for each mode's surface:
 *
 * - **series** — categorical, for identity. Always assigned in this order (never cycled, never
 *   re-ordered by rank): adjacent slots stay distinct under protan/deutan colour blindness
 *   (OKLab ΔE ≥ 8) and to normal vision (ΔE ≥ 15), every slot clears 3:1 against the surface. A
 *   seventh series isn't a new colour — fold the rest into "Other".
 * - **ordinal** — one hue (slate), light to dark, for ordered series (stub → draft → complete): each
 *   step a visible lightness apart, the lightest clearing 2:1 against the surface. In dark mode the
 *   ramp runs the other way (more is lighter), so "more" always stands out from the surface.
 *
 * Text never wears these: labels, values and legends use the text tokens, with a swatch beside them.
 */
export const chartColors = {
  light: {
    series: ['#be6434', '#006c94', '#b28526', '#008877', '#825ea6', '#5d913c'],
    ordinal: ['#83bad6', '#549cc0', '#267ea5', '#006389', '#004965'],
  },
  dark: {
    series: ['#cb7141', '#2684ae', '#b78a2c', '#149483', '#8b67b0', '#659a45'],
    ordinal: ['#2c627b', '#347da0', '#469ac2', '#6db5da', '#a1cfe8'],
  },
} as const

/** How many categorical series a chart can colour. */
export const CHART_SERIES_MAX = chartColors.light.series.length

/** The colours of a chart's series: categorical in fixed order, or evenly spread steps of the ordinal ramp. */
export type ChartScale = 'categorical' | 'ordinal'
