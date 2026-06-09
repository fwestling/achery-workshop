import { View } from 'react-native'
import type { BadgeTone } from './Badge'
import { useTheme } from '../theme/ThemeContext'
import { palette } from 'achery-ui/tokens'

export interface StatusDotProps {
  /** Semantic tone — maps to the same colours as {@link Badge}. */
  tone?: BadgeTone
  /**
   * Diameter in dp.
   * @default 8
   */
  size?: number
}

const TONE_COLOR: Record<BadgeTone, (isDark: boolean) => string> = {
  neutral:  (isDark) => isDark ? palette.cream : palette.ink,
  saved:    () => palette.success,
  drafting: () => palette.ochre,
  stopped:  () => palette.rust,
  archived: (isDark) => isDark ? palette.silver : palette.silverDeep,
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
  const color = TONE_COLOR[tone](dark)
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
