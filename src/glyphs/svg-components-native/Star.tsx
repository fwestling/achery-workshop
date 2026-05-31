// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function Star({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="12,3 14,10 21,10 15.5,14 17.5,21 12,17 6.5,21 8.5,14 3,10 10,10" stroke={color} fill="none" strokeWidth="1.4" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
