// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GList({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Line x1="8" y1="6" x2="20" y2="6" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="8" y1="12" x2="20" y2="12" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="8" y1="18" x2="20" y2="18" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Line><Circle cx="4" cy="6" r="0.9" fill={color} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="4" cy="12" r="0.9" fill={color} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="4" cy="18" r="0.9" fill={color} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
