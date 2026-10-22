import { describe, expect, it } from 'vitest'
import { badgeTones, badgeToneNames, darkTokens, lightTokens } from 'achery-ui/tokens'
import { contrast } from './contrast'

// Badge labels are 10px bold: they need 4.5:1. Outline and pill labels are fg2 on whatever the badge sits
// on; a solid badge's label is its tone's onFill on its fill.
const THEMES = { light: lightTokens, dark: darkTokens } as const
const GROUNDS = ['bg', 'bg2', 'surface'] as const

describe('Badge contrast', () => {
  for (const [theme, t] of Object.entries(THEMES)) {
    it.each(GROUNDS)(`${theme}: an outline label reads at 4.5:1 on %s`, (ground) => {
      expect(contrast(t.fg2, t[ground])).toBeGreaterThanOrEqual(4.5)
    })

    it.each(badgeToneNames)(`${theme}: a solid %s label reads at 4.5:1 on its fill`, (tone) => {
      const c = badgeTones[theme as keyof typeof THEMES][tone]
      expect(contrast(c.onFill, c.fill)).toBeGreaterThanOrEqual(4.5)
    })
  }
})
