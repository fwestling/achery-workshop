import type { HTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import * as styles from './Badge.css.js'

type BadgeVariants = NonNullable<RecipeVariants<typeof styles.badge>>

/** Props for the {@link Badge} component. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic colour tone.
   * - `saved` — green; completed or published state
   * - `drafting` — amber; in-progress or pending state
   * - `stopped` — red; error, blocked, or inactive state
   * - `archived` — muted; historical or soft-deleted state
   * - `neutral` — default; informational, no semantic weight
   * @default 'neutral'
   */
  tone?: BadgeVariants['tone']
  /**
   * Visual style.
   * - `outline` — border + tinted background (default); lighter weight
   * - `solid` — filled background; higher visual weight
   * @default 'outline'
   */
  variant?: BadgeVariants['variant']
  /** Show a small filled dot before the label — useful for status indicators. */
  dot?: boolean
  children: ReactNode
  className?: string
}

/**
 * Compact inline label for status, category, or metadata. Combines a semantic
 * `tone` (colour) with an `outline` or `solid` style.
 *
 * @example
 * ```tsx
 * <Badge tone="saved">Published</Badge>
 * <Badge tone="drafting" dot>In progress</Badge>
 * <Badge tone="stopped" variant="solid">Blocked</Badge>
 * ```
 */
export function Badge({
  tone = 'neutral',
  variant = 'outline',
  dot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[styles.badge({ tone, variant }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
