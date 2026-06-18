export { NativeThemeProvider, useTheme } from './theme/ThemeContext'
export type { NativeThemeProviderProps, NativeThemeContextValue } from './theme/ThemeContext'

export {
  Text, Button, Card, Badge, Field, Input, Textarea, MaterialCard, MaterialEyebrow,
  Glyph, GlyphPicker,
  Skeleton, ProgressBar, Checkbox, Toggle, Tabs,
  ToastProvider, useToast,
  StatusDot, SegmentedControl, ScreenNav,
  Disclosure, BottomSheet, SheetRow, BottomTabBar,
} from './components/index'
export type {
  TextProps,
  ButtonProps, ButtonVariant, ButtonSize,
  CardProps, CardVariant, CardPadding,
  BadgeProps, BadgeTone, BadgeVariant,
  FieldProps, InputProps, TextareaProps,
  NativeMaterialCardProps, MaterialIntensity,
  NativeGlyphProps,
  GlyphPickerProps,
  SkeletonProps,
  ProgressBarProps,
  CheckboxProps,
  ToggleProps,
  TabsProps, TabItem,
  ToastProviderProps, ToastData, ToastOptions,
  StatusDotProps,
  SegmentedControlProps, NativeSegmentOption,
  ScreenNavProps,
  DisclosureProps,
  BottomSheetProps, SheetRowProps,
  BottomTabBarProps, BottomTabItem,
} from './components/index'

// Glyph utilities — pure TS, work on native
export type { GlyphName } from '../types/components'
export {
  searchGlyphs, glyphLabel, glyphCategory,
  GlyphCategories, GlyphAliases,
} from '../glyphs/glyphMeta'
