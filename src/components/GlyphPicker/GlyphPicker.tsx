import { useState, useRef, useEffect, useCallback } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { GlyphName } from '../../types/components'
import { Glyph } from '../../glyphs/Glyph'
import { GlyphCategories, GlyphAliases, searchGlyphs, glyphLabel } from '../../glyphs/glyphMeta'
import * as styles from './GlyphPicker.css'

const ALL_NAMES = Object.values(GlyphCategories).flat() as GlyphName[]

export interface GlyphPickerProps {
  /** Currently selected glyph, or undefined for none. */
  value?: GlyphName
  /** Called when a glyph is selected or cleared. */
  onChange?: (name: GlyphName | undefined) => void
  /** Placeholder shown when no glyph is selected. */
  placeholder?: string
  /** Disable the picker. */
  disabled?: boolean
  /** Show a clear button in the trigger when a value is selected. */
  clearable?: boolean
  className?: string
}

export const GlyphPicker = ({
  value,
  onChange,
  placeholder = 'Pick a glyph…',
  disabled = false,
  clearable = true,
  className,
}: GlyphPickerProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleSelect = useCallback((name: GlyphName) => {
    onChange?.(name === value ? undefined : name)
    setOpen(false)
  }, [onChange, value])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(undefined)
  }, [onChange])

  const q = query.trim()
  const isSearching = q.length > 0

  const searchResults = isSearching
    ? searchGlyphs(q, ALL_NAMES)
    : null

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? () => {} : setOpen} modal={false}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={[styles.trigger, className].filter(Boolean).join(' ')}
          disabled={disabled}
          aria-label={value ? `Selected glyph: ${glyphLabel(value)}` : placeholder}
        >
          {value ? (
            <Glyph name={value} size={16} />
          ) : (
            <span className={styles.triggerPlaceholder}>{placeholder}</span>
          )}
          {clearable && value && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear glyph"
            >
              <Glyph name="close" size={12} />
            </button>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Content
          className={styles.popoverContent}
          sideOffset={4}
          align="start"
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <div className={styles.searchRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search glyphs…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className={styles.scrollArea}>
            {isSearching ? (
              searchResults && searchResults.length > 0 ? (
                <div className={styles.glyphGrid}>
                  {searchResults.map(({ name }) => (
                    <GlyphButton
                      key={name}
                      name={name}
                      selected={name === value}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>No glyphs match "{query}"</div>
              )
            ) : (
              Object.entries(GlyphCategories).map(([category, names]) => (
                <div key={category}>
                  <div className={styles.categoryHeading}>{category}</div>
                  <div className={styles.glyphGrid}>
                    {(names as readonly GlyphName[]).map(name => (
                      <GlyphButton
                        key={name}
                        name={name}
                        selected={name === value}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  )
}

interface GlyphButtonProps {
  name: GlyphName
  selected: boolean
  onSelect: (name: GlyphName) => void
}

const GlyphButton = ({ name, selected, onSelect }: GlyphButtonProps) => (
  <button
    type="button"
    className={styles.glyphBtn}
    data-selected={selected}
    onClick={() => onSelect(name)}
    title={glyphLabel(name)}
    aria-label={glyphLabel(name)}
    aria-pressed={selected}
  >
    <Glyph name={name} size={16} />
  </button>
)
