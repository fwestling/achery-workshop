// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Ellipse, Line, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GNeedle({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="20" x2="18" y2="6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Path d="M18 6l2-2-1 3z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Ellipse cx="16" cy="8" rx="0.8" ry="1.6" transform="rotate(45 16 8)" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Ellipse>
    </Svg>
  )
}
