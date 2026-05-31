// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line, Path, Polyline } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GFile({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 3h8l4 4v14H6z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Polyline points="14,3 14,7 18,7" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Polyline><Line x1="9" y1="13" x2="15" y2="13" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="9" y1="16" x2="15" y2="16" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
