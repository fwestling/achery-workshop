import type { ReactNode } from 'react'
import * as styles from './SegmentedControl.css'

/** A single option within a {@link SegmentedControl}. */
export interface SegmentOption<T extends string = string> {
  value: T
  label: ReactNode
}

/** Props for the {@link SegmentedControl} component. */
export interface SegmentedControlProps<T extends string = string> {
  /** Available options. */
  options: SegmentOption<T>[]
  /** Currently selected value. */
  value: T
  /** Called when the user selects a segment. */
  onChange: (value: T) => void
  /**
   * Size preset.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /** Disable all segments. */
  disabled?: boolean
  className?: string
}

/**
 * Inline button group where exactly one option is active. Use for mutually
 * exclusive view modes or filter toggles where showing all options simultaneously
 * is worth the space.
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
 *   value={period}
 *   onChange={setPeriod}
 * />
 * ```
 */
export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  className,
}: SegmentedControlProps<T>) => {
  const sizeClass = size === 'sm' ? styles.segmentSm : size === 'lg' ? styles.segmentLg : undefined

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={[
            styles.segment,
            sizeClass,
            opt.value === value && styles.segmentActive,
          ].filter(Boolean).join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
