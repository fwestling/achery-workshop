import type { CSSProperties } from 'react'
import * as styles from './Skeleton.css'

export interface SkeletonProps {
  /**
   * Number of lines to render, stacked with a small gap between them.
   * @default 1
   */
  lines?: number
  /**
   * CSS width of each line (e.g. `'60%'`, `'120px'`). Accepts a single value applied
   * to all lines, or an array mapping a width to each line positionally — useful for
   * creating a natural-looking paragraph with a short last line.
   * @default '100%'
   */
  width?: string | string[]
  /**
   * When true, renders a tall rectangular block instead of line(s) — useful for
   * placeholder cards, images, or chart areas.
   * @default false
   */
  block?: boolean
  /**
   * Overrides the height of a block skeleton (e.g. `'120px'`). Has no effect when
   * `block` is false.
   */
  height?: string | undefined
  /** Inline style escape hatch — useful for shape overrides (e.g. `borderRadius: '50%'` for a circular avatar). */
  style?: CSSProperties | undefined
  className?: string | undefined
}

/**
 * Skeleton placeholder that communicates loading state without layout shift.
 *
 * @example
 * // Single line
 * <Skeleton />
 *
 * // Paragraph — three lines, last one shorter
 * <Skeleton lines={3} width={['100%', '100%', '60%']} />
 *
 * // Tall block (e.g. chart placeholder)
 * <Skeleton block height="200px" />
 */
export const Skeleton = ({ lines = 1, width = '100%', block = false, height, style, className }: SkeletonProps) => {
  if (block) {
    return (
      <span
        className={[styles.block, className].filter(Boolean).join(' ')}
        style={height ? { height, ...style } : style}
        aria-hidden="true"
      />
    )
  }

  const widths = Array.isArray(width) ? width : Array.from({ length: lines }, () => width as string)

  if (lines === 1) {
    return (
      <span
        className={[styles.line, className].filter(Boolean).join(' ')}
        style={widths[0] !== '100%' ? { width: widths[0], ...style } : style}
        aria-hidden="true"
      />
    )
  }

  return (
    <span
      style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className={styles.line}
          style={widths[i] !== '100%' ? { width: widths[i] } : undefined}
        />
      ))}
    </span>
  )
}
