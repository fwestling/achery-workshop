import { View, type ViewProps, type ViewStyle } from 'react-native'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export type CardVariant = 'flat' | 'stamp'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends ViewProps {
  variant?: CardVariant
  padding?: CardPadding
  header?: React.ReactNode
}

const paddingMap: Record<CardPadding, number> = {
  none: 0,
  sm: spacing.sp5,
  md: spacing.sp8,
  lg: spacing.sp9,
}

export function Card({ variant = 'flat', padding = 'md', header, children, style, ...props }: CardProps) {
  const { tokens } = useTheme()
  const pad = paddingMap[padding]

  const shadow: ViewStyle = variant === 'stamp'
    ? {
        shadowColor: tokens.fg,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      }
    : {}

  return (
    <View
      style={[
        {
          backgroundColor: tokens.surface,
          borderWidth: 1.5,
          borderColor: tokens.border,
        },
        shadow,
        style,
      ]}
      {...props}
    >
      {header && (
        <View style={{ padding: pad, borderBottomWidth: 1, borderBottomColor: tokens.border }}>
          {header}
        </View>
      )}
      <View style={{ padding: pad }}>
        {children}
      </View>
    </View>
  )
}
