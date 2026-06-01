// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GSliders({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Line x1="4" y1="8" x2="20" y2="8" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="4" y1="16" x2="20" y2="16" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Line><Circle cx="9" cy="8" r="2.2" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="15" cy="16" r="2.2" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
