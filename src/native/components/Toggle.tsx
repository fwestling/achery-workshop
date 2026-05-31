import { useEffect, useRef, useState } from 'react'
import { Animated, TouchableOpacity, View, Text } from 'react-native'
import type { ViewStyle } from 'react-native'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface ToggleProps {
  /**
   * Controlled pressed state.
   * Note: native uses `value`/`onChange` rather than the web's `pressed`/`onPressedChange`.
   */
  value?: boolean
  defaultValue?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  label?: string
  accessibilityLabel?: string
  style?: ViewStyle
}

const TRACK_WIDTH = 44
const TRACK_HEIGHT = 24
const THUMB_SIZE = 18
const THUMB_OFF = 2
const THUMB_ON = TRACK_WIDTH - THUMB_SIZE - 2

export const Toggle = ({
  value,
  defaultValue = false,
  onChange,
  disabled = false,
  label,
  accessibilityLabel,
  style,
}: ToggleProps) => {
  const { tokens } = useTheme()
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue)
  const isOn = isControlled ? value! : internal

  const thumbAnim = useRef(new Animated.Value(isOn ? THUMB_ON : THUMB_OFF)).current

  useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: isOn ? THUMB_ON : THUMB_OFF,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }, [isOn, thumbAnim])

  const toggle = () => {
    if (disabled) return
    const next = !isOn
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <TouchableOpacity
      onPress={toggle}
      disabled={disabled}
      activeOpacity={0.85}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn, disabled }}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sp3, opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: isOn ? tokens.accent : tokens.border,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: tokens.bg,
            transform: [{ translateX: thumbAnim }],
          }}
        />
      </View>
      {label && (
        <Text style={{ color: tokens.fg, fontSize: 13 }}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}
