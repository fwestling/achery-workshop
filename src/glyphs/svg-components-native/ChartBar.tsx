// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line, Rect } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GChartBar({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="20" x2="20" y2="20" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Rect x="6" y="12" width="3" height="8" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect><Rect x="11" y="8" width="3" height="12" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect><Rect x="16" y="14" width="3" height="6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect>
    </Svg>
  )
}
