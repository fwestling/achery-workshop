import { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, Animated, Easing, View } from 'react-native'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

interface BaseProps {
  /** @default 'md' */
  size?: 'sm' | 'md'
  /** @default 'neutral' */
  tone?: 'neutral' | 'accent'
  /** What is progressing, read by screen readers with the value ("Upload, 40%"). */
  accessibilityLabel?: string
  style?: ViewStyle
}

interface DeterminateProps extends BaseProps {
  /** Progress value from 0–100. */
  value: number
  indeterminate?: false
}

interface IndeterminateProps extends BaseProps {
  /** Work is happening but how much is left isn't known: a segment slides along the track instead. */
  indeterminate: true
  value?: never
}

export type ProgressBarProps = DeterminateProps | IndeterminateProps

/** The sliding segment's share of the track. */
const SEGMENT = 0.3
const SWEEP_MS = 1200

/** Follows the system Reduce Motion setting. */
const useReduceMotion = () => {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    let live = true
    AccessibilityInfo.isReduceMotionEnabled()
      .then((on) => {
        if (live) setReduce(on)
      })
      .catch(() => {})
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce)
    return () => {
      live = false
      sub.remove()
    }
  }, [])
  return reduce
}

const Sweep = ({ height, color }: { height: number; color: string }) => {
  const reduceMotion = useReduceMotion()
  const [trackWidth, setTrackWidth] = useState(0)
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    progress.setValue(0)
    // With Reduce Motion, a slow pulse in place of the slide
    const anim = reduceMotion
      ? Animated.loop(
          Animated.sequence([
            Animated.timing(progress, { toValue: 1, duration: 900, useNativeDriver: true }),
            Animated.timing(progress, { toValue: 0, duration: 900, useNativeDriver: true }),
          ])
        )
      : Animated.loop(
          Animated.timing(progress, { toValue: 1, duration: SWEEP_MS, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        )
    anim.start()
    return () => anim.stop()
  }, [progress, reduceMotion])

  const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)
  const segmentWidth = trackWidth * SEGMENT

  const motion = reduceMotion
    ? { width: '100%' as const, opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.8] }) }
    : {
        width: segmentWidth,
        transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [-segmentWidth, trackWidth] }) }],
      }

  return (
    <View onLayout={onLayout} style={{ width: '100%', height }}>
      {(reduceMotion || trackWidth > 0) && (
        <Animated.View style={[{ height, backgroundColor: color, borderRadius: height / 2 }, motion]} />
      )}
    </View>
  )
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { size = 'md', tone = 'neutral', accessibilityLabel, style } = props
  const { tokens } = useTheme()
  const height = size === 'sm' ? 4 : 8
  const color = tone === 'accent' ? tokens.accent : tokens.fg
  const pct = props.indeterminate ? undefined : Math.max(0, Math.min(100, props.value))

  return (
    <View
      accessibilityRole="progressbar"
      // aria-value* rather than accessibilityValue: React Native reads both, react-native-web only these.
      // Indeterminate leaves out the value, which is how a progress bar says "busy" (WAI-ARIA)
      {...(pct !== undefined ? { 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pct } : { 'aria-busy': true })}
      {...(accessibilityLabel !== undefined ? { accessibilityLabel } : {})}
      style={[
        {
          width: '100%',
          height,
          backgroundColor: tokens.surface2,
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {pct === undefined ? (
        <Sweep height={height} color={color} />
      ) : (
        <View style={{ width: `${pct}%`, height, backgroundColor: color, borderRadius: height / 2 }} />
      )}
    </View>
  )
}
