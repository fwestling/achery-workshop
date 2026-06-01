// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Path } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GPlane({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M12 3c.9 0 1.4 1 1.4 3v3.6l7.6 4.4v1.8l-7.6-2.2v3.2l2 1.4V21l-3.4-1-3.4 1v-1.8l2-1.4v-3.2L3 17.8V16l7.6-4.4V6c0-2 .5-3 1.4-3z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
