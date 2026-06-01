// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polygon } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GHex({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Polygon points="12,3 21,8 21,16 12,21 3,16 3,8" stroke={color} fill="none" strokeWidth="1.4" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
