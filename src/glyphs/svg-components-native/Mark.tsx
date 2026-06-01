// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polygon, Rect } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GMark({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" style={style}>
      <Polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="none" strokeWidth="6" stroke={color} strokeLinecap="square" strokeLinejoin="miter"></Polygon>
        <Polygon points="40,12 56,32 24,32" stroke="none" fill={color} strokeLinecap="square" strokeLinejoin="miter"></Polygon>
        <Rect x="33" y="28" width="14" height="30" stroke="none" fill={color} strokeLinecap="square" strokeLinejoin="miter"></Rect>
        <Polygon points="24,50 33,58 33,52" stroke="none" fill={color} strokeLinecap="square" strokeLinejoin="miter"></Polygon>
        <Polygon points="56,50 47,58 47,52" stroke="none" fill={color} strokeLinecap="square" strokeLinejoin="miter"></Polygon>
    </Svg>
  )
}
