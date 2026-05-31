// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
interface Props { size?: number; color?: string }
export default function GPizza({ size = 24, color = '#000000' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7.5l9 13.5 9-13.5a20 18 0 0 0-18 0z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Path d="M4.5 9.5a17 15 0 0 1 15 0" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Circle cx="9.5" cy="11" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="13.5" cy="11.5" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="11.5" cy="15.5" r="1" fill={color} stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
