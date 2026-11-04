import { createContext, useContext } from 'react'
import { View, TextInput, Text, type TextInputProps, type ViewStyle } from 'react-native'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface FieldProps {
  label?: string
  hint?: string
  error?: string
  children: React.ReactNode
  style?: ViewStyle
}

/**
 * What a {@link Field} tells the control inside it: the label that names it and the hint or error
 * that describes it. Achery's own controls read it; read it with {@link useFieldControl} in your own.
 */
export interface FieldControl {
  label: string | undefined
  note: string | undefined
}

const FieldContext = createContext<FieldControl | null>(null)

/**
 * For custom controls inside a {@link Field}: the props that name it after the field's label and
 * give its hint or error as the screen-reader hint (React Native has no `aria-describedby`). An
 * explicit `accessibilityLabel` or `accessibilityHint` on the control wins.
 */
export function useFieldControl(own: { accessibilityLabel?: string | undefined; accessibilityHint?: string | undefined } = {}) {
  const field = useContext(FieldContext)
  return {
    accessibilityLabel: own.accessibilityLabel ?? field?.label,
    accessibilityHint: own.accessibilityHint ?? field?.note,
  }
}

/**
 * A label, the control, and a hint or error below it. The control inside is named after the
 * label for screen readers (VoiceOver otherwise reads a text field by its placeholder or value).
 */
export function Field({ label, hint, error, children, style }: FieldProps) {
  const { tokens, font } = useTheme()
  return (
    <FieldContext.Provider value={{ label, note: error ?? hint }}>
    <View style={[{ gap: spacing.sp2 }, style]}>
      {label && (
        <Text style={{ color: tokens.fg, fontSize: 11, ...font('body', 'semibold'), letterSpacing: 0.5, textTransform: 'uppercase' }}>
          {label}
        </Text>
      )}
      {children}
      {error && (
        <Text style={{ color: tokens.danger, fontSize: 11, ...font('body') }}>{error}</Text>
      )}
      {!error && hint && (
        <Text style={{ color: tokens.fgMute, fontSize: 11, ...font('body') }}>{hint}</Text>
      )}
    </View>
    </FieldContext.Provider>
  )
}

export interface InputProps extends TextInputProps {
  error?: boolean
}

export function Input({ error, style, ...props }: InputProps) {
  const { tokens, font } = useTheme()
  const field = useFieldControl(props)
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
          ...font('body'),
        },
        style,
      ]}
      placeholderTextColor={tokens.fgMute}
      {...props}
      {...field}
    />
  )
}

export interface TextareaProps extends TextInputProps {
  error?: boolean
  /** Approximate number of visible lines. @default 4 */
  rows?: number
}

/**
 * Multi-line text input. Passes `multiline` and `textAlignVertical="top"` to
 * the underlying `TextInput`. Wrap in {@link Field} for a label.
 *
 * @example
 * ```tsx
 * <Field label="Notes">
 *   <Textarea rows={5} placeholder="Notes, checklists, anything…" />
 * </Field>
 * ```
 */
export function Textarea({ error, rows = 4, style, ...props }: TextareaProps) {
  const { tokens, font } = useTheme()
  const field = useFieldControl(props)
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      style={[
        {
          backgroundColor: tokens.bg,
          borderWidth: 1.5,
          borderColor: error ? tokens.danger : tokens.border,
          paddingVertical: spacing.sp3,
          paddingHorizontal: spacing.sp5,
          color: tokens.fg,
          fontSize: 14,
          ...font('body'),
          minHeight: rows * 24,
        },
        style,
      ]}
      placeholderTextColor={tokens.fgMute}
      {...props}
      {...field}
    />
  )
}
