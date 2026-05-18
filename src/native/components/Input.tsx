import { View, TextInput, Text, type TextInputProps, type ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface FieldProps {
  label?: string
  hint?: string
  error?: string
  children: React.ReactNode
  style?: ViewStyle
}

export function Field({ label, hint, error, children, style }: FieldProps) {
  const { tokens } = useTheme()
  return (
    <View style={[{ gap: spacing.sp2 }, style]}>
      {label && (
        <Text style={{ color: tokens.fg, fontSize: 11, fontWeight: fontWeights.semibold.toString() as any, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {label}
        </Text>
      )}
      {children}
      {error && (
        <Text style={{ color: tokens.danger, fontSize: 11 }}>{error}</Text>
      )}
      {!error && hint && (
        <Text style={{ color: tokens.fgMute, fontSize: 11 }}>{hint}</Text>
      )}
    </View>
  )
}

export interface InputProps extends TextInputProps {
  error?: boolean
  style?: ViewStyle
}

export function Input({ error, style, ...props }: InputProps) {
  const { tokens } = useTheme()
  return (
    <TextInput
      style={[
        {
          backgroundColor: tokens.bg,
          borderWidth: 1.5,
          borderColor: error ? tokens.danger : tokens.border,
          paddingVertical: spacing.sp3,
          paddingHorizontal: spacing.sp5,
          color: tokens.fg,
          fontSize: 14,
        },
        style,
      ]}
      placeholderTextColor={tokens.fgMute}
      {...props}
    />
  )
}
