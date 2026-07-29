import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../theme/ThemeContext'
import { spacing, fontWeights } from 'achery-ui/tokens'

export interface ScreenNavProps {
  /** Called when the leading cancel/back button is tapped. */
  onBack: () => void
  /** Label text for the leading button. @default 'Back' */
  backLabel?: string
  /** Screen title shown centred in the nav bar. */
  title: string
  /** Called when the trailing action button is tapped. */
  onAction?: () => void
  /** Label for the trailing action button. Required when `onAction` is provided. */
  actionLabel?: string
  /** Disables the trailing action button. */
  actionDisabled?: boolean
  /**
   * Drop the built-in status-bar clearance (top padding becomes symmetric with
   * the bottom). Use when the screen already provides safe-area top inset — e.g.
   * wrapping in `<SafeAreaView edges={['top']}>` — so the bar isn't double-padded.
   * @default false
   */
  compact?: boolean
}

/**
 * Navigation bar for modal push screens (Expo Router `Stack`). Renders a
 * leading back button, a centred title (truncates to one line so it never
 * pushes the trailing action off-screen), and an optional trailing action
 * button. Includes built-in status-bar top padding; pass `compact` when the
 * screen already supplies a safe-area top inset to avoid double-padding.
 *
 * @example
 * ```tsx
 * <ScreenNav
 *   onBack={() => router.back()}
 *   title="New task"
 *   onAction={handleSave}
 *   actionLabel="Save"
 *   actionDisabled={isPending}
 * />
 * ```
 */
export const ScreenNav = ({
  onBack,
  backLabel = 'Back',
  title,
  onAction,
  actionLabel,
  actionDisabled = false,
  compact = false,
}: ScreenNavProps) => {
  const { tokens } = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.sp4,
        paddingTop: compact ? spacing.sp3 : 56,
        paddingBottom: spacing.sp3,
        backgroundColor: tokens.surface,
        borderBottomWidth: 1,
        borderBottomColor: tokens.border,
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={{ minWidth: 48 }}
      >
        <Text
          style={{
            color: tokens.fg3,
            fontSize: 12,
            fontWeight: fontWeights.semibold.toString() as any,
            letterSpacing: 0.3,
          }}
        >
          {backLabel}
        </Text>
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        style={{
          // Flex + single line so a long title truncates instead of pushing the
          // trailing action button off-screen.
          flex: 1,
          textAlign: 'center',
          marginHorizontal: spacing.sp3,
          color: tokens.fgMute,
          fontSize: 11,
          fontWeight: fontWeights.semibold.toString() as any,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Text>

      {onAction && actionLabel ? (
        <TouchableOpacity
          onPress={actionDisabled ? undefined : onAction}
          disabled={actionDisabled}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={{ minWidth: 48, alignItems: 'flex-end' }}
        >
          <Text
            style={{
              color: actionDisabled ? tokens.fgMute : tokens.accent,
              fontSize: 12,
              fontWeight: fontWeights.bold.toString() as any,
            }}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ minWidth: 48 }} />
      )}
    </View>
  )
}
