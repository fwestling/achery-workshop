// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Path, Polyline } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GUndo({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Polyline points="8,7 3,12 8,17" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Polyline><Path d="M3 12h11a6 6 0 0 1 0 12h-2" stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
