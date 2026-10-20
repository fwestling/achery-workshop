// Shared, React-free maths for the bar charts (web and native lay out the same way).
// Lives outside `src/native` but ships with it (package.json `files`), so native imports it relatively.

/** One bar (a column, or a row when horizontal): its category, and a value per series. */
export interface BarDatum {
  label: string
  /** One per series, in the series' order; missing or negative values count as 0 */
  values: number[]
}

export interface BarSegment {
  /** Series index */
  series: number
  value: number
  /** Where it starts and how far it runs, as fractions (0–1) of the axis */
  start: number
  size: number
}

export interface BarLayout {
  /** The axis' top: a clean number at or above the largest total */
  max: number
  /** Tick values from 0 to `max` */
  ticks: number[]
  /** Decimal places that show every tick exactly */
  decimals: number
  /** Each bar's values as drawn (missing, negative or not a number: 0), total and stacked segments */
  bars: { total: number; values: number[]; segments: BarSegment[] }[]
}

/** The colours of a chart's series: categorical in fixed order, or an ordinal ramp, light to dark. */
export interface ChartPalette {
  series: readonly string[]
  ordinal: readonly string[]
}

/**
 * Colours for `count` series. Categorical colours are taken in their fixed order — never cycled: more
 * series than the palette holds is a mistake (fold the rest into "Other"). Ordinal colours are spread
 * evenly along the ramp, so three series get its light, middle and dark steps.
 */
export const seriesColors = (palette: ChartPalette, count: number, scale: 'categorical' | 'ordinal'): string[] => {
  const ramp = scale === 'categorical' ? palette.series : palette.ordinal
  if (count > ramp.length) throw new RangeError(`A ${scale} chart can colour at most ${ramp.length} series (got ${count}): fold the rest into “Other”`)
  if (scale === 'categorical' || count === ramp.length) return ramp.slice(0, count)
  if (count === 1) return [ramp[Math.floor(ramp.length / 2)]!]
  return Array.from({ length: count }, (_, i) => ramp[Math.round((i * (ramp.length - 1)) / (count - 1))]!)
}

const STEPS = [1, 2, 2.5, 5, 10]
/** Counts don't come in halves: whole-number axes step by 1, 2 or 5 × a power of ten */
const WHOLE_STEPS = [1, 2, 5, 10]

/** A clean tick step (1, 2, 2.5 or 5 × a power of ten; no 2.5 when `integer`) giving about `target` intervals up to `max`. */
const niceStep = (max: number, target: number, integer: boolean): number => {
  const raw = max / target
  const power = 10 ** Math.floor(Math.log10(raw))
  const steps = integer && power < 10 ? WHOLE_STEPS : STEPS
  const step = (steps.find((s) => s * power >= raw) ?? 10) * power
  return integer ? Math.max(1, Math.round(step)) : step
}

/** Decimal places that show a step exactly (0.25 → 2, 0.5 → 1, 20 → 0). */
const decimalsOf = (step: number): number => {
  for (let d = 0; d <= 12; d++) if (Math.abs(Math.round(step * 10 ** d) - step * 10 ** d) < 1e-9 * 10 ** d) return d
  return 12
}

/** Largest value an axis handles: beyond it, sums overflow and ticks can't be counted */
const LARGEST = 1e300

/**
 * The axis for values up to `largest`: a clean top, evenly spaced ticks from zero (about `target`
 * intervals), and the decimals that show every tick exactly. `integer`: the values are counts, so ticks
 * are whole numbers.
 */
export const axisFor = (largest: number, integer = false, target = 4): { max: number; ticks: number[]; decimals: number } => {
  if (!(largest > 0) || !Number.isFinite(largest)) return { max: 1, ticks: [0, 1], decimals: 0 }
  const step = niceStep(Math.min(largest, LARGEST), target, integer)
  const count = Math.ceil(Math.min(largest, LARGEST) / step - 1e-9)
  const decimals = decimalsOf(step)
  // Each tick from its index (no accumulated error), to the step's precision
  const ticks = Array.from({ length: count + 1 }, (_, i) => Number((i * step).toFixed(Math.min(decimals, 20))))
  return { max: ticks[count]!, ticks, decimals }
}

/**
 * A value as people read it on a chart: 1,284 · 12.9K · 4.2M. Below ten thousand, `decimals` places
 * at most (an axis passes its own, so 0.25 isn't read as 0.3); a value that rounds up to the next unit
 * takes it (999,999 → 1M). Not a number: —.
 */
export const formatCompact = (n: number, decimals = 1): string => {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  // From ten thousand: one decimal of the largest unit it reaches — after rounding, so 999,999 is 1M
  const one = (size: number) => Math.round((abs / size) * 10) / 10
  const unit = abs < 1e4 ? null : one(1e6) >= 1000 ? { size: 1e9, suffix: 'B' } : one(1e3) >= 1000 ? { size: 1e6, suffix: 'M' } : { size: 1e3, suffix: 'K' }
  if (!unit) return n.toLocaleString('en-US', { maximumFractionDigits: decimals })
  return `${n < 0 ? '-' : ''}${one(unit.size).toLocaleString('en-US')}${unit.suffix}`
}

/** A value as a chart draws it: missing, negative or not a number count as 0. */
export const cleanValue = (v: number | undefined): number => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : 0)

/** Stacks each bar's series from the baseline, against an axis fitted to the largest total. */
export const layoutBars = (data: readonly BarDatum[], seriesCount: number): BarLayout => {
  const values = data.map((d) => Array.from({ length: seriesCount }, (_, i) => Math.min(cleanValue(d.values[i]), LARGEST / Math.max(1, seriesCount))))
  const totals = values.map((v) => v.reduce((a, b) => a + b, 0))
  const integer = values.every((v) => v.every((x) => Number.isInteger(x)))
  const { max, ticks, decimals } = axisFor(Math.max(0, ...totals), integer)
  return {
    max,
    ticks,
    decimals,
    bars: values.map((row, b) => {
      let at = 0
      const segments: BarSegment[] = []
      row.forEach((value, s) => {
        if (value === 0) return
        segments.push({ series: s, value, start: at / max, size: value / max })
        at += value
      })
      return { total: totals[b]!, values: row, segments }
    }),
  }
}

/** Roughly how wide a label is, at the charts' 11px label size */
export const labelWidth = (label: string): number => label.length * 6.5 + 12

/**
 * Which category labels to show along an axis `width` wide: every `step`th, from the first, so the
 * widest label fits in the room it has (the columns it spans).
 */
export const labelStep = (labels: readonly string[], width: number): number => {
  if (labels.length === 0 || !(width > 0)) return 1
  const widest = Math.max(...labels.map(labelWidth))
  return Math.max(1, Math.ceil(widest / (width / labels.length)))
}
