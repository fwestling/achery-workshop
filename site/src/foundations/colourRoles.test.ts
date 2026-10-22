import { describe, expect, it } from 'vitest'
import { lightTokens } from 'achery-ui/tokens'
import { checks, SEMANTIC_GROUPS, shownSemanticKeys } from './colourRoles'

// The material tokens (materialLeather, gold, silverDeep…) are shown on the Materials page instead
const MATERIAL = /^(material|gold|silver|copperPatina)/

describe('semantic colour page', () => {
  it('shows every semantic token achery-ui defines', () => {
    const missing = Object.keys(lightTokens).filter((k) => !MATERIAL.test(k) && !shownSemanticKeys.includes(k))
    expect(missing).toEqual([])
  })

  it('reports fg on bg as AAA in both themes', () => {
    const fg = SEMANTIC_GROUPS.flatMap((g) => g.tokens).find((t) => t.key === 'fg')!
    for (const theme of ['light', 'dark'] as const) {
      const onBg = checks('fg', fg.role, theme).find((c) => c.against === 'on bg')!
      expect(onBg.rating).toBe('AAA')
    }
  })
})
