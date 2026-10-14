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
  /**
   * Name read by screen readers, for a glyph that carries meaning on its own
   * (an icon-only button's content, say). Without one the glyph is decorative.
   */
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

  const label = accessibilityLabel
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel }
    : {}

  if (!SvgComponent) {
    return <View style={[{ width: size, height: size }, style]} {...label} />
  }

  const svg = (
    <SvgComponent
      width={size}
      height={size}
      color={resolvedColor}
      {...(!accessibilityLabel && style !== undefined && { style })}
    />
  )
  if (!accessibilityLabel) return svg

  // SVG components don't reliably take accessibility props, so a labelled
  // glyph is wrapped in a View that carries the label (and the style).
  return <View style={style} {...label}>{svg}</View>
}
