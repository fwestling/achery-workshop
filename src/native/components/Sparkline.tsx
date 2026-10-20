import Svg, { Polyline } from 'react-native-svg'
import { useTheme } from '../theme/ThemeContext'

export type SparklineTone = 'positive' | 'negative' | 'neutral'

export interface SparklineProps {
  /** Data points. Fewer than 2 draws nothing. */
  data: number[]
  /** @default 80 */
  width?: number
  /** @default 28 */
  height?: number
  /** Line colour: success, danger or accent. @default 'neutral' */
  tone?: SparklineTone
  /** Read by screen readers; without it the sparkline is decorative (its numbers belong in nearby text) */
  accessibilityLabel?: string
}

const PADDING = 2

/**
 * Minimal inline trend line — the native twin of the web `Sparkline`, same props and drawing.
 * Requires `react-native-svg`.
 */
export const Sparkline = ({ data, width = 80, height = 28, tone = 'neutral', accessibilityLabel }: SparklineProps) => {
  const { tokens } = useTheme()
  const colour = tone === 'positive' ? tokens.success : tone === 'negative' ? tokens.danger : tokens.accent
  const a11y = accessibilityLabel
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel }
    : { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' as const }
  if (data.length < 2) return <Svg width={width} height={height} {...a11y} />
  const min = Math.min(...data)
  const range = Math.max(...data) - min || 1
  const xStep = (width - PADDING * 2) / (data.length - 1)
  const yScale = (height - PADDING * 2) / range
  const points = data.map((v, i) => `${(PADDING + i * xStep).toFixed(2)},${(height - PADDING - (v - min) * yScale).toFixed(2)}`).join(' ')
  return (
    <Svg width={width} height={height} {...a11y}>
      <Polyline points={points} fill="none" stroke={colour} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  )
}
