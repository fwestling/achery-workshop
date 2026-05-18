import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native'
import { spacing, fontWeights, lineHeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

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

const variantDefaults: Record<TextVariant, { size: TextSize; weight: number; letterSpacing?: number; textTransform?: 'uppercase' | 'none' }> = {
  display: { size: '3xl', weight: fontWeights.black },
  heading: { size: 'xl', weight: fontWeights.bold },
  body: { size: 'md', weight: fontWeights.regular },
  mono: { size: 'sm', weight: fontWeights.regular },
  eyebrow: { size: 'xs', weight: fontWeights.semibold, letterSpacing: 0.08 * 11, textTransform: 'uppercase' },
  caption: { size: 'xs', weight: fontWeights.regular },
}

export function Text({ variant = 'body', size, muted, bold, style, ...props }: TextProps) {
  const { tokens } = useTheme()
  const def = variantDefaults[variant]
  const resolvedSize = size ?? def.size
  const fontSize = fontSizeMap[resolvedSize]
  const color = muted ? tokens.fgMute : tokens.fg
  const fontWeight = bold ? fontWeights.bold : def.weight

  return (
    <RNText
      style={[
        {
          color,
          fontSize,
          fontWeight: fontWeight.toString() as any,
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
