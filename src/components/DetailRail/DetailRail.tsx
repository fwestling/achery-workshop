import type { ReactNode, CSSProperties } from 'react'
import { Button } from '../Button/Button'
import { Heading } from '../Typography/Typography'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import * as styles from './DetailRail.css'

/** Props for the {@link DetailRail} component. */
export interface DetailRailProps {
  /** Whether the rail is visible. */
  open: boolean
  /** Called when the user clicks the close button or the backdrop. */
  onClose: () => void
  /** Title rendered in the header. */
  title: string
  /** Optional eyebrow label above the title. */
  eyebrow?: string
  /** Main content area. */
  children?: ReactNode
  /** Footer slot — typically action buttons. */
  footer?: ReactNode
  /**
   * Width of the rail on desktop.
   * @default 360
   */
  width?: number
  className?: string
}

/**
 * A slide-in detail panel that appears from the right on desktop and slides up
 * from the bottom on mobile (≤640px). Clicking the backdrop or the close button
 * dismisses it.
 *
 * Useful for showing contextual detail alongside a list or table without
 * navigating away from the page.
 *
 * @example
 * ```tsx
 * <DetailRail open={!!selected} onClose={() => setSelected(null)} title={selected?.name} eyebrow="Transaction">
 *   <Field label="Amount"><Input value={selected?.amount} /></Field>
 * </DetailRail>
 * ```
 */
export const DetailRail = ({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  width = 360,
  className,
}: DetailRailProps) => {
  if (!open) return null

  const railStyle: CSSProperties = { width }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        className={[styles.rail, className].filter(Boolean).join(' ')}
        style={railStyle}
        role="complementary"
        aria-label={title}
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading level={3}>{title}</Heading>
          </div>
          <Button variant="ghost" size="sm" glyph="cross" onClick={onClose} aria-label="Close" />
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </>
  )
}
