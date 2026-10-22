import { describe, expect, it } from 'vitest'
import {
  darkTokens,
  fontSizes,
  letterSpacings,
  lightTokens,
  lineHeights,
  palette,
  radius,
  spacing,
  zIndex,
} from 'achery-ui/tokens'
import { camel, dsColour, dsColourNames, ds, isThemed, oklchToHex, uiName, type DsFamilyName } from './designSystem'

// Drift check: achery-ui mirrors the design system's tokens.json (a copy lives in data/). If this fails,
// the two disagree. Tell Fred which side moved rather than "fixing" either one.

/** Hex colours equal to within one step per channel (OKLCH → sRGB rounding). */
const near = (a: string, b: string) =>
  [1, 3, 5].every((i) => Math.abs(parseInt(a.slice(i, i + 2), 16) - parseInt(b.slice(i, i + 2), 16)) <= 1)

describe('oklchToHex', () => {
  it('matches the conversions achery-ui records in palette.ts comments', () => {
    expect(near(oklchToHex('oklch(44% 0.075 228)'), '#195a73')).toBe(true)
    expect(near(oklchToHex('oklch(45% 0.08 270)'), '#445282')).toBe(true)
  })
})

describe('colours', () => {
  const raw = dsColourNames.filter((n) => !isThemed(n))
  const themed = dsColourNames.filter(isThemed)
  const ui = palette as Record<string, string>
  const tokens = { light: lightTokens as Record<string, string>, dark: darkTokens as Record<string, string> }

  it.each(raw)('palette %s', (name) => {
    // A few single-value design-system tokens are semantic in achery-ui (success, warn, info)
    const key = camel(name)
    const expected = dsColour(name, 'light')
    if (key in ui) expect(near(ui[key]!, expected), `${key}: achery-ui ${ui[key]} vs design system ${expected}`).toBe(true)
    else for (const theme of ['light', 'dark'] as const) expect(tokens[theme][key], `${key} (${theme})`).toBe(expected)
  })

  it.each(themed)('semantic %s', (name) => {
    for (const theme of ['light', 'dark'] as const) {
      const key = camel(name)
      const expected = dsColour(name, theme)
      expect(tokens[theme][key], `${key} (${theme}): achery-ui vs design system`).toBe(expected)
    }
  })
})

describe('scales', () => {
  const px = (n: number | string) => (typeof n === 'number' ? `${n}px` : n)
  const families: [DsFamilyName, Record<string, string | number>, (v: string | number) => string][] = [
    ['spacing', spacing, (v) => (v === 0 ? '0' : px(v))],
    ['radius', radius, String],
    ['fontSize', fontSizes, String],
    ['lineHeight', lineHeights, String],
    ['letterSpacing', letterSpacings, String],
    ['zIndex', zIndex, String],
  ]

  for (const [family, values, format] of families) {
    it(`${family} matches`, () => {
      for (const token of ds[family].tokens) {
        const key = uiName(family, token.name)
        expect(key in values, `${family}.${key} is missing from achery-ui`).toBe(true)
        expect(format(values[key]!), `${family}.${key}`).toBe(String(token.value))
      }
    })
  }
})
