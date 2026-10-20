import { useState, type ReactNode } from 'react'
import { Pressable, View, type ViewStyle } from 'react-native'
import { chartColors, type ChartScale } from 'achery-ui/tokens'
import { formatCompact, labelStep, layoutBars, seriesColors, type BarDatum } from '../../charts/bars'
import { useTheme } from '../theme/ThemeContext'
import { Text } from './Text'

/** The widest a bar gets (a column's width, a row's thickness). */
const BAR_MAX = 24
const AXIS = 36

/** One bar: its category, a value per series, and optionally what pressing it does. */
export interface BarChartDatum extends BarDatum {
  /** Makes the bar a button (e.g. open the list it counts); long-press then shows its values */
  onPress?: () => void
}

export interface BarChartProps {
  /** What the chart shows — its accessibility label */
  label: string
  /** The bars, in display order */
  data: BarChartDatum[]
  /** The series, in a fixed order (their colours follow it). One needs no legend; two or more stack. */
  series: string[]
  /** `categorical` for identity; `ordinal` for ordered series (stub → draft → complete). @default 'categorical' */
  scale?: ChartScale
  /** @default 'vertical' */
  orientation?: 'vertical' | 'horizontal'
  /** Plot height (vertical). @default 180 */
  height?: number
  /** Each bar's total at its tip. @default true for horizontal, false for vertical */
  showValues?: boolean
  /** @default compact: 1,284 · 12.9K */
  formatValue?: (value: number) => string
  style?: ViewStyle
}

/**
 * Bar and stacked-bar chart for React Native, laid out like the web `BarChart`: bars from one baseline,
 * at most 24 thick, 2-point gaps, a rounded end. Tapping a bar shows every series' value beneath the
 * chart (or runs its `onPress`, with a long-press for the values). Each bar reads its values to
 * screen readers.
 */
