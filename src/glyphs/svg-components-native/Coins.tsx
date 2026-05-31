// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Ellipse, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function Coins({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Ellipse cx="9" cy="7" rx="5" ry="2.3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Ellipse><Path d="M4 7v3.5C4 11.7 6.2 12.7 9 12.7s5-1 5-2.2V7" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Ellipse cx="15" cy="14" rx="5" ry="2.3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Ellipse><Path d="M10 14v3.3c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V14" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
