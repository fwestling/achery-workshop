import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  Animated, Modal as RNModal, Pressable, ScrollView, TouchableOpacity, View,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native'
import { spacing } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import { Text } from './Text'

export interface ModalProps {
  /** Whether the dialog is visible. */
  open: boolean
  /**
   * Called when the user dismisses — scrim tap, close button or the Android
   * back button. Not called when `dismissible` is false.
   */
  onClose?: () => void
  /** Title in the display typeface. */
  title?: ReactNode
  /** Secondary line below the title. */
  description?: ReactNode
  /** Body content. A plain string is rendered as body text. */
  children?: ReactNode
  /** Footer row below the body — typically the dialog's buttons. */
  footer?: ReactNode
  /**
   * When false, the dialog can only be closed by its own buttons: the scrim,
   * back button and close button do nothing. Use for questions that must be
   * answered (e.g. a consent prompt).
   * @default true
   */
  dismissible?: boolean
  /**
   * Show the ✕ close button in the header. Ignored when `dismissible` is false.
   * @default true
   */
  showClose?: boolean
  /**
   * Width preset — `sm` 400, `md` 560, `lg` 760 (capped to the screen minus a
   * 24px gutter each side).
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

const widths: Record<NonNullable<ModalProps['size']>, number> = { sm: 400, md: 560, lg: 760 }

/**
 * Modal — centred dialog for questions and short forms. Native counterpart of
 * the web `Modal`.
 *
 * Achery rules:
 * - Square corners, 1.5px ink border, hard stamp shadow
 * - Tracing-paper scrim (ink at 55%)
 * - Fade + 8px rise, ≤220ms
 * - The body scrolls when content outgrows the screen
 *
 * For a yes/no question, prefer `useConfirm()` (ConfirmDialogProvider).
 *
 * @example
 * ```tsx
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Rename list"
 *   footer={<><Button variant="ghost" onPress={close}>Cancel</Button><Button variant="accent" onPress={save}>Save</Button></>}
 * >
 *   <Field label="Name"><Input value={name} onChangeText={setName} /></Field>
 * </Modal>
 * ```
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  dismissible = true,
  showClose = true,
  size = 'sm',
  style,
}: ModalProps) => {
  const { tokens } = useTheme()
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const anim = useRef(new Animated.Value(0)).current
  // Stay mounted through the exit animation, then unmount the RN Modal.
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start()
    } else {
      Animated.timing(anim, { toValue: 0, duration: 160, useNativeDriver: true }).start(({ finished }) => {
        if (finished) setMounted(false)
      })
    }
  }, [open, anim])

  const dismiss = dismissible ? onClose : undefined
  const hasHeader = title != null || description != null || (dismissible && showClose)

  return (
    <RNModal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      // Android back button: required prop; a no-op when not dismissible.
      onRequestClose={() => dismiss?.()}
    >
      <Animated.View
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: tokens.rule,
          opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.55] }),
        }}
      />
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.sp7 }}
        onPress={dismiss}
        accessible={false}
      >
        <Animated.View
          accessibilityViewIsModal
          // Stop taps inside the panel from reaching the scrim.
          onStartShouldSetResponder={() => true}
          style={[
            {
              width: Math.min(widths[size], windowWidth - spacing.sp7 * 2),
              maxHeight: windowHeight - spacing.sp7 * 4,
              backgroundColor: tokens.surface,
              borderWidth: 1.5,
              borderColor: tokens.border,
              borderRadius: 0,
              shadowColor: tokens.fg,
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 6,
              opacity: anim,
              transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
            },
            style,
          ]}
        >
          {hasHeader && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: spacing.sp4,
                paddingHorizontal: spacing.sp7,
                paddingTop: spacing.sp7,
              }}
            >
              <View style={{ flex: 1 }}>
                {title != null && (
                  typeof title === 'string'
                    ? <Text variant="display" size="xl" accessibilityRole="header">{title}</Text>
                    : title
                )}
                {description != null && (
                  typeof description === 'string'
                    ? <Text variant="body" style={{ color: tokens.fg2, marginTop: spacing.sp2 }}>{description}</Text>
                    : description
                )}
              </View>
              {dismissible && showClose && (
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  style={{
                    borderWidth: 1,
                    borderColor: tokens.borderMute,
                    paddingHorizontal: spacing.sp3,
                    paddingVertical: spacing.sp2,
                  }}
                >
                  <Text variant="eyebrow" style={{ color: tokens.fg2 }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <ScrollView
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ padding: spacing.sp7, paddingTop: hasHeader ? spacing.sp5 : spacing.sp7 }}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {typeof children === 'string' ? <Text variant="body">{children}</Text> : children}
          </ScrollView>

          {footer != null && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: spacing.sp3,
                paddingHorizontal: spacing.sp7,
                paddingVertical: spacing.sp5,
                borderTopWidth: 1,
                borderTopColor: tokens.borderMute,
              }}
            >
              {footer}
            </View>
          )}
        </Animated.View>
      </Pressable>
    </RNModal>
  )
}
