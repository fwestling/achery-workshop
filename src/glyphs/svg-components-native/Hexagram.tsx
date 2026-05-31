// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Polygon } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GHexagram({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polygon points="12,3 19.79,16.5 4.21,16.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Polygon><Polygon points="12,21 4.21,7.5 19.79,7.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Polygon>
    </Svg>
  )
}
