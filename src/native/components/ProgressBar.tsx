import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

export interface ProgressBarProps {
  /** Progress value from 0–100. */
  value: number
  /** @default 'md' */
  size?: 'sm' | 'md'
  /** @default 'neutral' */
  tone?: 'neutral' | 'accent'
  style?: ViewStyle
}

export const ProgressBar = ({ value, size = 'md', tone = 'neutral', style }: ProgressBarProps) => {
  const { tokens } = useTheme()
  const height = size === 'sm' ? 4 : 8
  const pct = Math.max(0, Math.min(100, value))

  return (
    <View
      style={[
        {
          width: '100%',
          height,
          backgroundColor: tokens.surface2,
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${pct}%`,
          height,
          backgroundColor: tone === 'accent' ? tokens.accent : tokens.fg,
          borderRadius: height / 2,
        }}
      />
    </View>
  )
}
