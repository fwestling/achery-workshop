// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GBurger({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 9.5a8 3.5 0 0 1 16 0z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Line x1="4" y1="12.5" x2="20" y2="12.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Path d="M4.5 15h15a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Circle cx="9" cy="7" r="0.5" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="13" cy="6.5" r="0.5" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="15.5" cy="7.5" r="0.5" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
