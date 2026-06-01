// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GAsterism({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 60 24" style={style}>
      <Circle cx="14" cy="16" r="2" fill={color}></Circle><Circle cx="30" cy="8" r="2" fill={color}></Circle><Circle cx="46" cy="16" r="2" fill={color}></Circle>
    </Svg>
  )
}
