import { TouchableOpacity, View, Text } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useState } from 'react'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import { Glyph } from './Glyph'

export interface CheckboxProps {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  accessibilityLabel?: string
  style?: ViewStyle
}

export const Checkbox = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  accessibilityLabel,
  style,
}: CheckboxProps) => {
  const { tokens } = useTheme()
  const [internal, setInternal] = useState(defaultChecked)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked === true : internal
  const isIndeterminate = checked === 'indeterminate'
  const isOn = isChecked || isIndeterminate

  const toggle = () => {
    if (disabled) return
    const next = !isChecked
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <TouchableOpacity
      onPress={toggle}
      disabled={disabled}
      activeOpacity={0.75}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isIndeterminate ? 'mixed' : isChecked, disabled }}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sp3, opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderWidth: 1.5,
          borderColor: isOn ? tokens.fg : tokens.border,
          backgroundColor: isOn ? tokens.fg : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isIndeterminate && <Glyph name="minus" size={10} color={tokens.bg} />}
        {isChecked && !isIndeterminate && <Glyph name="tick" size={10} color={tokens.bg} />}
      </View>
      {label && (
        <Text style={{ color: tokens.fg, fontSize: 13 }}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}
