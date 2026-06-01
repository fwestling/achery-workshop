// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Line, Path } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GBrain({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M12 5.5a3 3 0 0 0-5.2.8A2.8 2.8 0 0 0 4.5 11a3 3 0 0 0 1.2 4.6A3 3 0 0 0 12 18zM12 5.5a3 3 0 0 1 5.2.8A2.8 2.8 0 0 1 19.5 11a3 3 0 0 1-1.2 4.6A3 3 0 0 1 12 18z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Line x1="12" y1="5.5" x2="12" y2="18" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Line>
    </Svg>
  )
}