export const BarChart = ({
  label,
  data,
  series,
  scale = 'categorical',
  orientation = 'vertical',
  height = 180,
  showValues,
  formatValue,
  style,
}: BarChartProps) => {
  const { tokens, dark } = useTheme()
  // The chosen bar, by its label: if the data changes, it's that bar's values or none — never another's
  const [chosenLabel, setChosenLabel] = useState<string | null>(null)
  const [width, setWidth] = useState(0)
  const colors = seriesColors(dark ? chartColors.dark : chartColors.light, series.length, scale)
  const layout = layoutBars(data, series.length)
  const vertical = orientation === 'vertical'
  const values = showValues ?? !vertical
  // Column labels thinned to what fits the measured plot width
  const step = vertical ? labelStep(data.map((d) => d.label), width - AXIS) : 1
  const text = formatValue ?? ((v: number) => formatCompact(v))
  const tickText = formatValue ?? ((v: number) => formatCompact(v, layout.decimals))
  const selected = chosenLabel === null ? null : data.findIndex((d) => d.label === chosenLabel)

  const describe = (d: BarChartDatum, index: number) => {
    const { total, values: drawn } = layout.bars[index]!
    return series.length === 1 ? `${d.label}: ${text(total)}` : `${d.label}: ${text(total)} (${series.map((s, i) => `${s} ${text(drawn[i] ?? 0)}`).join(', ')})`
  }
  const reach = (i: number) => layout.bars[i]!.segments.reduce((a, s) => a + s.size, 0)

  const bar = (i: number) => {
    const { segments } = layout.bars[i]!
    const length = reach(i)
    return (
      <View style={vertical
        ? { flexDirection: 'column-reverse', gap: 2, width: BAR_MAX, maxWidth: '70%', height: `${length * 100}%`, flexShrink: 0 }
        : { flexDirection: 'row', gap: 2, height: 16, width: `${length * 100}%` }}>
        {segments.map((s, k) => {
          const last = k === segments.length - 1
          const rounded = last ? (vertical ? { borderTopLeftRadius: 4, borderTopRightRadius: 4 } : { borderTopRightRadius: 4, borderBottomRightRadius: 4 }) : {}
          return <View key={s.series} style={{ flexGrow: s.size / length, flexBasis: 0, backgroundColor: colors[s.series], ...(vertical ? { minHeight: 1 } : { minWidth: 1 }), ...rounded }} />
        })}
      </View>
    )
  }

  const pressable = (d: BarChartDatum, i: number, children: ReactNode, boxStyle: ViewStyle) => (
    <Pressable
      key={`${d.label}-${i}`}
      style={({ pressed }) => [boxStyle, pressed || selected === i ? { opacity: 0.8 } : null]}
      onPress={d.onPress ?? (() => setChosenLabel((l) => (l === d.label ? null : d.label)))}
      onLongPress={d.onPress ? () => setChosenLabel(d.label) : undefined}
      accessibilityRole={d.onPress ? 'button' : 'text'}
      accessibilityLabel={describe(d, i)}
    >
      {children}
    </Pressable>
  )

  const chosen = selected !== null && selected >= 0 ? data[selected] : undefined

  return (
    <View style={[{ gap: 12 }, style]}>
      {/* The chart's name, for screen readers (a View's own label isn't read unless it hides its children) */}
      <Text accessibilityRole="header" style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}>{label}</Text>
      {series.length > 1 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 4 }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          {series.map((s, i) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: colors[i] }} />
              <Text variant="caption" muted>{s}</Text>
            </View>
          ))}
        </View>
      )}

      {vertical ? (
        <View style={{ paddingTop: values ? 22 : 8 }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <View style={{ flexDirection: 'row', height }}>
            <View style={{ width: AXIS }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
              {layout.ticks.map((t) => (
                <Text key={t} variant="caption" muted style={{ position: 'absolute', right: 6, bottom: `${(t / layout.max) * 100}%`, transform: [{ translateY: 7 }], fontSize: 11 }}>{tickText(t)}</Text>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              {layout.ticks.slice(1).map((t) => <View key={t} style={{ position: 'absolute', left: 0, right: 0, height: 1, bottom: `${(t / layout.max) * 100}%`, backgroundColor: tokens.borderMute, opacity: 0.6 }} />)}
              <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, backgroundColor: tokens.border2 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {data.map((d, i) => pressable(d, i, (
                  <>
                    {values && layout.bars[i]!.total > 0 && <Text variant="caption" muted style={{ position: 'absolute', bottom: `${reach(i) * 100}%`, marginBottom: 4, fontSize: 11 }}>{text(layout.bars[i]!.total)}</Text>}
                    {bar(i)}
                  </>
                ), { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }))}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: AXIS, paddingTop: 6 }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
            {data.map((d, i) => (
              <View key={`${d.label}-${i}`} style={{ flex: 1, alignItems: 'center', overflow: 'visible' }}>
                {i % step === 0 && <Text variant="caption" muted numberOfLines={1} style={{ fontSize: 11, width: step * Math.max(1, (width - AXIS) / Math.max(1, data.length)), textAlign: 'center' }}>{d.label}</Text>}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={{ gap: 4 }}>
          {data.map((d, i) => pressable(d, i, (
            <>
              <Text variant="caption" style={{ width: '32%' }} numberOfLines={1}>{d.label}</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 44 }}>
                {bar(i)}
                {values && <Text variant="caption" muted style={{ fontSize: 11, marginLeft: 6 }}>{text(layout.bars[i]!.total)}</Text>}
              </View>
            </>
          ), { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 28 }))}
        </View>
      )}

      {chosen && selected !== null && (
        <View style={{ gap: 2, padding: 8, borderWidth: 1, borderColor: tokens.border2, backgroundColor: tokens.surface }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          <Text variant="caption" muted>{chosen.label}</Text>
          {series.length > 1 && series.map((s, i) => (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 10, height: 2, borderRadius: 1, backgroundColor: colors[i] }} />
              <Text variant="caption" bold>{text(layout.bars[selected]!.values[i] ?? 0)}</Text>
              <Text variant="caption" muted>{s}</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Text variant="caption" bold>{text(layout.bars[selected]!.total)}</Text>
            <Text variant="caption" muted>{series.length > 1 ? 'in all' : series[0]}</Text>
          </View>
        </View>
      )}
    </View>
  )
}
