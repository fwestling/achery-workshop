// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GRocket({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3c4 3 5 8 4 13l-4-2-4 2c-1-5 0-10 4-13z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Circle cx="12" cy="10" r="1.6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Path d="M8 16l-3 3 1-4M16 16l3 3-1-4" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
