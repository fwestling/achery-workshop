// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs
import { Svg, Circle, Path } from 'react-native-svg'
import type { ViewStyle } from 'react-native'
interface Props { size?: number; color?: string; style?: ViewStyle }
export default function GDonut({ size = 24, color = '#000000', style }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Circle cx="12" cy="12" r="8.5" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Circle cx="12" cy="12" r="3.2" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Circle><Path d="M7 7.5l.8.8M16.5 8l.8-.8M17 16.5l.8.8M7 16.5l-.8.8M12 3.5v1.2M20.5 12h-1.2" stroke={color} fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></Path>
    </Svg>
  )
}
