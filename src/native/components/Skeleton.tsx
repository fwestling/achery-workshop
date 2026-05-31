import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

export interface SkeletonProps {
  /** Number of stacked text-line placeholders. */
  lines?: number
  /**
   * Width of each line. A single value applies to all lines; an array sets per-line widths.
   * Accepts dp numbers or percentage strings ('60%').
   */
  width?: number | string | (number | string)[]
  /** Render a tall rectangular block placeholder instead of lines. */
  block?: boolean
  /** Height of the block in dp. @default 80 */
  height?: number
  style?: ViewStyle
}

const LINE_HEIGHT = 14
const LINE_GAP = 8

const DEFAULT_LINE_WIDTHS = ['100%', '85%', '70%', '90%', '60%']

export const Skeleton = ({ lines = 3, width, block = false, height = 80, style }: SkeletonProps) => {
  const { tokens } = useTheme()
  const opacity = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.8, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    )
    anim.start()
    return () => anim.stop()
  }, [opacity])

  const baseStyle: ViewStyle = {
    backgroundColor: tokens.surface2,
    borderRadius: 2,
  }

  if (block) {
    return (
      <Animated.View style={[baseStyle, { width: '100%', height }, { opacity }, style]} />
    )
  }

  const lineWidths: (number | string)[] = Array.isArray(width)
    ? width
    : width !== undefined
    ? Array(lines).fill(width)
    : DEFAULT_LINE_WIDTHS.slice(0, lines)

  return (
    <View style={[{ gap: LINE_GAP }, style]}>
      {Array.from({ length: lines }).map((_, i) => (
        <Animated.View
          key={i}
          style={[baseStyle, { height: LINE_HEIGHT, width: lineWidths[i] ?? '100%' }, { opacity }]}
        />
      ))}
    </View>
  )
}
