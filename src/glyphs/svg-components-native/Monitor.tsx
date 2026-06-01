// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line, Rect } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GMonitor({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Rect x="3" y="4" width="18" height="13" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect><Line x1="9" y1="21" x2="15" y2="21" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="12" y1="17" x2="12" y2="21" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
