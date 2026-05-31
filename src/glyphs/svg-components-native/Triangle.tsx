// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GTriangle({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="12,4 21,20 3,20" stroke={color} fill="none" strokeWidth="1.4" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
