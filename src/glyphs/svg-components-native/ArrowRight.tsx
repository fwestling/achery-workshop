// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Path, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GArrowRight({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M3 12h18" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Path><Polyline points="15,6 21,12 15,18" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline>
    </Svg>
  )
}
