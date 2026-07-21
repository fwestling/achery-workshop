import { useState, type KeyboardEvent } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import * as styles from './TagInput.css'

/** Default tag normalisation: trim, lowercase, collapse internal whitespace.
 *  Matches typical server-side tag normalisation (and the native TagInput). */
const defaultNormalize = (raw: string) => raw.trim().toLowerCase().replace(/\s+/g, ' ')

/** Props for the {@link TagInput} component. */
export interface TagInputProps {
  /** Selected tags (controlled). */
  value: string[]
  onChange: (tags: string[]) => void
  /** Autocomplete suggestions shown as the user types. */
  suggestions?: string[]
  placeholder?: string
  /** Disable adding/removing. */
  disabled?: boolean
  /**
   * Normalise each tag before adding. @default lowercase + trimmed + collapsed
   * whitespace (matches the native `TagInput` and typical server normalisation).
   */
  normalize?: (raw: string) => string
  className?: string
  'aria-label'?: string
}

const MAX_SUGGESTIONS = 6

/**
 * Chips-in-input for editing a list of short string tags: type a value and press
 * Enter to add it as a chip, click × (or Backspace on an empty input) to remove.
 * Autocompletes from `suggestions`. The web counterpart of the native `TagInput`;
 * hard-edged to match the workshop aesthetic, chips use the active accent.
 *
 * @example
 * ```tsx
 * const [tags, setTags] = useState<string[]>(['fiction', 'draft'])
 * <TagInput value={tags} onChange={setTags} suggestions={known} placeholder="Add a tag…" />
 * ```
 */
export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder,
  disabled = false,
  normalize = defaultNormalize,
  className,
  'aria-label': ariaLabel,
}: TagInputProps) {
  const [draft, setDraft] = useState('')

  const add = (raw: string) => {
    const tag = normalize(raw)
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setDraft('')
  }

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index))

  const matches =
    draft.trim().length > 0
      ? suggestions
          .filter((s) => s.includes(normalize(draft)) && !value.includes(s))
          .slice(0, MAX_SUGGESTIONS)
      : []

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      add(draft)
    } else if (e.key === 'Backspace' && !draft && value.length) {
      removeAt(value.length - 1)
    }
  }

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <div className={styles.field}>
        {value.map((tag, i) => (
          <span key={`${tag}-${i}`} className={styles.chip}>
            {tag}
            {!disabled && (
              <button
                type="button"
                className={styles.remove}
                aria-label={`Remove ${tag}`}
                onClick={() => removeAt(i)}
              >
                <Glyph name="close" size={11} />
              </button>
            )}
          </span>
        ))}
        <input
          className={styles.input}
          value={draft}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => add(draft)}
          placeholder={value.length ? '' : placeholder}
          aria-label={ariaLabel}
        />
      </div>

      {matches.length > 0 && (
        <div className={styles.suggestions}>
          {matches.map((s) => (
            <button
              key={s}
              type="button"
              className={styles.suggestion}
              // Use mousedown so it fires before the input's blur closes the list.
              onMouseDown={(e) => {
                e.preventDefault()
                add(s)
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
