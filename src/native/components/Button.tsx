import { type ReactNode } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, type ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import type { SemanticTokens } from 'achery-ui/tokens'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  onPress?: () => void
  disabled?: boolean
  style?: ViewStyle
}

const fontSize: Record<ButtonSize, number> = { sm: 11, md: 12, lg: 13 }
const paddingV: Record<ButtonSize, number> = { sm: spacing.sp2, md: spacing.sp3, lg: spacing.sp4 }
const paddingH: Record<ButtonSize, number> = { sm: spacing.sp4, md: spacing.sp5, lg: spacing.sp6 }

function makeColors(variant: ButtonVariant, tokens: SemanticTokens) {
  switch (variant) {
    case 'primary':
      return { bg: tokens.fg, label: tokens.bg, border: tokens.fg }
    case 'accent':
      return { bg: tokens.accent, label: tokens.accentFg, border: tokens.accent }
    case 'danger':
      return { bg: tokens.danger, label: tokens.bg, border: tokens.danger }
    case 'ghost':
      return { bg: 'transparent', label: tokens.fg, border: tokens.border }
    default:
      return { bg: tokens.surface, label: tokens.fg, border: tokens.border }
  }
}

export function Button({ variant = 'secondary', size = 'md', children, onPress, disabled, style }: ButtonProps) {
  const { tokens } = useTheme()
  const colors = makeColors(variant, tokens)
  const textStyle = {
    color: disabled ? tokens.fgMute : colors.label,
    fontSize: fontSize[size],
    fontWeight: fontWeights.semibold.toString() as any,
    letterSpacing: 0.01 * fontSize[size],
  }

  const isString = typeof children === 'string'

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        {
          backgroundColor: colors.bg,
          borderWidth: 1.5,
          borderColor: disabled ? tokens.borderMute : colors.border,
          paddingVertical: paddingV[size],
          paddingHorizontal: paddingH[size],
          alignSelf: 'flex-start',
          opacity: disabled ? 0.5 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sp2,
        },
        style,
      ]}
    >
      {isString ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
