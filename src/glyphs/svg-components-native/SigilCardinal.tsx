// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Polygon, Rect } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GSigilCardinal({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
      <Circle cx="24" cy="24" r="20" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Circle cx="24" cy="24" r="14" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Polygon points="24,4 30,18 18,18" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Polygon points="44,24 30,30 30,18" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Polygon points="24,44 18,30 30,30" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Polygon points="4,24 18,18 18,30" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Rect x="21" y="21" width="6" height="6" fill={color} stroke="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Rect>
    </Svg>
  )
}
