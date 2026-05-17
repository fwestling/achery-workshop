import type { HTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Marginalia } from '../Marginalia/Marginalia.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Card.css.js'

type CardVariants = NonNullable<RecipeVariants<typeof styles.card>>

/** Props for the {@link Card} component. */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style.
   * - `flat` — surface background, hairline border (default)
   * - `stamp` — adds the characteristic hard-offset stamp shadow
   * @default 'flat'
   */
  variant?: CardVariants['variant']
  /**
   * Internal padding.
   * - `none` — no padding; manage internally
   * - `sm` — compact (12px)
   * - `md` — standard (24px, default)
   * - `lg` — generous (32px)
   * @default 'md'
   */
  padding?: CardVariants['padding']
  /**
   * Optional header slot — rendered above the body with a border-bottom rule.
   * Use for {@link Eyebrow} labels, titles, or action rows.
   */
  header?: ReactNode
  /**
   * Name of a {@link Glyph} to render as a decorative {@link Marginalia}
   * element in the card's bottom-right corner.
   */
  marginalia?: GlyphName
  /**
   * Size of the marginalia glyph in pixels.
   * @default 80
   */
  marginaliaSize?: number
  children?: ReactNode
  className?: string
}

/**
 * Container surface for grouping related content. Two variants — `flat` for
 * standard surfaces and `stamp` for the elevated hard-shadow look.
 *
 * Use the `header` slot for section labels and the `marginalia` prop for
 * decorative botanical ornamentation in the corner.
 *
 * @example
 * ```tsx
 * <Card variant="stamp" header={<Eyebrow>Field notes</Eyebrow>} marginalia="fern">
 *   <Body>Mix oak gall and vitriol…</Body>
 * </Card>
 * ```
 */
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
