// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GPlus({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Line x1="12" y1="4" x2="12" y2="20" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round"></Line><Line x1="4" y1="12" x2="20" y2="12" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round"></Line>
    </Svg>
  )
}
