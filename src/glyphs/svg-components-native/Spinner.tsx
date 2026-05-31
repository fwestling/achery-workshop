// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function Spinner({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3a9 9 0 1 0 9 9" stroke={color} fill="none" strokeWidth="1.8" strokeLinecap="round"></Path>
    </Svg>
  )
}
