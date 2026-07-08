import { View, type ViewStyle } from 'react-native'
import type { GlyphName } from '../../types/components'
import { Glyph } from './Glyph'
import { useTheme } from '../theme/ThemeContext'

export interface MarginaliaProps {
  /**
   * Glyph to display. Any of the named glyphs in the Achery icon set.
   * @default 'fern'
   */
  glyph?: GlyphName
  /**
   * Size in dp (applied to both width and height).
   * @default 120
   */
  size?: number
  /**
   * Opacity of the glyph, 0–1. Keep low (0.1–0.45) so the decoration doesn't
   * compete with content.
   * @default 0.4
   */
  opacity?: number
  /** Render the glyph in the current accent colour instead of the muted fg. */
  accent?: boolean
  /**
   * Corner to anchor to. The parent should be `position: 'relative'` (a full-
   * screen View usually is). Pass `'none'` to render inline (no positioning).
   * @default 'bottom-right'
   */
  corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'none'
  /** Inset from the anchored edges, dp. @default 16 */
  inset?: number
  style?: ViewStyle
}

const cornerStyle = (corner: NonNullable<MarginaliaProps['corner']>, inset: number): ViewStyle => {
  if (corner === 'none') return {}
  const [v, h] = corner.split('-') as ['top' | 'bottom', 'left' | 'right']
  return { position: 'absolute', [v]: inset, [h]: inset }
}

/**
 * Decorative botanical/alchemical glyph for corner ornamentation — the native
 * counterpart to the web `Marginalia`. Purely presentational (not focusable).
 *
 * @example
 * ```tsx
 * // Anchored bottom-right of a full-screen view
 * <Marginalia glyph="fern" size={100} opacity={0.12} />
 * ```
 */
export const Marginalia = ({
  glyph = 'fern',
  size = 120,
  opacity = 0.4,
  accent = false,
  corner = 'bottom-right',
  inset = 16,
  style,
}: MarginaliaProps) => {
  const { tokens } = useTheme()
  const color = accent ? tokens.accent : tokens.fgMute
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[cornerStyle(corner, inset), { opacity }, style]}
    >
      <Glyph name={glyph} size={size} color={color} />
    </View>
  )
}
