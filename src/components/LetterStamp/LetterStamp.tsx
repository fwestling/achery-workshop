import type { CSSProperties } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../types/components'
import * as styles from './LetterStamp.css'

export type LetterStampTone = 'moss' | 'rust' | 'ochre' | 'plum' | 'copper' | 'neutral'
export type LetterStampSize = 14 | 20 | 28 | 36 | 48

/** Props for the {@link LetterStamp} component. */
export interface LetterStampProps {
  /** Single character displayed in the display font. Mutually exclusive with `glyph`. */
  letter?: string
  /** Glyph rendered centred inside the stamp. Mutually exclusive with `letter`. */
  glyph?: GlyphName
  /** Stamp size in px. @default 28 */
  size?: LetterStampSize
  /** Tone (fill colour). @default 'neutral' */
  tone?: LetterStampTone
  /** Raw hex colour override — overrides `tone` background. */
  colour?: string
  className?: string
}

/**
 * Hard-edged square stamp displaying a single letter or glyph.
 * Tone variants provide semantically-coloured fill pairs.
 *
 * @example
 * ```tsx
 * <LetterStamp letter="A" tone="moss" size={28} />
 * <LetterStamp glyph="flask" tone="rust" size={36} />
 * ```
 */
export function LetterStamp({
  letter,
  glyph,
  size = 28,
  tone = 'neutral',
  colour,
  className,
}: LetterStampProps) {
  const style: CSSProperties = colour ? { background: colour } : {}

  return (
    <span
      className={[styles.stamp({ tone, size }), className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    >
      {glyph ? (
        <Glyph name={glyph} size={Math.round(size * 0.55)} />
      ) : letter ? (
        <span className={styles.letter} style={{ fontSize: `${Math.round(size / 2)}px` }}>
          {letter.slice(0, 1).toUpperCase()}
        </span>
      ) : null}
    </span>
  )
}
