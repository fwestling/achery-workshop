import * as RadixCheckbox from '@radix-ui/react-checkbox'
import type { ReactNode } from 'react'
import * as styles from './Checkbox.css.js'

/** Props for the {@link Checkbox} component. */
export interface CheckboxProps {
  /** Controlled checked state. `true` = checked, `false` = unchecked, `'indeterminate'` = partial. */
  checked?: boolean | 'indeterminate'
  /** Initial checked state for uncontrolled usage. */
  defaultChecked?: boolean | 'indeterminate'
  /** Called when the checked state changes. */
  onChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  /** Optional label rendered beside the checkbox. */
  label?: ReactNode
  /** Accessible label when no visible label is present. */
  'aria-label'?: string
  id?: string
  className?: string
}

/**
 * Accessible checkbox built on Radix Checkbox. Supports checked, unchecked,
 * and indeterminate states. Controlled via `checked`/`onChange` or uncontrolled
 * via `defaultChecked`.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Checkbox defaultChecked label="Accept terms" />
 *
 * // Controlled
 * <Checkbox checked={done} onChange={setDone} label="Mark done" />
 *
 * // Indeterminate (e.g. select-all with partial selection)
 * <Checkbox checked="indeterminate" onChange={handleSelectAll} />
 * ```
 */
export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  id,
  className,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  const resolvedId = id ?? (label ? `checkbox-${Math.random().toString(36).slice(2, 7)}` : undefined)

  return (
    <span className={[styles.wrapper, className].filter(Boolean).join(' ')} data-disabled={disabled || undefined}>
      <RadixCheckbox.Root
        {...(checked !== undefined ? { checked } : {})}
        {...(defaultChecked !== undefined ? { defaultChecked } : {})}
        {...(onChange !== undefined ? { onCheckedChange: onChange } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
        {...(resolvedId !== undefined ? { id: resolvedId } : {})}
        className={styles.root}
      >
        <RadixCheckbox.Indicator className={styles.indicator}>
          {checked === 'indeterminate' ? (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
              <rect width="10" height="2" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,4 4,7 9,1" />
            </svg>
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label htmlFor={resolvedId} className={styles.label} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </label>
      )}
    </span>
  )
}
