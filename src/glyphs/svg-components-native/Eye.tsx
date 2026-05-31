// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GEye({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Circle cx="12" cy="12" r="3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="12" cy="12" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
