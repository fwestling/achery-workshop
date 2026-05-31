// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GMap({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="3,5 9,3 15,5 21,3 21,19 15,21 9,19 3,21" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Polygon><Line x1="9" y1="3" x2="9" y2="19" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="15" y1="5" x2="15" y2="21" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
