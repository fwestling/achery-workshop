import { Skeleton } from '../Skeleton/Skeleton'
import * as styles from './ProgressBar.css'

export interface ProgressBarProps {
  /** 0–100 */
  value: number
  size?: 'sm' | 'md'
  tone?: 'neutral' | 'accent'
  /** When true, renders a skeleton placeholder at the same height as the track. */
  loading?: boolean
  /**
   * What is progressing, for screen readers ("Upload", "Chapter 3"). A progress bar needs a name: give it
   * this or `aria-labelledby`.
   */
  'aria-label'?: string
  /** The id of visible text naming what is progressing. */
  'aria-labelledby'?: string
  className?: string
}

const trackHeightPx: Record<'sm' | 'md', string> = { sm: '4px', md: '8px' }

export function ProgressBar({
  value,
  size = 'md',
  tone = 'neutral',
  loading = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
}: ProgressBarProps) {
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
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <div
        className={[styles.fill, styles.fillTone[tone]].join(' ')}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
