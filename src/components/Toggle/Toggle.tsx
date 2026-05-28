import * as RadixToggle from '@radix-ui/react-toggle'
import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import type { InputStatus } from '../Input/Input'
import * as styles from './Toggle.css'

/** Props for the {@link Toggle} component. */
export interface ToggleProps {
  /**
   * Controlled pressed state. When provided, the component becomes controlled
   * and `onPressedChange` must be handled externally.
   */
  pressed?: boolean
  /** Initial pressed state for uncontrolled usage. */
  defaultPressed?: boolean
  /** Called when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  /** Optional text label rendered beside the toggle track. */
  label?: ReactNode
  /** Auto-save feedback state. When set to anything other than `'idle'`, a small icon appears after the label. */
  status?: InputStatus
  className?: string
  /** Accessible label when no visible text label is present. */
  'aria-label'?: string
}

/**
 * Binary on/off switch built on Radix Toggle. Supports both controlled and
 * uncontrolled usage via `pressed`/`defaultPressed`.
 *
 * Always provide either a visible `label` or an `aria-label` so the control
 * is accessible to screen readers.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Toggle defaultPressed label="Dark mode" />
 *
 * // Controlled
 * <Toggle pressed={isDark} onPressedChange={setIsDark} label="Dark mode" />
 *
 * // Icon-only (needs aria-label)
 * <Toggle aria-label="Enable notifications" />
 * ```
 */
export function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  label,
  status,
  className,
  'aria-label': ariaLabel,
}: ToggleProps) {
  return (
    <span className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <RadixToggle.Root
        {...(pressed !== undefined ? { pressed } : {})}
        {...(defaultPressed !== undefined ? { defaultPressed } : {})}
        {...(onPressedChange !== undefined ? { onPressedChange } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
        className={styles.track}
      >
        <span className={styles.thumb} />
      </RadixToggle.Root>
      {label && <span className={styles.label}>{label}</span>}
      {status && status !== 'idle' && (
        <span className={[styles.statusIndicator, styles.statusIndicatorVariants[status]].join(' ')} aria-hidden="true">
          <Glyph name={status === 'saving' ? 'spinner' : status === 'saved' ? 'tick' : 'cross'} size={12} />
        </span>
      )}
    </span>
  )
}
