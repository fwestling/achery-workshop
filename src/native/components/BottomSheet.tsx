import { useEffect, useRef } from 'react'
import {
  Animated, Modal, Pressable, TouchableOpacity,
  View, Text, ScrollView,
  type ViewStyle,
} from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'

export interface BottomSheetProps {
  /** Whether the sheet is visible. */
  open: boolean
  /** Called when the user dismisses (scrim tap or close button). */
  onClose: () => void
  /**
   * Sheet title — rendered in the drag-bar row as a small-caps eyebrow.
   * Omit for action-only sheets with no header label.
   */
  title?: string
  /**
   * Show an explicit close button in the header row. Useful when the sheet
   * has a title and the scrim tap alone isn't discoverable enough.
   * @default false
   */
  showClose?: boolean
  children: React.ReactNode
  /**
   * Clip content at this height and make the body scrollable.
   * When unset the sheet grows with its content (up to ~80% of screen height
   * before the OS clips it).
   */
  maxContentHeight?: number
  style?: ViewStyle
}

/**
 * BottomSheet — rung 5 of the disclosure ladder.
 *
 * Slides up from the bottom for action clusters and short edits: row overflow
 * menus, filter panels, quick-add composers.
 *
 * Achery rules:
 * - 2px ink top-rule (not a soft pill handle)
 * - Tracing-paper scrim: semi-transparent ink overlay behind the sheet
 * - Slide animation ≤320ms
 * - Square corners — never iOS soft-corner card
 * - Content rows should use the 44px touch floor (callers' responsibility)
 *
 * @example
 * ```tsx
 * <BottomSheet open={open} onClose={() => setOpen(false)} title="Row actions">
 *   <SheetRow label="Edit" glyph="edit" onPress={handleEdit} />
 *   <SheetRow label="Delete" glyph="trash" onPress={handleDelete} danger />
 * </BottomSheet>
 * ```
 */
export const BottomSheet = ({
  open,
  onClose,
  title,
  showClose = false,
  children,
  maxContentHeight,
  style,
}: BottomSheetProps) => {
  const { tokens } = useTheme()

  const slideAnim = useRef(new Animated.Value(0)).current  // 0 = hidden (translated down), 1 = visible
  const scrimAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scrimAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(scrimAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [open, slideAnim, scrimAnim])

  // Translate from 100% (off-screen below) to 0% (in place).
  // We use a fixed large value since we don't know the sheet height upfront;
  // the sheet slides up from far enough below that it's never partially visible.
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  })

  const scrimOpacity = scrimAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.55],
  })

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Scrim — tracing-paper ink overlay */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: tokens.rule,
          opacity: scrimOpacity,
        }}
      />

      {/* Tapping the scrim dismisses */}
      <Pressable
        style={{ flex: 1 }}
        onPress={onClose}
        accessibilityLabel="Close"
      />

      {/* Sheet panel */}
      <Animated.View
        style={[
          {
            backgroundColor: tokens.surface,
            borderTopWidth: 2,
            borderTopColor: tokens.border,
            // Square corners — spec is explicit about this
            borderRadius: 0,
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        {/* Header row — only rendered when title or close button is present */}
        {(title || showClose) && (
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
            {showClose && (
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
            )}
          </View>
        )}

        {/* Content */}
        {maxContentHeight != null ? (
          <ScrollView
            style={{ maxHeight: maxContentHeight }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View>{children}</View>
        )}
      </Animated.View>
    </Modal>
  )
}

/**
 * A single row inside a BottomSheet — 44px touch target, hairline divider,
 * optional danger tint.
 *
 * @example
 * ```tsx
 * <SheetRow label="Archive" onPress={handleArchive} />
 * <SheetRow label="Delete" onPress={handleDelete} danger />
 * ```
 */
export interface SheetRowProps {
  label: string
  onPress: () => void
  /** Tint the label with the danger colour. */
  danger?: boolean
  /** Render a right-side value or accessory. */
  accessory?: React.ReactNode
  disabled?: boolean
}

export const SheetRow = ({ label, onPress, danger = false, accessory, disabled = false }: SheetRowProps) => {
  const { tokens } = useTheme()
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 44,
        paddingHorizontal: spacing.sp6,
        borderBottomWidth: 1,
        borderBottomColor: tokens.borderMute,
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: danger ? tokens.danger : tokens.fg,
          fontWeight: danger ? fontWeights.semibold.toString() as any : 'normal',
        }}
      >
        {label}
      </Text>
      {accessory}
    </TouchableOpacity>
  )
}

// Local StyleSheet substitute — avoids importing from RN at module level
// purely for absoluteFillObject. This is inlined to keep the dep footprint minimal.
const StyleSheet = {
  absoluteFillObject: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}
