import type { ReactNode, HTMLAttributes } from 'react'
import * as styles from './Eyebrow.css'

/** Props for the {@link Eyebrow} component. */
export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  /**
   * Numeric count shown as a small badge after the label — useful for
   * section totals, unread counts, etc.
   */
  count?: number
  /** Arbitrary content appended after the label and optional count. */
  after?: ReactNode
  className?: string
}

/**
 * Compact uppercase label used to categorise sections, label groups of
 * controls, or introduce content blocks. Rendered in small-caps with
 * tracked letter-spacing.
 *
 * Pair with a numeric `count` to show totals inline, or use `after` for
 * actions or secondary content alongside the label.
 *
 * @example
 * ```tsx
 * <Eyebrow>Ingredients</Eyebrow>
 * <Eyebrow count={12}>Recipes</Eyebrow>
 * <Eyebrow after={<Button size="sm" variant="ghost">Add</Button>}>Steps</Eyebrow>
 * ```
 */
export function Eyebrow({ children, count, after, className, ...props }: EyebrowProps) {
  return (
    <span className={[styles.eyebrow, className].filter(Boolean).join(' ')} {...props}>
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
      {after}
    </span>
  )
}
