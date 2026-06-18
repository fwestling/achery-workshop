import { useState } from 'react'
import { View, TouchableOpacity, Text, type ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import type { GlyphName } from '../../types/components'
import { useTheme } from '../theme/ThemeContext'
import { Glyph } from './Glyph'
import { BottomSheet, SheetRow } from './BottomSheet'

export interface BottomTabItem {
  /** Unique key for this tab. */
  value: string
  /** Label shown beneath the icon. */
  label: string
  /** Glyph name from the Achery icon set. */
  glyph: GlyphName
  /** Hide from the bar entirely (still reachable via deep link / programmatic nav). */
  hidden?: boolean
}

export interface BottomTabBarProps {
  /** All tabs. Up to 4 are shown directly; any beyond 4 overflow into "More". */
  items: BottomTabItem[]
  /** Currently active tab value. */
  value: string
  /** Called when the user selects a tab (including items from the More sheet). */
  onValueChange: (value: string) => void
  /**
   * Safe-area bottom inset in px — add your device's home indicator height here.
   * Typically 34 on modern iPhones, 0 on Android. Pass via `useSafeAreaInsets().bottom`.
   * @default 0
   */
  safeAreaBottom?: number
  style?: ViewStyle
}

const BAR_HEIGHT = 56
const MAX_VISIBLE = 4

/**
 * BottomTabBar — promotion-ladder equivalent of the desk sidebar.
 *
 * Renders up to 4 primary tabs directly. When there are more than 4 items,
 * the last slot becomes a "More" button that opens a {@link BottomSheet}
 * listing the overflow tabs.
 *
 * Achery rules:
 * - 56px bar height + safe-area inset
 * - 1px ink top border (no blur/shadow)
 * - Active tab: accent 2px top stripe + accent glyph + accent label
 * - Inactive: muted fg
 * - Square — no rounded pill on the active indicator
 *
 * Intended to be positioned at the bottom of the screen, typically inside
 * an Expo Router layout's `<Tabs>` replacement or a manual `position: absolute` wrapper.
 *
 * @example
 * ```tsx
 * const tabs: BottomTabItem[] = [
 *   { value: 'today',    label: 'Today',    glyph: 'calendar' },
 *   { value: 'projects', label: 'Projects', glyph: 'folder' },
 *   { value: 'metrics',  label: 'Metrics',  glyph: 'chart-bar' },
 *   { value: 'inbox',    label: 'Inbox',    glyph: 'inbox' },
 *   { value: 'settings', label: 'Settings', glyph: 'settings' },
 * ]
 *
 * <BottomTabBar items={tabs} value={activeTab} onValueChange={setActiveTab} safeAreaBottom={34} />
 * ```
 */
export const BottomTabBar = ({
  items,
  value,
  onValueChange,
  safeAreaBottom = 0,
  style,
}: BottomTabBarProps) => {
  const { tokens } = useTheme()
  const [moreOpen, setMoreOpen] = useState(false)

  const visibleItems = items.slice(0, MAX_VISIBLE)
  const overflowItems = items.slice(MAX_VISIBLE)
  const hasOverflow = overflowItems.length > 0

  // If there's overflow, the 4th slot is reserved for "More"
  const primaryItems = hasOverflow ? visibleItems.slice(0, MAX_VISIBLE - 1) : visibleItems

  const handleOverflowSelect = (tabValue: string) => {
    setMoreOpen(false)
    onValueChange(tabValue)
  }

  const overflowActive = overflowItems.some(item => item.value === value)

  return (
    <>
      <View
        style={[
          {
            flexDirection: 'row',
            height: BAR_HEIGHT + safeAreaBottom,
            backgroundColor: tokens.surface,
            borderTopWidth: 1,
            borderTopColor: tokens.border,
          },
          style,
        ]}
      >
        {primaryItems.map(item => (
          <TabButton
            key={item.value}
            item={item}
            active={item.value === value}
            onPress={() => onValueChange(item.value)}
            tokens={tokens}
          />
        ))}

        {hasOverflow && (
          <MoreButton
            active={overflowActive}
            onPress={() => setMoreOpen(true)}
            tokens={tokens}
          />
        )}
      </View>

      {hasOverflow && (
        <BottomSheet
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          title="More"
        >
          {overflowItems.map(item => (
            <SheetRow
              key={item.value}
              label={item.label}
              onPress={() => handleOverflowSelect(item.value)}
              accessory={
                item.value === value ? (
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: tokens.accent,
                      transform: [{ rotate: '45deg' }],
                    }}
                  />
                ) : undefined
              }
            />
          ))}
        </BottomSheet>
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Internal pieces
// ---------------------------------------------------------------------------

interface TabButtonProps {
  item: BottomTabItem
  active: boolean
  onPress: () => void
  tokens: ReturnType<typeof useTheme>['tokens']
}

const TabButton = ({ item, active, onPress, tokens }: TabButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    accessibilityRole="tab"
    accessibilityState={{ selected: active }}
    accessibilityLabel={item.label}
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sp2,
      paddingTop: spacing.sp2,
      // 2px accent top stripe on active — square, not a pill
      borderTopWidth: 2,
      borderTopColor: active ? tokens.accent : 'transparent',
    }}
  >
    <Glyph
      name={item.glyph}
      size={20}
      color={active ? tokens.accent : tokens.fgMute}
    />
    <Text
      style={{
        fontSize: 10,
        fontWeight: (active ? fontWeights.semibold : fontWeights.regular).toString() as any,
        color: active ? tokens.accent : tokens.fgMute,
        letterSpacing: 0.3,
      }}
    >
      {item.label}
    </Text>
  </TouchableOpacity>
)

interface MoreButtonProps {
  active: boolean
  onPress: () => void
  tokens: ReturnType<typeof useTheme>['tokens']
}

const MoreButton = ({ active, onPress, tokens }: MoreButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    accessibilityRole="button"
    accessibilityLabel="More"
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sp2,
      paddingTop: spacing.sp2,
      borderTopWidth: 2,
      borderTopColor: active ? tokens.accent : 'transparent',
    }}
  >
    <Glyph name="more" size={20} color={active ? tokens.accent : tokens.fgMute} />
    <Text
      style={{
        fontSize: 10,
        fontWeight: fontWeights.regular.toString() as any,
        color: active ? tokens.accent : tokens.fgMute,
        letterSpacing: 0.3,
      }}
    >
      More
    </Text>
  </TouchableOpacity>
)
