import type { GlyphName } from '../../types/components.js'
import { Glyph } from '../../glyphs/Glyph.js'
import * as styles from './Marginalia.css.js'

export interface MarginaliaProps {
  glyph?: GlyphName
  size?: number
  opacity?: number
  accent?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Marginalia({
  glyph = 'fern',
  size = 120,
  opacity = 0.4,
  className,
  style,
}: MarginaliaProps) {
  return (
    <Glyph
      name={glyph}
      size={size}
      className={[styles.marginalia, className].filter(Boolean).join(' ')}
      style={{ opacity, ...style }}
      aria-hidden="true"
    />
  )
}
