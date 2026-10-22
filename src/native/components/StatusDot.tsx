import { View } from 'react-native'
import type { BadgeTone } from './Badge'
import { useTheme } from '../theme/ThemeContext'
import { badgeTones } from 'achery-ui/tokens'

export interface StatusDotProps {
  /** Semantic tone — maps to the same colours as {@link Badge}. */
  tone?: BadgeTone
  /**
   * Diameter in dp.
   * @default 8
   */
  size?: number
}

/**
 * Small filled dot conveying semantic status via the same tone palette as
 * {@link Badge}. Use where a full badge label would be too heavy.
 *
 * @example
 * ```tsx
 * <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
 *   <StatusDot tone="drafting" />
 *   <Text>In progress</Text>
 * </View>
 * ```
 */
export const StatusDot = ({ tone = 'neutral', size = 8 }: StatusDotProps) => {
  const { dark } = useTheme()
  // Badge's tone colours (achery-ui/tokens badgeTones), so a dot and a badge of one tone always match
  const color = badgeTones[dark ? 'dark' : 'light'][tone].edge
  const isNeutral = tone === 'neutral'

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: isNeutral ? 'transparent' : color,
        borderWidth: isNeutral ? 1.5 : 0,
        borderColor: color,
      }}
    />
  )
}
