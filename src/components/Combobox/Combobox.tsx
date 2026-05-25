import { useState, useRef, useId, type KeyboardEvent } from 'react'
import * as styles from './Combobox.css'

/** Props for the {@link Combobox} component. */
export interface ComboboxProps {
  /** Currently selected values. */
  value: string[]
  /** Called when the selection changes. */
  onChange: (value: string[]) => void
  /**
   * Suggested options shown in the dropdown. Strings are used as both label
   * and value. When `allowCustom` is true, the user can also type values not
   * in this list.
   */
  options?: string[]
  /**
   * When true, the user can enter any value — not just options from the list.
   * The typed value is added on Enter or comma.
   * @default false
   */
  allowCustom?: boolean
  placeholder?: string
  disabled?: boolean
  /** When true, applies error border styling. */
  error?: boolean
  className?: string
}

/**
 * Multi-select free-text combobox. Selected values appear as removable chips.
 * Dropdown suggests from `options`; when `allowCustom` is true the user can
 * type any value and confirm with Enter or comma.
 *
 * @example
 * ```tsx
 * // Fixed options only
 * <Combobox
 *   value={tags}
 *   onChange={setTags}
 *   options={['computer', 'outside', 'quick-win']}
 *   placeholder="Add tags…"
 * />
 *
 * // Free-text + suggestions
 * <Combobox
 *   value={contextTags}
 *   onChange={setContextTags}
 *   options={allKnownTags}
 *   allowCustom
 *   placeholder="Add context tags…"
 * />
 * ```
 */
export function Combobox({
  value,
  onChange,
  options = [],
  allowCustom = false,
  placeholder,
  disabled,
  error,
  className,
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const filteredOptions = options.filter((opt) => {
    const lower = inputValue.toLowerCase()
    return opt.toLowerCase().includes(lower) && !value.includes(opt)
  })

  const customOption =
    allowCustom &&
    inputValue.trim() &&
    !options.includes(inputValue.trim()) &&
    !value.includes(inputValue.trim())
      ? inputValue.trim()
      : null

  const visibleOptions = [...filteredOptions, ...(customOption ? [customOption] : [])]
  const showDropdown = open && visibleOptions.length > 0

  function addValue(v: string) {
    const trimmed = v.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInputValue('')
    setActiveIndex(-1)
  }

  function removeValue(v: string) {
    onChange(value.filter((x) => x !== v))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault()
      const active = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined
      if (active) {
        addValue(active)
      } else if (allowCustom) {
        addValue(inputValue)
      } else if (filteredOptions[0]) {
        addValue(filteredOptions[0])
      }
      return
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      const last = value[value.length - 1]
      if (last) removeValue(last)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, visibleOptions.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
      return
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      onClick={() => { if (!disabled) inputRef.current?.focus() }}
    >
      <div
        className={styles.trigger}
        data-open={showDropdown || undefined}
        data-error={error || undefined}
      >
        {value.map((v) => (
          <span key={v} className={styles.chip}>
            {v}
            {!disabled && (
              <button
                type="button"
                className={styles.chipRemove}
                onClick={(e) => { e.stopPropagation(); removeValue(v) }}
                aria-label={`Remove ${v}`}
              >
                ×
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          className={styles.input}
          value={inputValue}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : undefined}
          autoComplete="off"
          onChange={(e) => {
            setInputValue(e.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // short delay so mouseDown on an option fires before blur closes the list
            setTimeout(() => setOpen(false), 150)
          }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? `${id}-list` : undefined}
          aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
        />
      </div>

      {showDropdown && (
        <div id={`${id}-list`} role="listbox" className={styles.popover}>
          {visibleOptions.map((opt, i) => {
            const isSelected = value.includes(opt)
            const isCustom = opt === customOption
            return (
              <div
                key={opt}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                className={styles.option}
                data-active={activeIndex === i || undefined}
                data-selected={isSelected || undefined}
                onMouseDown={(e) => { e.preventDefault(); addValue(opt) }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span>{isCustom ? `Add "${opt}"` : opt}</span>
                {isSelected && <span className={styles.optionCheck}>✓</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Props for the {@link SingleCombobox} component. */
export interface SingleComboboxProps {
  /** Currently selected value, or null for no selection. */
  value: string | null
  /** Called when the selection changes. */
  onChange: (value: string | null) => void
  /** Suggested options. */
  options?: string[]
  /**
   * When true, typed text not in options is accepted on Enter.
   * @default false
   */
  allowCustom?: boolean
  placeholder?: string
  disabled?: boolean
  /** When true, applies error border styling. */
  error?: boolean
  className?: string
}

/**
 * Single-select combobox. Selected value is shown in the input directly (no chips).
 * Backspace/Delete when input is empty clears the current value.
 *
 * @example
 * ```tsx
 * <SingleCombobox value={category} onChange={setCategory} options={categories} />
 * ```
 */
export function SingleCombobox({
  value,
  onChange,
  options = [],
  allowCustom = false,
  placeholder,
  disabled,
  error,
  className,
}: SingleComboboxProps) {
  const [inputValue, setInputValue] = useState(value ?? '')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  )

  const customOption =
    allowCustom &&
    inputValue.trim() &&
    !options.includes(inputValue.trim())
      ? inputValue.trim()
      : null

  const visibleOptions = [...filteredOptions, ...(customOption ? [customOption] : [])]
  const showDropdown = open && visibleOptions.length > 0

  function selectValue(v: string) {
    onChange(v)
    setInputValue(v)
    setOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const active = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined
      if (active) {
        selectValue(active)
      } else if (allowCustom && inputValue.trim()) {
        selectValue(inputValue.trim())
      } else if (filteredOptions[0]) {
        selectValue(filteredOptions[0])
      }
      return
    }
    if ((e.key === 'Backspace' || e.key === 'Delete') && !inputValue) {
      onChange(null)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, visibleOptions.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
      return
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      onClick={() => { if (!disabled) inputRef.current?.focus() }}
    >
      <div
        className={styles.trigger}
        data-open={showDropdown || undefined}
        data-error={error || undefined}
      >
        <input
          ref={inputRef}
          id={id}
          className={styles.input}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setInputValue(e.target.value)
            onChange(null)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setTimeout(() => {
              setOpen(false)
              // Restore display to selected value if user typed something invalid
              setInputValue(value ?? '')
            }, 150)
          }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? `${id}-list` : undefined}
          aria-activedescendant={activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
        />
      </div>

      {showDropdown && (
        <div id={`${id}-list`} role="listbox" className={styles.popover}>
          {visibleOptions.map((opt, i) => {
            const isSelected = value === opt
            const isCustom = opt === customOption
            return (
              <div
                key={opt}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                className={styles.option}
                data-active={activeIndex === i || undefined}
                data-selected={isSelected || undefined}
                onMouseDown={(e) => { e.preventDefault(); selectValue(opt) }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span>{isCustom ? `Add "${opt}"` : opt}</span>
                {isSelected && <span className={styles.optionCheck}>✓</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
