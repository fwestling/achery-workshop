import * as styles from './ProgressBar.css.js'

export interface ProgressBarProps {
  /** 0–100 */
  value: number
  size?: 'sm' | 'md'
  tone?: 'neutral' | 'accent'
  className?: string
}

export function ProgressBar({ value, size = 'md', tone = 'neutral', className }: ProgressBarProps) {
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
