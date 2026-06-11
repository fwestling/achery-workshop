import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeContext'
import type { GlyphName } from '../../types/components'
import { lookupNativeGlyph } from '../../glyphs/nativeLookup'

const toComponentName = (name: GlyphName): string =>
  name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')

export interface NativeGlyphProps {
  /** Name of the glyph to render. */
  name: GlyphName
  /** Size in dp — applied to both width and height. @default 24 */
  size?: number
  /**
   * Stroke/fill color. Defaults to the theme fg token.
   * Passed as the `color` prop to the SVG component, which react-native-svg-transformer
   * maps from `currentColor` in the source SVG.
   */
  color?: string
  accessibilityLabel?: string
  style?: ViewStyle
}

/**
 * Renders a single glyph from the Achery icon set on native.
 * Requires `react-native-svg` and `react-native-svg-transformer` configured
 * in the consumer's metro.config.js.
 *
 * Color defaults to the theme fg token. Each glyph is loaded via a static
 * switch so Metro can resolve the paths at bundle time.
 */
export const Glyph = ({ name, size = 24, color, accessibilityLabel, style }: NativeGlyphProps) => {
  const { tokens } = useTheme()
  const resolvedColor = color ?? tokens.fg
  const SvgComponent = lookupNativeGlyph(toComponentName(name))

  if (!SvgComponent) {
    return <View style={[{ width: size, height: size }, style]} accessibilityLabel={accessibilityLabel} />
  }

  return (
    <SvgComponent
      width={size}
      height={size}
      color={resolvedColor}
      {...(style !== undefined && { style })}
    />
  )
}
