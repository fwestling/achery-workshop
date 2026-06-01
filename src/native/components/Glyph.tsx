import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeContext'
import type { GlyphName } from '../../types/components'
import { lookupNativeGlyph } from '../../glyphs/svg-components-native/lookup'

const toComponentName = (name: GlyphName): string =>
  name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')

export interface NativeGlyphProps {
  /** Name of the glyph to render. */
  name: GlyphName
  /** Size in dp — applied to both width and height. @default 24 */
  size?: number
  /** Stroke/fill color. Defaults to the theme fg token. */
  color?: string
  accessibilityLabel?: string
  style?: ViewStyle
}

/**
 * Renders a single glyph from the Achery icon set using react-native-svg.
 * Inherits color from the theme fg token by default; pass `color` to override.
 *
 * Note: the `wordmark` glyph is not available on native (uses unsupported SVG features).
 * Each glyph module is loaded on first use via a static switch — Metro bundles only
 * what is required, not all 396 at startup.
 */
export const Glyph = ({ name, size = 24, color, accessibilityLabel, style }: NativeGlyphProps) => {
  const { tokens } = useTheme()
  const resolvedColor = color ?? tokens.fg
  const compName = toComponentName(name)
  const SvgComponent = lookupNativeGlyph(compName)

  if (!SvgComponent) {
    return <View style={[{ width: size, height: size }, style]} accessibilityLabel={accessibilityLabel} />
  }

  return (
    <SvgComponent
      size={size}
      color={resolvedColor}
      style={style}
    />
  )
}
