// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Polygon } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GSigilOctagram({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
      <Circle cx="24" cy="24" r="20" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Circle cx="24" cy="24" r="14" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Polygon points="24,10 38,24 24,38 10,24" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Polygon points="14.1,14.1 33.9,14.1 33.9,33.9 14.1,33.9" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Circle cx="24" cy="24" r="3" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle>
    </Svg>
  )
}
