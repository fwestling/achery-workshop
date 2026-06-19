import { useState, useCallback, useMemo } from 'react'
import {
  FlatList, Modal, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { ViewStyle } from 'react-native'
import { spacing, fontWeights } from 'achery-ui/tokens'
import { useTheme } from '../theme/ThemeContext'
import { GlyphCategories, searchGlyphs, glyphLabel } from '../../glyphs/glyphMeta'
import type { GlyphName } from '../../types/components'
import { Glyph } from './Glyph'

const ALL_NAMES = Object.values(GlyphCategories).flat() as GlyphName[]
const NUM_COLUMNS = 8
const CELL_SIZE = 40

export interface GlyphPickerProps {
  value?: GlyphName
  onChange?: (name: GlyphName | undefined) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  style?: ViewStyle
}

export const GlyphPicker = ({
  value,
  onChange,
  placeholder = 'Pick a glyph…',
  disabled = false,
  clearable = true,
  style,
}: GlyphPickerProps) => {
  const { tokens } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo<GlyphName[]>(() => {
    const q = query.trim()
    if (!q) return ALL_NAMES
    return searchGlyphs(q, ALL_NAMES).map(r => r.name)
  }, [query])

  const handleSelect = useCallback((name: GlyphName) => {
    onChange?.(name === value ? undefined : name)
    setOpen(false)
    setQuery('')
  }, [onChange, value])

  const handleClear = useCallback(() => {
    onChange?.(undefined)
  }, [onChange])

  const handleClose = () => {
    setOpen(false)
    setQuery('')
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: spacing.sp2 }, style]}>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessibilityLabel={value ? `Selected glyph: ${glyphLabel(value)}` : placeholder}
        accessibilityRole="button"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 44,
          height: 44,
          paddingHorizontal: spacing.sp3,
          borderWidth: 1.5,
          borderColor: tokens.border,
          backgroundColor: tokens.surface,
          opacity: disabled ? 0.5 : 1,
          gap: spacing.sp2,
        }}
      >
        {value ? (
          <Glyph name={value} size={20} color={tokens.fg} />
        ) : (
          <Text style={{ color: tokens.fgMute, fontSize: 12 }}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {/* Clear button — sibling, not nested inside trigger */}
      {clearable && value && (
        <TouchableOpacity
          onPress={handleClear}
          accessibilityLabel="Clear glyph"
          hitSlop={8}
        >
          <Glyph name="close" size={14} color={tokens.fgMute} />
        </TouchableOpacity>
      )}

      {/* Picker modal */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback>
              <SafeAreaView
                style={{
                  backgroundColor: tokens.surface,
                  borderTopWidth: 1.5,
                  borderTopColor: tokens.border,
                  maxHeight: '75%',
                }}
              >
                {/* Search */}
                <View style={{ padding: spacing.sp4, borderBottomWidth: 1, borderBottomColor: tokens.borderMute }}>
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search glyphs…"
                    placeholderTextColor={tokens.fgMute}
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={{
                      backgroundColor: tokens.bg,
                      borderWidth: 1.5,
                      borderColor: tokens.border,
                      paddingVertical: spacing.sp2,
                      paddingHorizontal: spacing.sp3,
                      fontSize: 13,
                      color: tokens.fg,
                    }}
                  />
                </View>

                {/* Glyph grid */}
                <FlatList
                  data={results}
                  keyExtractor={item => item}
                  numColumns={NUM_COLUMNS}
                  initialNumToRender={40}
                  windowSize={5}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ padding: spacing.sp2 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      accessibilityLabel={glyphLabel(item)}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item === value ? tokens.accent : 'transparent',
                        borderWidth: 1,
                        borderColor: item === value ? tokens.accent : 'transparent',
                        margin: 1,
                      }}
                    >
                      <Glyph
                        name={item}
                        size={18}
                        color={item === value ? tokens.accentFg : tokens.fg2}
                      />
                    </TouchableOpacity>
                  )}
                />
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
