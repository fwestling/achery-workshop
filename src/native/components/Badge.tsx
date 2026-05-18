import { View, Text, type ViewStyle } from 'react-native'
import { palette, fontWeights, spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext.js'

export type BadgeTone = 'neutral' | 'saved' | 'drafting' | 'stopped' | 'archived'
export type BadgeVariant = 'outline' | 'solid'

export interface BadgeProps {
  tone?: BadgeTone
  variant?: BadgeVariant
  dot?: boolean
  children: string
  style?: ViewStyle
}

function toneColors(tone: BadgeTone, variant: BadgeVariant, isDark: boolean) {
  const map: Record<BadgeTone, { fg: string; bg: string; border: string }> = {
    neutral: { fg: isDark ? palette.cream : palette.ink, bg: isDark ? '#26241e' : palette.paperWarm, border: isDark ? palette.cream : palette.ink },
    saved: { fg: palette.success, bg: isDark ? '#1a2e10' : '#edf5e0', border: palette.success },
    drafting: { fg: palette.ochre, bg: isDark ? '#2a200a' : '#fdf3dc', border: palette.ochre },
    stopped: { fg: palette.rust, bg: isDark ? '#2a0e06' : '#faeae4', border: palette.rust },
    archived: { fg: isDark ? palette.silver : palette.silverDeep, bg: isDark ? '#1a1916' : '#f0ede6', border: isDark ? palette.silver : palette.silverDeep },
  }
  return map[tone]
}

export function Badge({ tone = 'neutral', variant = 'outline', dot = false, children, style }: BadgeProps) {
  const { tokens, dark } = useTheme()
  const colors = toneColors(tone, variant, dark)

  const bg = variant === 'solid' ? colors.fg : colors.bg
  const fg = variant === 'solid' ? tokens.bg : colors.fg

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: colors.border,
          paddingVertical: spacing.sp1,
          paddingHorizontal: spacing.sp3,
          gap: spacing.sp2,
        },
        style,
      ]}
    >
      {dot && (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.fg }} />
      )}
      <Text style={{ color: fg, fontSize: 11, fontWeight: fontWeights.semibold.toString() as any, letterSpacing: 0.5 }}>
        {children}
      </Text>
    </View>
  )
}
