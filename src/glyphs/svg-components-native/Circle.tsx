// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function Circle({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} fill="none" strokeWidth="1.4"></Circle>
    </Svg>
  )
}
