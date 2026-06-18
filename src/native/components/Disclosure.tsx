import { useRef, useState } from 'react'
import { Animated, TouchableOpacity, View, Text, type ViewStyle, type LayoutChangeEvent } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface DisclosureProps {
  /** Label shown on the toggle row — small-caps, eyebrow style. */
  label: string
  /** Content revealed when open. */
  children: React.ReactNode
  /** Start open. @default false */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  /** Called when the user toggles. */
  onOpenChange?: (open: boolean) => void
  /** Horizontal padding applied to the content area. @default sp6 (16px) */
  contentPaddingHorizontal?: number
  style?: ViewStyle
}

/**
 * Disclosure — rung 3 of the disclosure ladder.
 *
 * Secondary content (scratchpad, activity, context links) folds behind a
 * labelled toggle. Closed by default. The toggle row is a 44px-minimum hit
 * area; content animates open/closed with a height transition.
 *
 * Achery rules: square indicator (not a chevron bubble), small-caps label,
 * 1px ink hairline above the toggle row when not at the top of a container.
 *
 * @example
 * ```tsx
 * <Disclosure label="Scratchpad">
 *   <Textarea placeholder="Half-baked thoughts…" />
 * </Disclosure>
 * ```
 */
export const Disclosure = ({
  label,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  contentPaddingHorizontal,
  style,
}: DisclosureProps) => {
  const { tokens } = useTheme()
  const isControlled = open !== undefined
  const [internal, setInternal] = useState(defaultOpen)
  const isOpen = isControlled ? open! : internal

  // Height animation — we measure the content's natural height first, then
  // animate between 0 and that measured height.
  const [contentHeight, setContentHeight] = useState(0)
  const heightAnim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current
  const opacityAnim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current

  const toggle = () => {
    const next = !isOpen
    if (!isControlled) setInternal(next)
    onOpenChange?.(next)
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: next ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: next ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const onContentLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height
    if (h > 0 && h !== contentHeight) {
      setContentHeight(h)
      // If already open, snap the anim value so the measured height takes effect
      if (isOpen) heightAnim.setValue(1)
    }
  }

  const padH = contentPaddingHorizontal ?? spacing.sp6
  const indicatorRotation = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  })

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityLabel={label}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 44,
          paddingHorizontal: padH,
          borderTopWidth: 1,
          borderTopColor: tokens.borderMute,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: fontWeights.semibold.toString() as any,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: tokens.fg3,
          }}
        >
          {label}
        </Text>
        {/* Square rotated indicator — achery style, not a chevron bubble */}
        <Animated.View
          style={{
            width: 7,
            height: 7,
            borderRightWidth: 1.5,
            borderBottomWidth: 1.5,
            borderColor: tokens.fg3,
            transform: [{ rotate: indicatorRotation }],
            marginRight: 2,
            marginTop: isOpen ? 0 : -2,
          }}
        />
      </TouchableOpacity>

      <Animated.View
        style={{
          overflow: 'hidden',
          height: contentHeight > 0
            ? heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, contentHeight] })
            : undefined,
          opacity: opacityAnim,
        }}
      >
        {/* Measured via an absolutely-positioned ghost so the animation has a target height */}
        <View
          onLayout={onContentLayout}
          style={{
            paddingHorizontal: padH,
            paddingVertical: spacing.sp4,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  )
}
