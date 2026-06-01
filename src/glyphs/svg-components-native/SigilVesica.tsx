// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Polygon } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GSigilVesica({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
      <Circle cx="24" cy="24" r="20" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Circle cx="18" cy="24" r="12" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Circle cx="30" cy="24" r="12" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle><Polygon points="24,13.61 30,24 24,34.39 18,24" stroke={color} fill="none" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Polygon><Circle cx="24" cy="24" r="2" fill={color} stroke={color} strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"></Circle>
    </Svg>
  )
}
