// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GSun({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Circle cx="12" cy="12" r="7" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round"></Circle><Circle cx="12" cy="12" r="1.5" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round"></Circle>
    </Svg>
  )
}
