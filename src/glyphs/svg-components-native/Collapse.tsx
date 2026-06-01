// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GCollapse({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Polyline points="4,9 9,9 9,4" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline><Polyline points="20,9 15,9 15,4" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline><Polyline points="9,20 9,15 4,15" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline><Polyline points="15,20 15,15 20,15" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline>
    </Svg>
  )
}
