import * as styles from './Sparkline.css'

export type SparklineTone = 'positive' | 'negative' | 'neutral'

/** Props for the {@link Sparkline} component. */
export interface SparklineProps {
  /** Array of numeric data points. Fewer than 2 renders an empty SVG. */
  data: number[]
  /** SVG width in px. @default 80 */
  width?: number
  /** SVG height in px. @default 28 */
  height?: number
  /** Colour tone. @default 'neutral' */
  tone?: SparklineTone
  className?: string
}

// CSS custom properties are not accessible in pure SVG attr without vars.
// Use hardcoded design-system colour references that match the token values.
const TONE_COLORS: Record<SparklineTone, string> = {
  positive: 'var(--achery-color-success, #6ba03d)',
  negative: 'var(--achery-color-danger, #8a3a22)',
  neutral:  'var(--achery-color-accent, #c46a3a)',
}

/**
 * Minimal inline sparkline chart. Pure SVG, no dependencies, SSR-safe.
 *
 * @example
 * ```tsx
 * <Sparkline data={[1,3,2,5,4,6]} tone="positive" width={80} height={28} />
 * ```
 */
export function Sparkline({
  data,
  width = 80,
  height = 28,
  tone = 'neutral',
  className,
}: SparklineProps) {
  const PADDING = 2

  if (data.length < 2) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className={[styles.root, className].filter(Boolean).join(' ')}
        aria-hidden="true"
      />
    )
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const xStep = (width - PADDING * 2) / (data.length - 1)
  const yScale = (height - PADDING * 2) / range

  const points = data
    .map((v, i) => {
      const x = PADDING + i * xStep
      const y = height - PADDING - (v - min) * yScale
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={TONE_COLORS[tone]}
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
