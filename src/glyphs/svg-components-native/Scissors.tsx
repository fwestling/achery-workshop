// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GScissors({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="6" cy="6" r="2.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="6" cy="18" r="2.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Line x1="8" y1="8" x2="20" y2="18" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="8" y1="16" x2="20" y2="6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
