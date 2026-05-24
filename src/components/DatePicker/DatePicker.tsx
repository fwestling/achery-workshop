import type { InputHTMLAttributes } from 'react'
import * as styles from './DatePicker.css'

/** Props for the {@link DatePicker} component. */
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** ISO date string value (`YYYY-MM-DD`). */
  value?: string
  /** Called when the date changes — receives the new ISO string (or empty string when cleared). */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  /** Minimum selectable date (`YYYY-MM-DD`). */
  min?: string
  /** Maximum selectable date (`YYYY-MM-DD`). */
  max?: string
  disabled?: boolean
  /** When true, applies error border styling. */
  error?: boolean
  placeholder?: string
  className?: string
}

/**
 * Date input component using the native `<input type="date">`. Styled to match
 * the achery-ui design system — no calendar popover; relies on the browser's
 * native date picker UX.
 *
 * Values are ISO date strings (`YYYY-MM-DD`). Pass `value` and `onChange` for
 * controlled usage, or `defaultValue` for uncontrolled.
 *
 * @example
 * ```tsx
 * // Controlled
 * <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
 *
 * // With Field wrapper
 * <Field label="Scheduled date">
 *   <DatePicker value={scheduled} onChange={(e) => setScheduled(e.target.value)} />
 * </Field>
 *
 * // With min/max constraints
 * <DatePicker min={today} max={deadline} value={date} onChange={...} />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  min,
  max,
  disabled,
  error,
  placeholder,
  className,
  ...rest
}: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      placeholder={placeholder}
      data-error={error || undefined}
      className={[styles.input, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}
