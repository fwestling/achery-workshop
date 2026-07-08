import { useState } from 'react'
import { View, Pressable, TextInput, StyleSheet, type ViewStyle } from 'react-native'
import { Text } from './Text'
import { Glyph } from './Glyph'
import { useTheme } from '../theme/ThemeContext'

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
  disabled?: boolean
  style?: ViewStyle
}

const defaultNormalize = (t: string) => t.trim().toLowerCase().replace(/\s+/g, ' ')

/**
 * Chips-in-input tag field. Type to add; comma or trailing space confirms a
 * chip; return also confirms; Backspace on an empty input removes the last chip.
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
  disabled = false,
  style,
}: TagInputProps) => {
  const { tokens } = useTheme()
  const [text, setText] = useState('')

  const chipBorder = onLeather ? tokens.goldDeep : tokens.border
  const chipText = onLeather ? tokens.materialLeatherFg : tokens.fg
  const placeholderColor = onLeather ? `${tokens.materialLeatherFg}80` : tokens.fgMute

  const add = (raw: string) => {
    const t = normalize(raw)
    if (t && !value.includes(t)) onChange([...value, t])
    setText('')
  }
  const remove = (t: string) => onChange(value.filter((x) => x !== t))

  const handleChange = (t: string) => {
    if (t.endsWith(',') || t.endsWith(' ')) {
      const token = t.slice(0, -1)
      if (token.trim()) add(token)
      else setText('')
      return
    }
    setText(t)
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
          placeholder={value.length === 0 ? placeholder : undefined}
          placeholderTextColor={placeholderColor}
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { color: chipText }]}
        />
      </View>

      {matches.length > 0 && (
        <View style={styles.suggestions}>
          {matches.map((s) => (
            <Pressable
              key={s}
              onPress={() => add(s)}
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
