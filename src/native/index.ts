export { NativeThemeProvider, useTheme } from './theme/ThemeContext'
export type { NativeThemeProviderProps, NativeThemeContextValue } from './theme/ThemeContext'

export {
  Text, Button, Card, Badge, Field, Input, MaterialCard, MaterialEyebrow,
  Glyph, GlyphPicker,
  Skeleton, ProgressBar, Checkbox, Toggle, Tabs,
  ToastProvider, useToast,
} from './components/index'
export type {
  TextProps,
  ButtonProps, ButtonVariant, ButtonSize,
  CardProps, CardVariant, CardPadding,
  BadgeProps, BadgeTone, BadgeVariant,
  FieldProps, InputProps,
  NativeMaterialCardProps, MaterialIntensity,
  NativeGlyphProps,
  GlyphPickerProps,
  SkeletonProps,
  ProgressBarProps,
  CheckboxProps,
  ToggleProps,
  TabsProps, TabItem,
  ToastProviderProps, ToastData, ToastOptions,
} from './components/index'

// Glyph utilities — pure TS, work on native
export type { GlyphName } from '../types/components'
export {
  searchGlyphs, glyphLabel, glyphCategory,
  GlyphCategories, GlyphAliases,
} from '../glyphs/glyphMeta'
