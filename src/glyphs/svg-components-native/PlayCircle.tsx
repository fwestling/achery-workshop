// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function PlayCircle({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Polygon points="10,8 17,12 10,16" fill={color} stroke="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
