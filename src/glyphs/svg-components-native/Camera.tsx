// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GCamera({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d="M4 7h3l2-2h6l2 2h3v12H4z" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path><Circle cx="12" cy="13" r="3.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle>
    </Svg>
  )
}
