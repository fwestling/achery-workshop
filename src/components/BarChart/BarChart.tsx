import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent, type MouseEvent, type ReactNode } from 'react'
import { formatCompact, labelStep, layoutBars, seriesColors, type BarDatum } from '../../charts/bars'
import type { ChartScale } from '../../tokens/chart'
import { vars } from '../../theme/vars.css'
import * as styles from './BarChart.css'

/** The web palette: the theme's chart variables, so colours follow light and dark mode. */
const PALETTE = {
  series: [vars.chart.series1, vars.chart.series2, vars.chart.series3, vars.chart.series4, vars.chart.series5, vars.chart.series6],
  ordinal: [vars.chart.ordinal1, vars.chart.ordinal2, vars.chart.ordinal3, vars.chart.ordinal4, vars.chart.ordinal5],
}

/** One bar: its category, a value per series, and optionally where it leads. */
export interface BarChartDatum extends BarDatum {
  /** Makes the bar a link (e.g. to the list it counts) */
  href?: string
  /** Makes the bar a button */
  onSelect?: () => void
}

/** Props for the {@link BarChart} component. */
export interface BarChartProps {
  /** What the chart shows — names it for assistive technology and captions its table */
  label: string
  /** The bars, in display order */
  data: BarChartDatum[]
  /**
   * The series, in a fixed order (their colours follow it, so keep it the same as filters change).
   * One series needs no legend; two or more stack, with a legend. At most 6 categorical, 5 ordinal.
   */
  series: string[]
  /** `categorical` for identity; `ordinal` for ordered series (stub → draft → complete). @default 'categorical' */
  scale?: ChartScale
  /** `vertical` columns rise from a baseline; `horizontal` rows read across, labels at the left. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal'
  /** Plot height in px (vertical). @default 180 */
  height?: number
  /** Each bar's total at its tip. @default true for horizontal, false for vertical (the axis reads them) */
  showValues?: boolean
  /** How values read. @default compact: 1,284 · 12.9K */
  formatValue?: (value: number) => string
  className?: string
}

interface Hover { index: number; left: number; top: number; above: boolean }

const TIP_WIDTH = 160

/**
 * Bar and stacked-bar chart. Bars grow from one baseline, at most 24px thick, separated by a 2px gap;
 * the outermost segment has a 4px rounded end. Hovering or focusing a bar shows every series' value;
 * bars with `href` or `onSelect` are links or buttons. A table of the same numbers is always present
 * for assistive technology.
 *
 * @example
 * ```tsx
 * <BarChart
 *   label="Entities by status"
 *   orientation="horizontal"
 *   scale="ordinal"
 *   series={['Stub', 'Draft', 'Complete']}
 *   data={[{ label: 'NPCs', values: [4, 9, 12], href: '/npcs' }, { label: 'Items', values: [10, 2, 1] }]}
 * />
 * ```
 */
