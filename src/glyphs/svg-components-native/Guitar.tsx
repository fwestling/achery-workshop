// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GGuitar({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="8" cy="16" r="5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="8" cy="16" r="1.4" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Path d="M11.5 12.5l6.5-6.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Path d="M16.5 4l3.5 3.5-1.2 1.2-3.5-3.5z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
