import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// The theme's prose-link rule, `[data-achery-root] a:not(.<buttonMarker>)`, scores (0,2,1) and outranks
// any single-class component style. Every component that renders an <a> must either carry Button's marker
// (which the rule excludes) or override the rule with a doubled-class selector, `[data-achery-root] &&`
// at (0,3,0). Without one of those, its links pick up the prose underline and colour.

const componentsDir = fileURLToPath(new URL('../../../src/components', import.meta.url))

const read = (path: string) => readFileSync(path, 'utf8')

const rendersAnchor = (tsx: string) => /<a\b/.test(tsx)

const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const linkComponents = components.filter((name) => {
  const files = readdirSync(`${componentsDir}/${name}`).filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))
  return files.some((f) => rendersAnchor(read(`${componentsDir}/${name}/${f}`)))
})

const css = (name: string) =>
  readdirSync(`${componentsDir}/${name}`)
    .filter((f) => f.endsWith('.css.ts'))
    .map((f) => read(`${componentsDir}/${name}/${f}`))
    .join('\n')

describe('component links and the prose-link rule', () => {
  it('finds the components that render links', () => {
    // If this list changes, the next test checks the newcomer
    expect(linkComponents.sort()).toEqual(['BarChart', 'Button', 'EntityPill', 'Sidebar'])
  })

  it.each(linkComponents)('%s overrides the prose-link rule', (name) => {
    const styles = css(name)
    const usesMarker = /buttonMarker/.test(styles)
    const overrides = /'\[data-achery-root\] &&/.test(styles)
    expect(usesMarker || overrides, `${name}: use buttonMarker or a '[data-achery-root] &&' selector`).toBe(true)
  })
})
