import type { HTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Marginalia } from '../Marginalia/Marginalia.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Card.css.js'

type CardVariants = NonNullable<RecipeVariants<typeof styles.card>>

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariants['variant']
  padding?: CardVariants['padding']
  header?: ReactNode
  marginalia?: GlyphName
  marginaliaSize?: number
  children?: ReactNode
  className?: string
}

export function Card({
  variant = 'flat',
  padding = 'md',
  header,
  marginalia,
  marginaliaSize = 80,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={[styles.card({ variant, padding }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {header && <div className={styles.cardHeader}>{header}</div>}
      {children}
      {marginalia && (
        <Marginalia glyph={marginalia} size={marginaliaSize} />
      )}
    </div>
  )
}
