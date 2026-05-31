// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line, Rect } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GGamepad({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="8" width="18" height="9" rx="4.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect><Line x1="8" y1="11" x2="8" y2="14" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="6.5" y1="12.5" x2="9.5" y2="12.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Circle cx="15.5" cy="12" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="17.5" cy="14" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
