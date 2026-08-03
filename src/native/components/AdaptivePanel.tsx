import { View, TouchableOpacity, Text, ScrollView, useWindowDimensions, type ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import { BottomSheet } from './BottomSheet'

/** Default width (logical pt) at or above which the docked layout is used. */
export const ADAPTIVE_PANEL_BREAKPOINT = 900

export interface AdaptivePanelProps {
  /** Whether the panel is visible. */
  open: boolean
  /** Called when the user dismisses (scrim tap, or the header close button). */
  onClose: () => void
  /** Panel title — a small-caps eyebrow in the header row. */
  title?: string
  /**
   * Show an explicit close button in the header.
   * Always rendered in docked mode, where there is no scrim to tap.
   * @default false
   */
  showClose?: boolean
  children: React.ReactNode
  /** Docked width in pt. Ignored in sheet mode. @default 340 */
  width?: number
  /** Which edge the docked panel attaches to. @default 'right' */
  side?: 'left' | 'right'
  /**
   * Width at or above which the panel docks instead of sliding up.
   * @default ADAPTIVE_PANEL_BREAKPOINT
   */
  breakpoint?: number
  /** Forwarded to BottomSheet in sheet mode — clips content and scrolls. */
  maxContentHeight?: number
  /** Forwarded to BottomSheet in sheet mode. @default true */
  avoidKeyboard?: boolean
  style?: ViewStyle
}

/**
 * AdaptivePanel — a disclosure surface that changes container with screen width.
 *
 * Below `breakpoint` it *is* a {@link BottomSheet}: slides up, scrim, dismiss on
 * tap-away. At or above it, the panel docks as a bordered column in normal
 * layout flow, so it displaces sibling content rather than covering it — the
 * caller keeps working with the panel open, which is the whole point on a
 * tablet or desktop-sized window.
 *
 * Because the docked form participates in layout, it must be rendered *inside*
 * a row-direction container alongside the content it sits next to — not at the
 * end of a screen the way a sheet can be. In sheet mode it renders into a
 * Modal, so its position in the tree doesn't matter.
 *
 * @example
 * ```tsx
 * <View style={{ flex: 1, flexDirection: 'row' }}>
 *   <View style={{ flex: 1 }}>{editor}</View>
 *   <AdaptivePanel open={panel === 'reference'} onClose={close} title="Reference">
 *     {references}
 *   </AdaptivePanel>
 * </View>
 * ```
 */
export const AdaptivePanel = ({
  open,
  onClose,
  title,
  showClose = false,
  children,
  width = 340,
  side = 'right',
  breakpoint = ADAPTIVE_PANEL_BREAKPOINT,
  maxContentHeight,
  avoidKeyboard = true,
  style,
}: AdaptivePanelProps) => {
  const { tokens } = useTheme()
  // useWindowDimensions (not a Dimensions snapshot) so the panel re-evaluates on
  // rotation and on live window resizing, which is continuous on macOS.
  const { width: windowWidth } = useWindowDimensions()
  const docked = windowWidth >= breakpoint

  if (!docked) {
    // Optional props are spread conditionally rather than passed as explicit
    // `undefined` — the package builds with `exactOptionalPropertyTypes`.
    return (
      <BottomSheet
        open={open}
        onClose={onClose}
        showClose={showClose}
        avoidKeyboard={avoidKeyboard}
        {...(title !== undefined && { title })}
        {...(maxContentHeight !== undefined && { maxContentHeight })}
        {...(style !== undefined && { style })}
      >
        {children}
      </BottomSheet>
    )
  }

  // Docked: occupy no space at all when closed, so the sibling content reflows
  // to full width rather than leaving a gap.
  if (!open) return null

  return (
    <View
      style={[
        {
          width,
          flexShrink: 0,
          backgroundColor: tokens.surface,
          // The rule sits on the edge facing the content it displaces.
          borderLeftWidth: side === 'right' ? 2 : 0,
          borderRightWidth: side === 'left' ? 2 : 0,
          borderLeftColor: tokens.border,
          borderRightColor: tokens.border,
        },
        style,
      ]}
    >
      {/* Header. Unlike the sheet, docked mode has no scrim to tap, so a close
          control is always offered regardless of `showClose`. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.sp6,
          paddingVertical: spacing.sp4,
          borderBottomWidth: 1,
          borderBottomColor: tokens.borderMute,
          minHeight: 44,
        }}
      >
        {title ? (
          <Text
            style={{
              fontSize: 10,
              fontWeight: fontWeights.semibold.toString() as any,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: tokens.fg3,
            }}
          >
            {title}
          </Text>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: fontWeights.semibold.toString() as any,
              letterSpacing: 0.5,
              color: tokens.fg3,
              textTransform: 'uppercase',
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  )
}

/**
 * True when the window is wide enough that {@link AdaptivePanel} docks.
 *
 * Callers need this to decide the *trigger* affordance — an overflow menu of
 * rows when narrow, a row of toggle buttons when docked — which lives outside
 * the panel itself.
 */
export const useIsPanelDocked = (breakpoint: number = ADAPTIVE_PANEL_BREAKPOINT) => {
  const { width } = useWindowDimensions()
  return width >= breakpoint
}
