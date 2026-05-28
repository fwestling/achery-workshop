import { Skeleton } from '../Skeleton/Skeleton'
import * as styles from './ProgressBar.css'

export interface ProgressBarProps {
  /** 0–100 */
  value: number
  size?: 'sm' | 'md'
  tone?: 'neutral' | 'accent'
  /** When true, renders a skeleton placeholder at the same height as the track. */
  loading?: boolean
  className?: string
}

const trackHeightPx: Record<'sm' | 'md', string> = { sm: '4px', md: '8px' }

export function ProgressBar({ value, size = 'md', tone = 'neutral', loading = false, className }: ProgressBarProps) {
  if (loading) {
    return (
      <Skeleton
        block
        height={trackHeightPx[size]}
        className={className}
        style={{ borderRadius: 0 }}
      />
    )
  }
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      className={[styles.track, styles.trackSize[size], className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={[styles.fill, styles.fillTone[tone]].join(' ')}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
