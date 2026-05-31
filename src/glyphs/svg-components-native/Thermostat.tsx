// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GThermostat({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="12" cy="12" r="1.3" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Path d="M12 12l3-3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Line x1="12" y1="4.5" x2="12" y2="6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Line x1="19.5" y1="12" x2="18" y2="12" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
