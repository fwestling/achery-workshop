import type { GlyphName } from '../../types/components'
import { Glyph } from '../../glyphs/Glyph'
import * as styles from './Marginalia.css'

/** Props for the {@link Marginalia} component. */
export interface MarginaliaProps {
  /**
   * Glyph to display. Any of the 33 named glyphs from the Achery icon set.
   * @default 'fern'
   */
  glyph?: GlyphName
  /**
   * Size in pixels (applied to both width and height).
   * @default 120
   */
  size?: number
  /**
   * Opacity of the glyph, 0–1. Keep low (0.25–0.5) so the decorative
   * element doesn't compete with content.
   * @default 0.4
   */
  opacity?: number
  /** When true, renders the glyph in the current accent colour. */
  accent?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Decorative botanical/alchemical glyph for use as corner or edge ornamentation.
 * Renders `aria-hidden` — purely presentational.
 *
 * Position it absolutely within a relatively-positioned container (e.g. a {@link Card})
 * to achieve the characteristic manuscript-margin effect.
 *
 * @example
 * ```tsx
 * // Inside a Card — Card handles positioning via its `marginalia` prop shorthand
 * <Card marginalia="fern">…</Card>
 *
 * // Manual placement
 * <div style={{ position: 'relative' }}>
 *   <Marginalia glyph="asterism" size={160} opacity={0.25} />
 *   <p>Content</p>
 * </div>
 * ```
 */
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
