// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GCross({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Line x1="5" y1="5" x2="19" y2="19" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round"></Line><Line x1="19" y1="5" x2="5" y2="19" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round"></Line>
    </Svg>
  )
}
