import * as RadixToggle from '@radix-ui/react-toggle'
import type { ReactNode } from 'react'
import * as styles from './Toggle.css.js'

export interface ToggleProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  label?: ReactNode
  className?: string
  'aria-label'?: string
}

export function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  label,
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
    </span>
  )
}
