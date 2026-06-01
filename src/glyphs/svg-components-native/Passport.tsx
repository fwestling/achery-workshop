// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Line, Path, Rect } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GPassport({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Rect x="5" y="3" width="14" height="18" rx="1" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Rect><Circle cx="12" cy="10" r="3" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Line x1="9.5" y1="17" x2="14.5" y2="17" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line><Path d="M12 7v6M9 10h6" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
