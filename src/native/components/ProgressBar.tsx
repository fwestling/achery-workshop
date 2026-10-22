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
  /** What is progressing, read by screen readers with the value ("Upload, 40%"). */
  accessibilityLabel?: string
  style?: ViewStyle
}

export const ProgressBar = ({ value, size = 'md', tone = 'neutral', accessibilityLabel, style }: ProgressBarProps) => {
  const { tokens } = useTheme()
  const height = size === 'sm' ? 4 : 8
  const pct = Math.max(0, Math.min(100, value))

  return (
    <View
      accessibilityRole="progressbar"
      // aria-value* rather than accessibilityValue: React Native reads both, react-native-web only these
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      {...(accessibilityLabel !== undefined ? { accessibilityLabel } : {})}
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
