import { useState, type ReactNode } from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import type { ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  style?: ViewStyle
}

export const Tabs = ({ items, value, defaultValue, onValueChange, style }: TabsProps) => {
  const { tokens } = useTheme()
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '')
  const active = isControlled ? value! : internal

  const select = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }

  const activeItem = items.find(item => item.value === active)

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ borderBottomWidth: 1, borderBottomColor: tokens.border }}
        contentContainerStyle={{ flexDirection: 'row' }}
      >
        {items.map(item => {
          const isActive = item.value === active
          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => !item.disabled && select(item.value)}
              disabled={item.disabled}
              style={{
                paddingVertical: spacing.sp3,
                paddingHorizontal: spacing.sp4,
                borderBottomWidth: 2.5,
                borderBottomColor: isActive ? tokens.accent : 'transparent',
                opacity: item.disabled ? 0.4 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: isActive ? tokens.fg : tokens.fgMute,
                  fontWeight: isActive ? fontWeights.semibold.toString() as any : 'normal',
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{ paddingTop: spacing.sp4 }}>
        {activeItem?.content}
      </View>
    </View>
  )
}
