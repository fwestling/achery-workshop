import type { ComponentType } from 'react'
import { Glyph, type GlyphName } from 'achery-ui'
import { FILE_NAMES, kebabFromComponent } from '../foundations/glyphs'

// Stands in for achery-ui's src/glyphs/nativeLookup.ts when the site renders native components through
// react-native-web (vite.config.ts aliases it here). The real one require()s each raw .svg for Metro's SVG
// transformer, which a browser bundle can't run. Same drawings, through the web <Glyph>.

type NativeGlyphFC = ComponentType<{ width?: number; height?: number; color?: string }>

const isGlyphName = (name: string): name is GlyphName => FILE_NAMES.includes(name)

const cache = new Map<string, NativeGlyphFC>()

/** Same contract as the real lookup: null for an unknown name, and the native Glyph draws an empty box. */
export const lookupNativeGlyph = (componentName: string): NativeGlyphFC | null => {
  const name = kebabFromComponent(componentName)
  if (!isGlyphName(name)) return null
  const cached = cache.get(name)
  if (cached) return cached
  const WebGlyph: NativeGlyphFC = ({ width = 24, color }) => (
    <span style={{ display: 'inline-flex', color }}>
      <Glyph name={name} size={width} />
    </span>
  )
  cache.set(name, WebGlyph)
  return WebGlyph
}
