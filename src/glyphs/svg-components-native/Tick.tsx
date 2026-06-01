// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GTick({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Polyline points="4,13 10,19 20,5" stroke={color} fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></Polyline>
    </Svg>
  )
}
