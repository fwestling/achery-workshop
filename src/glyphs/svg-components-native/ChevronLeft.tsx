// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GChevronLeft({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Polyline points="15,5 8,12 15,19" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline>
    </Svg>
  )
}
