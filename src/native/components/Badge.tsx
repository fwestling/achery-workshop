import { View, Text, type ViewStyle } from 'react-native'
import { badgeTones, spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export type BadgeTone = 'neutral' | 'saved' | 'drafting' | 'stopped' | 'archived'
export type BadgeVariant = 'outline' | 'solid'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  tone?: BadgeTone
  variant?: BadgeVariant
  dot?: boolean
  size?: BadgeSize
  children: string
  style?: ViewStyle
}

const badgeFontSize: Record<BadgeSize, number> = { sm: 10, md: 11, lg: 12 }

export function Badge({ tone = 'neutral', variant = 'outline', dot = false, size = 'md', children, style }: BadgeProps) {
  const { tokens, dark, font } = useTheme()
  // The same tones as the web Badge (achery-ui/tokens badgeTones): the label is fg2, or onFill on a solid
  // fill, so it reads at 4.5:1 or better; the tone is carried by the border and dot
  const colors = badgeTones[dark ? 'dark' : 'light'][tone]
  const solid = variant === 'solid'
  const bg = solid ? colors.fill : 'transparent'
  const fg = solid ? colors.onFill : tokens.fg2
  const border = solid ? colors.fill : colors.edge
  const dotColor = solid ? colors.onFill : colors.edge

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: border,
          paddingVertical: spacing.sp1,
          paddingHorizontal: spacing.sp3,
          gap: spacing.sp2,
        },
        style,
      ]}
    >
      {dot && (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor }} />
      )}
      <Text style={{ color: fg, fontSize: badgeFontSize[size], ...font('body', 'semibold'), letterSpacing: 0.5 }}>
        {children}
      </Text>
    </View>
  )
}
