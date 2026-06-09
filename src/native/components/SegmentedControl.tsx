import { View, TouchableOpacity, Text } from 'react-native'
import type { ReactNode } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { spacing, fontWeights } from 'achery-ui/tokens'

/** A single option within a native {@link SegmentedControl}. */
export interface NativeSegmentOption<T extends string = string> {
  value: T
  label: ReactNode
}

export interface SegmentedControlProps<T extends string = string> {
  options: NativeSegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  disabled?: boolean
}

/**
 * Inline button group where exactly one option is active.
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   options={[{ value: 'hard', label: 'Hard' }, { value: 'soft', label: 'Soft' }]}
 *   value={depType}
 *   onChange={setDepType}
 * />
 * ```
 */
export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps<T>) => {
  const { tokens } = useTheme()

  return (
    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: tokens.border }}>
      {options.map((opt, i) => {
        const isActive = opt.value === value
        const isLast = i === options.length - 1
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => !disabled && onChange(opt.value)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: spacing.sp2,
              paddingHorizontal: spacing.sp3,
              backgroundColor: isActive ? tokens.fg : tokens.surface,
              borderRightWidth: isLast ? 0 : 1,
              borderRightColor: tokens.border,
              opacity: disabled ? 0.4 : 1,
            }}
          >
            {typeof opt.label === 'string' ? (
              <Text
                style={{
                  color: isActive ? tokens.bg : tokens.fg3,
                  fontSize: 10,
                  fontWeight: fontWeights.semibold.toString() as any,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                {opt.label}
              </Text>
            ) : (
              opt.label
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
