import type { GlyphName } from '../../types/components'
import { LetterStamp } from '../LetterStamp/LetterStamp'
import type { LetterStampTone } from '../LetterStamp/LetterStamp'
import * as styles from './EntityPill.css'

/** Props for the {@link EntityPill} component. */
export interface EntityPillProps {
  /** Visible label text. */
  label: string
  /** Single character displayed in the stamp. Mutually exclusive with `glyph`. */
  letter?: string
  /** Glyph in the stamp. Mutually exclusive with `letter`. */
  glyph?: GlyphName
  /** Tone applied to both stamp fill and border. @default 'neutral' */
  tone?: LetterStampTone
  /** Raw hex escape hatch — passed to LetterStamp. */
  colour?: string
  /** Size variant. @default 'md' */
  size?: 'sm' | 'md'
  /** Makes the pill a `<button>` with click handler. */
  onClick?: () => void
  /** Makes the pill an `<a>` link. */
  href?: string
  className?: string
}

/**
 * Compact entity identifier pill — combines a {@link LetterStamp} with a text label.
 * Renders as `<button>` when `onClick`, `<a>` when `href`, or `<span>` otherwise.
 *
 * @example
 * ```tsx
 * <EntityPill label="Acme Corp" letter="A" tone="moss" />
 * <EntityPill label="Subscriptions" glyph="flask" tone="rust" onClick={handleClick} />
 * ```
 */
export function EntityPill({
  label,
  letter,
  glyph,
  tone = 'neutral',
  colour,
  size = 'md',
  onClick,
  href,
  className,
}: EntityPillProps) {
  const stampSize = size === 'sm' ? 20 : 28
  const isInteractive = Boolean(onClick || href)

  const pillClass = [
    styles.pill({ tone, size, interactive: isInteractive }),
    className,
  ].filter(Boolean).join(' ')

  const labelClass = size === 'sm' ? styles.labelSm : styles.labelMd

  const content = (
    <>
      <LetterStamp
        {...(letter !== undefined ? { letter } : {})}
        {...(glyph !== undefined ? { glyph } : {})}
        {...(colour !== undefined ? { colour } : {})}
        tone={tone}
        size={stampSize}
      />
      <span className={labelClass}>{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={pillClass}>
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={pillClass}>
        {content}
      </button>
    )
  }

  return <span className={pillClass}>{content}</span>
}
