// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GUserCircle({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="12" cy="10" r="3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Path d="M6.5 19a6 6 0 0 1 11 0" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
