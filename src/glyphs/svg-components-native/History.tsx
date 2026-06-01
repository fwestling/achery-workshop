// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Path, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GHistory({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M4 12a8 8 0 1 1 2.6 5.9" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></Path><Polyline points="4,7 4,12 9,12" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></Polyline><Polyline points="12,8 12,12 15,14" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></Polyline>
    </Svg>
  )
}
