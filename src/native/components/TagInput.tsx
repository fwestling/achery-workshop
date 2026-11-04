import { useState } from 'react'
import { View, Pressable, TextInput, StyleSheet, type TextInputProps, type ViewStyle } from 'react-native'
import { Text } from './Text'
import { Glyph } from './Glyph'
import { useFieldControl } from './Input'
import { useTheme } from '../theme/ThemeContext'
import { addTags, splitTags } from '../../tags/splitTags'

export interface TagInputProps {
  /** Selected tags (controlled). */
  value: string[]
  onChange: (tags: string[]) => void
  /** Autocomplete suggestions shown as the user types. */
  suggestions?: string[]
  placeholder?: string
  /**
   * Ghost-on-leather styling — gold-deep chip borders + cream text, for use over
   * the leather material (e.g. a shoot-mode HUD).
   */
  onLeather?: boolean
  /**
   * Normalise each tag before adding. @default lowercase + trimmed + collapsed
   * whitespace (matches typical server-side tag normalisation).
   */
  normalize?: (raw: string) => string
  /**
   * Characters that confirm the tag being typed. Return always confirms. Leave out the space
   * for tags that are phrases ("the Captain"). @default [',', ' ']
   */
  separators?: string[]
  /**
   * How the keyboard capitalises what's typed. Use `'words'` (or `'sentences'`) for tags that are
   * names, so the keyboard offers capitals; `normalize` must keep case too. @default 'none'
   */
  autoCapitalize?: TextInputProps['autoCapitalize']
  disabled?: boolean
  /** Names the text field for screen readers. @default the placeholder */
  accessibilityLabel?: string
  style?: ViewStyle
}

const defaultNormalize = (t: string) => t.trim().toLowerCase().replace(/\s+/g, ' ')
const DEFAULT_SEPARATORS = [',', ' ']

/**
 * Chips-in-input tag field. Type to add; a separator (comma or space by default,
 * see `separators`) confirms a chip, and pasted text splits at each one; return also confirms; Backspace on an empty input removes the last chip.
 * Autocompletes from `suggestions`.
 *
 * @example
 * ```tsx
 * <Field label="Tags">
 *   <TagInput value={tags} onChange={setTags} suggestions={known} placeholder="Add tags…" />
 * </Field>
 * ```
 */
export const TagInput = ({
  value,
  onChange,
  suggestions = [],
  placeholder,
  onLeather = false,
  normalize = defaultNormalize,
  separators = DEFAULT_SEPARATORS,
  autoCapitalize = 'none',
  disabled = false,
  accessibilityLabel,
  style,
}: TagInputProps) => {
  const { tokens, font } = useTheme()
  const [text, setText] = useState('')
  // Inside a Field, named after its label; otherwise by the placeholder
  const field = useFieldControl({ accessibilityLabel })

  const chipBorder = onLeather ? tokens.goldDeep : tokens.border
  const chipText = onLeather ? tokens.materialLeatherFg : tokens.fg
  const placeholderColor = onLeather ? `${tokens.materialLeatherFg}80` : tokens.fgMute

  const addAll = (raws: string[]) => {
    const next = addTags(value, raws, normalize)
    if (next.length !== value.length) onChange(next)
  }
  const add = (raw: string) => {
    addAll([raw])
    setText('')
  }
  const remove = (t: string) => onChange(value.filter((x) => x !== t))

  // A separator confirms what's before it, wherever it is: typed at the end or in pasted text
  const handleChange = (t: string) => {
    const { confirmed, rest } = splitTags(t, separators)
    if (confirmed.length) addAll(confirmed)
    setText(rest)
  }

  const matches = text.trim()
    ? suggestions.filter((s) => s.includes(normalize(text)) && !value.includes(s)).slice(0, 6)
    : []

  return (
    <View style={style}>
      <View style={[styles.field, { borderColor: chipBorder }]}>
        {value.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => !disabled && remove(tag)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${tag}`}
            accessibilityState={{ disabled: !!disabled }}
            style={[styles.chip, { borderColor: chipBorder }]}
          >
            <Text variant="caption" style={{ color: chipText }}>
              {tag}
            </Text>
            <Glyph name="cross" size={10} color={chipText} />
          </Pressable>
        ))}
        <TextInput
          value={text}
          editable={!disabled}
          onChangeText={handleChange}
          onSubmitEditing={() => text.trim() && add(text)}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Backspace' && !text && value.length) {
              const last = value[value.length - 1]
              if (last) remove(last)
            }
          }}
          accessibilityLabel={field.accessibilityLabel ?? placeholder}
          accessibilityHint={field.accessibilityHint}
          placeholder={value.length === 0 ? placeholder : undefined}
          placeholderTextColor={placeholderColor}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={[styles.input, { color: chipText, ...font('body') }]}
        />
      </View>

      {matches.length > 0 && (
        <View style={styles.suggestions}>
          {matches.map((s) => (
            <Pressable
              key={s}
              onPress={() => add(s)}
              accessibilityRole="button"
              accessibilityLabel={`Add ${s}`}
              style={[styles.suggestion, { borderColor: tokens.borderMute }]}
            >
              <Text variant="caption" style={{ color: tokens.fg2 }}>
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    padding: 8,
    minHeight: 44,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: { flex: 1, minWidth: 80, paddingVertical: 4, fontSize: 14 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  suggestion: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4 },
})
