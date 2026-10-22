import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { currentGlyphName } from 'achery-ui'
import { ALL_GLYPHS, CATEGORISED, FILE_NAMES, kebabFromComponent, UNCATEGORISED } from './glyphs'

const SVGS = readdirSync(fileURLToPath(new URL('../../../src/glyphs/svg', import.meta.url)))
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''))

describe('kebabFromComponent', () => {
  it('reverses the generator, single-letter words included', () => {
    expect(kebabFromComponent('XCircle')).toBe('x-circle')
    expect(kebabFromComponent('ArrowDownRight')).toBe('arrow-down-right')
    expect(kebabFromComponent('Qr')).toBe('qr')
  })
})

describe('glyph list', () => {
  it('names exactly the SVGs in src/glyphs/svg', () => {
    expect([...FILE_NAMES].sort()).toEqual([...SVGS].sort())
  })

  it('shows every glyph once', () => {
    expect(new Set(ALL_GLYPHS).size).toBe(ALL_GLYPHS.length)
    expect([...ALL_GLYPHS].sort()).toEqual([...SVGS].sort())
  })

  it('every categorised name has an SVG', () => {
    expect(CATEGORISED.filter((n) => !SVGS.includes(n))).toEqual([])
  })

  it('keeps the brand-adjacent glyphs out of the picker but on the page', () => {
    expect(UNCATEGORISED).toContain('hex-arrow-lockup')
    expect(CATEGORISED).toContain('hex-arrow')
  })
})

describe('renamed glyphs', () => {
  it('maps the old names onto files that exist', () => {
    expect(currentGlyphName('mark')).toBe('hex-arrow')
    expect(currentGlyphName('wordmark')).toBe('hex-arrow-lockup')
    expect(SVGS).toContain(currentGlyphName('mark'))
    expect(SVGS).toContain(currentGlyphName('wordmark'))
    expect(currentGlyphName('fern')).toBe('fern')
  })
})
