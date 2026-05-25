import type { InputHTMLAttributes } from 'react'
import * as styles from './DatePicker.css'

/** Props for the {@link DatePicker} component. */
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Input type.
   * - `date` — ISO date string `YYYY-MM-DD` (default)
   * - `datetime-local` — ISO datetime string `YYYY-MM-DDTHH:mm`
   * @default 'date'
   */
  type?: 'date' | 'datetime-local'
  /** ISO date or datetime string value. */
  value?: string
  /** Called when the date changes — receives the new ISO string (or empty string when cleared). */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  /** Minimum selectable date/datetime. */
  min?: string
  /** Maximum selectable date/datetime. */
  max?: string
  disabled?: boolean
  /** When true, applies error border styling. */
  error?: boolean
  placeholder?: string
  className?: string
}

/**
 * Date (or datetime-local) input component. Styled to match the achery-ui design
 * system — no calendar popover; relies on the browser's native date picker UX.
 *
 * Values are ISO strings. Pass `value` and `onChange` for controlled usage.
 *
 * @example
 * ```tsx
 * // Date-only
 * <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
 *
 * // Datetime-local
 * <DatePicker type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
 * ```
 */
export function DatePicker({
  type = 'date',
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
      type={type}
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
