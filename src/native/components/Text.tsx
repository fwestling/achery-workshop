import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native'
import { lineHeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import type { FontRole, FontWeightName } from '../theme/fonts'

type TextVariant = 'display' | 'heading' | 'body' | 'mono' | 'eyebrow' | 'caption'
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export interface TextProps extends RNTextProps {
  variant?: TextVariant
  size?: TextSize
  muted?: boolean
  bold?: boolean
}

const fontSizeMap: Record<TextSize, number> = {
  xs: 11, sm: 12, md: 14, lg: 16, xl: 20, '2xl': 26, '3xl': 34,
}

const variantDefaults: Record<
  TextVariant,
  { size: TextSize; role: FontRole; weight: FontWeightName; letterSpacing?: number; textTransform?: 'uppercase' | 'none' }
> = {
  display: { size: '3xl', role: 'display', weight: 'black' },
  heading: { size: 'xl', role: 'display', weight: 'bold' },
  body: { size: 'md', role: 'body', weight: 'regular' },
  mono: { size: 'sm', role: 'mono', weight: 'regular' },
  eyebrow: { size: 'xs', role: 'body', weight: 'semibold', letterSpacing: 0.08 * 11, textTransform: 'uppercase' },
  caption: { size: 'xs', role: 'body', weight: 'regular' },
}

export function Text({ variant = 'body', size, muted, bold, style, ...props }: TextProps) {
  const { tokens, font } = useTheme()
  const def = variantDefaults[variant]
  const resolvedSize = size ?? def.size
  const fontSize = fontSizeMap[resolvedSize]
  const color = muted ? tokens.fgMute : tokens.fg
  const typeface = font(def.role, bold ? 'bold' : def.weight)

  return (
    <RNText
      style={[
        {
          color,
          fontSize,
          ...typeface,
          lineHeight: fontSize * lineHeights.base,
          letterSpacing: def.letterSpacing,
          textTransform: def.textTransform,
        },
        style,
      ]}
      {...props}
    />
  )
}
