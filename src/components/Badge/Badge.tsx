import type { HTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import * as styles from './Badge.css.js'

type BadgeVariants = NonNullable<RecipeVariants<typeof styles.badge>>

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeVariants['tone']
  variant?: BadgeVariants['variant']
  dot?: boolean
  children: ReactNode
  className?: string
}

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
