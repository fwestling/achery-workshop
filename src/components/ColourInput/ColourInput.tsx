import { useEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import * as styles from './ColourInput.css'

function normalizeHex(raw: string): string | null {
  const stripped = raw.replace(/^#+/, '').toLowerCase()
  if (/^[0-9a-f]{3}$/.test(stripped)) {
    const [r, g, b] = stripped
    return `#${r}${r}${g}${g}${b}${b}`
  }
  if (/^[0-9a-f]{6}$/.test(stripped)) return `#${stripped}`
  return null
}

/** Props for the {@link ColourInput} component. */
export interface ColourInputProps {
  /** Current hex colour value, e.g. `'#c46a3a'`. Defaults to `'#000000'`. */
  value?: string
  /** Called with the new hex colour when the value changes. */
  onChange?: (value: string) => void
  /** When true, applies error border colouring. Pair with {@link Field} `error` prop. */
  error?: boolean
  /** Placeholder shown in the text field when empty. */
  placeholder?: string
  /** Disable the input. */
  disabled?: boolean
  className?: string
  style?: HTMLAttributes<HTMLDivElement>['style']
}

/**
 * Hex colour picker combining a native `<input type="color">` swatch and a
 * text field for direct hex entry. Normalises 3-digit shorthand on blur.
 * Wrap in {@link Field} to add a label and hint/error text.
 *
 * @example
 * ```tsx
 * <Field label="Category colour">
 *   <ColourInput value={colour} onChange={setColour} />
 * </Field>
 * ```
 */
export const ColourInput = ({
  value = '#000000',
  onChange,
  error = false,
  placeholder = '000000',
  disabled = false,
  className,
  style,
}: ColourInputProps) => {
  const [textValue, setTextValue] = useState(value.replace(/^#/, ''))

  useEffect(() => {
    setTextValue(value.replace(/^#/, ''))
  }, [value])

  const handleTextChange = (raw: string) => {
    const stripped = raw.replace(/^#+/, '')
    setTextValue(stripped)
    if (/^[0-9a-fA-F]{6}$/.test(stripped)) {
      onChange?.(`#${stripped.toLowerCase()}`)
    }
  }

  const handleTextBlur = () => {
    const normalized = normalizeHex(textValue)
    if (normalized) {
      onChange?.(normalized)
    } else {
      setTextValue(value.replace(/^#/, ''))
    }
  }

  const handleSwatchChange = (hex: string) => {
    onChange?.(hex)
    setTextValue(hex.replace(/^#/, ''))
  }

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} style={style}>
      <input
        type="color"
        value={value}
        disabled={disabled}
        onChange={(e) => handleSwatchChange(e.target.value)}
        className={styles.swatch}
      />
      <div className={[styles.textWrapper, error && styles.textWrapperError].filter(Boolean).join(' ')}>
        <span className={styles.prefix} aria-hidden="true">#</span>
        <input
          type="text"
          value={textValue}
          disabled={disabled}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={handleTextBlur}
          placeholder={placeholder.replace(/^#/, '')}
          maxLength={7}
          className={styles.textInput}
          aria-label="Hex colour"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
