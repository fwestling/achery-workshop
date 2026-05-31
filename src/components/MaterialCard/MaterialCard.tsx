import type { HTMLAttributes, ReactNode } from 'react'
import type { MaterialIntensity } from '../../types/theme'

import '../../theme/material.css.js'

/** Props for the {@link MaterialCard} component. */
export interface MaterialCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * How much of the material surfaces on this object.
   * - `'chrome'`  — material as spine + metal trim only; paper body (default)
   * - `'surface'` — material header band over a paper body
   * - `'full'`    — the whole object in material; reserve for rare, celebratory moments
   * @default 'chrome'
   */
  intensity?: MaterialIntensity
  /**
   * Header slot — rendered as `.material__bar`. Receives material background
   * at `surface` and `full` intensities. Pass a string for the title or a
   * ReactNode for a custom bar layout.
   */
  header?: ReactNode
  /**
   * Footer slot — rendered as `.material__foot` with a top border rule.
   * Ideal for action buttons.
   */
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

/**
 * A contained, bounded surface that wears the project's material signature.
 * Use for modals, dialogs, featured cards, receipts — objects that *arrive*
 * and demand a moment of attention.
 *
 * The working page stays plain paper/ink. The material is the occasion.
 *
 * The parent `<AcheryProvider defaultMaterial="leather">` (or `wood` / `copper`)
 * sets which signature is used; the `intensity` prop controls how loudly it
 * surfaces on this object.
 *
 * @example
 * ```tsx
 * <MaterialCard intensity="surface" header="Close the month" footer={<Button>Bind & archive</Button>}>
 *   <Eyebrow>November · ready to bind</Eyebrow>
 *   <Body>Seal the ledger and file it to the archive.</Body>
 * </MaterialCard>
 * ```
 */
export function MaterialCard({
  intensity = 'chrome',
  header,
  footer,
  children,
  className,
  ...props
}: MaterialCardProps) {
  const classes = ['material', `m-${intensity}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {header !== undefined && (
        <div className="material__bar">
          <span className="material__mark" aria-hidden />
          {typeof header === 'string' ? (
            <span className="material__title">{header}</span>
          ) : (
            header
          )}
        </div>
      )}
      <div className="material__body">
        {children}
      </div>
      {footer !== undefined && (
        <div className="material__foot">
          {footer}
        </div>
      )}
    </div>
  )
}
