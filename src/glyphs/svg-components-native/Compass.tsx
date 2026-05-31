// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function Compass({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} fill="none" strokeWidth="1.4" strokeLinejoin="round"></Circle><Polygon points="12,5 14,12 12,19 10,12" fill={color} stroke={color} strokeWidth="1.4" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