export const BarChart = ({
  label,
  data,
  series,
  scale = 'categorical',
  orientation = 'vertical',
  height = 180,
  showValues,
  formatValue,
  className,
}: BarChartProps) => {
  const tableId = useId()
  const root = useRef<HTMLElement>(null)
  const area = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<Hover | null>(null)
  // The plot's width, so column labels are thinned to what fits (before it's measured: a typical width)
  const [width, setWidth] = useState(480)
  useEffect(() => {
    const el = area.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => { if (entry) setWidth(entry.contentRect.width) })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  // A hovered bar is by position: new data, and it may be another bar
  useEffect(() => setHover(null), [data])
  const colors = seriesColors(PALETTE, series.length, scale)
  const layout = layoutBars(data, series.length)
  const vertical = orientation === 'vertical'
  const values = showValues ?? !vertical
  const step = vertical ? labelStep(data.map((d) => d.label), width) : 1
  const text = formatValue ?? ((v: number) => formatCompact(v))
  // Ticks show their own precision (0.25, not 0.3) unless the caller formats values
  const tickText = formatValue ?? ((v: number) => formatCompact(v, layout.decimals))

  const describe = (d: BarChartDatum, index: number) => {
    const { total, values: drawn } = layout.bars[index]!
    return series.length === 1 ? `${d.label}: ${text(total)}` : `${d.label}: ${text(total)} (${series.map((s, i) => `${s} ${text(drawn[i] ?? 0)}`).join(', ')})`
  }

  const show = (index: number) => (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    const box = root.current?.getBoundingClientRect()
    const at = e.currentTarget.getBoundingClientRect()
    if (!box) return
    // Beside a column (at the top of the plot, flipping left near the edge) or under a row — always inside the chart
    const right = at.left - box.left + at.width / 2 + 16
    setHover(vertical
      ? { index, left: Math.max(0, right + TIP_WIDTH > box.width ? right - 32 - TIP_WIDTH : right), top: at.top - box.top, above: false }
      // Rows in the lower half show it above, so it stays inside a card that clips
      : { index, left: Math.max(0, Math.min(at.right - box.left - TIP_WIDTH, box.width - TIP_WIDTH)), top: index >= data.length / 2 ? at.top - box.top : at.top - box.top + at.height, above: index >= data.length / 2 })
  }
  const hide = () => setHover(null)

  // Render helpers, not components: a component defined here would remount on every hover, losing focus
  const band = (d: BarChartDatum, index: number, children: ReactNode) => {
    const common = {
      className: [styles.band, styles.bandKind[orientation], d.href || d.onSelect ? styles.linked : ''].filter(Boolean).join(' '),
      'aria-label': describe(d, index),
      onMouseEnter: show(index),
      onMouseLeave: hide,
      onFocus: show(index),
      onBlur: hide,
    }
    if (d.href) return <a key={index} href={d.href} {...common}>{children}</a>
    if (d.onSelect) return <button key={index} type="button" onClick={d.onSelect} {...common}>{children}</button>
    // Focusable, so the values are reachable from the keyboard too
    return <div key={index} tabIndex={0} role="img" {...common}>{children}</div>
  }

  /** A bar's length, as a fraction of the axis */
  const reach = (index: number) => layout.bars[index]!.segments.reduce((a, s) => a + s.size, 0)

  const bar = (index: number) => {
    const { segments } = layout.bars[index]!
    const length = reach(index)
    return (
      <span className={styles.bar[orientation]} style={vertical ? { height: `${length * 100}%` } : { width: `${length * 100}%` }}>
        {segments.map((s, i) => {
          const share = s.size / length
          const style: CSSProperties = { background: colors[s.series], flex: `${share} 1 0`, ...(vertical ? { minHeight: 1 } : { minWidth: 1 }) }
          return <span key={s.series} className={[styles.segment, i === segments.length - 1 ? styles.end[orientation] : ''].filter(Boolean).join(' ')} style={style} />
        })}
      </span>
    )
  }

  const tip = hover && data[hover.index] ? (() => {
    const d = data[hover.index]!
    const { total, values: drawn } = layout.bars[hover.index]!
    const style: CSSProperties = { left: hover.left, top: hover.top + (vertical ? 0 : hover.above ? -4 : 4), width: TIP_WIDTH, ...(hover.above ? { transform: 'translateY(-100%)' } : {}) }
    return (
      <div className={styles.tooltip} style={style} aria-hidden="true">
        <span className={styles.tooltipTitle}>{d.label}</span>
        {series.length > 1 && series.map((s, i) => (
          <span key={s} className={styles.tooltipRow}>
            <span className={styles.key} style={{ background: colors[i] }} />
            <span className={styles.tooltipValue}>{text(drawn[i] ?? 0)}</span>
            <span>{s}</span>
          </span>
        ))}
        <span className={styles.tooltipRow}>
          <span className={styles.tooltipValue}>{text(total)}</span>
          <span>{series.length > 1 ? 'in all' : series[0]}</span>
        </span>
      </div>
    )
  })() : null

  return (
    <figure ref={root} className={[styles.root, className].filter(Boolean).join(' ')} aria-label={label} aria-describedby={tableId}>
      {series.length > 1 && (
        <ul className={styles.legend} aria-hidden="true">
          {series.map((s, i) => (
            <li key={s} className={styles.legendItem}><span className={styles.swatch} style={{ background: colors[i] }} />{s}</li>
          ))}
        </ul>
      )}

      {vertical ? (
        <div className={styles.vPlot} style={values ? { paddingTop: 22 } : undefined}>
          <div className={styles.vAxis} style={{ height }} aria-hidden="true">
            {layout.ticks.map((t) => <span key={t} className={styles.vTick} style={{ bottom: `${(t / layout.max) * 100}%` }}>{tickText(t)}</span>)}
          </div>
          <div ref={area} className={styles.vArea} style={{ height }}>
            {layout.ticks.slice(1).map((t) => <div key={t} className={styles.grid} style={{ bottom: `${(t / layout.max) * 100}%` }} aria-hidden="true" />)}
            <div className={styles.baseline} aria-hidden="true" />
            <div className={styles.vBands}>
              {data.map((d, i) => (
                <div key={`${d.label}-${i}`} className={styles.vBand}>
                  {band(d, i, <>
                    {values && layout.bars[i]!.total > 0 && <span className={`${styles.value} ${styles.vValue}`} style={{ bottom: `calc(${reach(i) * 100}% + 4px)` }} aria-hidden="true">{text(layout.bars[i]!.total)}</span>}
                    {bar(i)}
                  </>)}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.vLabels} aria-hidden="true">
            {data.map((d, i) => <span key={`${d.label}-${i}`} className={styles.vLabel}>{i % step === 0 && <span className={styles.vLabelText}>{d.label}</span>}</span>)}
          </div>
        </div>
      ) : (
        <div className={styles.hRows}>
          {data.map((d, i) => (
            <div key={`${d.label}-${i}`} style={{ display: 'contents' }}>
              <span className={styles.hLabel} title={d.label} aria-hidden="true">{d.label}</span>
              <div className={styles.hTrack}>
                {band(d, i, (
                  <span className={styles.hArea}>
                    {bar(i)}
                    {values && <span className={`${styles.value} ${styles.hValue}`} style={{ left: `calc(${reach(i) * 100}% + 6px)` }} aria-hidden="true">{text(layout.bars[i]!.total)}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tip}

      {/* The same numbers as a table, for assistive technology */}
      <table id={tableId} className={styles.srOnly}>
        <caption>{label}</caption>
        <thead>
          <tr><th scope="col">{''}</th>{series.map((s) => <th key={s} scope="col">{s}</th>)}{series.length > 1 && <th scope="col">Total</th>}</tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={`${d.label}-${i}`}>
              <th scope="row">{d.label}</th>
              {series.map((s, k) => <td key={s}>{text(layout.bars[i]!.values[k] ?? 0)}</td>)}
              {series.length > 1 && <td>{text(layout.bars[i]!.total)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
