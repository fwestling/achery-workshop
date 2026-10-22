import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import type { StoryMeta } from '../src/stories/csf'
import { buildStoryIndex, readStoryMeta } from './storyIndex'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
const nativeDir = fileURLToPath(new URL('../../src/native', import.meta.url))

describe('readStoryMeta', () => {
  it('reads a static title and description, concatenations included', () => {
    const text = `const meta = {
  title: 'Native/Thing',
  parameters: { docs: { description: { component: 'First, ' + 'second.' } } },
} satisfies Meta<typeof Thing>
export default meta`
    expect(readStoryMeta('x.stories.tsx', text)).toEqual({
      file: 'x.stories.tsx',
      title: 'Native/Thing',
      description: 'First, second.',
    })
  })

  it('needs a static title', () => {
    expect(() => readStoryMeta('x.stories.tsx', 'const meta = { title: name }\nexport default meta')).toThrow(/static `title`/)
  })

  it('refuses a description it cannot read statically', () => {
    const text = "const meta = { title: 'A/B', parameters: { docs: { description: { component: describe() } } } }\nexport default meta"
    expect(() => readStoryMeta('x.stories.tsx', text)).toThrow(/static string/)
  })
})

describe('the native story index', () => {
  // The real metas, imported the way the build deliberately doesn't
  const metas = import.meta.glob<StoryMeta>('../../src/native/**/*.stories.tsx', { eager: true, import: 'default' })

  it('matches every native story module', () => {
    const index = buildStoryIndex(repoRoot, nativeDir)
    const actual = Object.entries(metas)
      .map(([path, meta]) => {
        const description = meta.parameters?.docs?.description?.component
        return { file: path.replace(/^(\.\.\/)+/, ''), title: meta.title, ...(description ? { description } : {}) }
      })
      .sort((a, b) => a.file.localeCompare(b.file))
    expect(index).toEqual(actual)
    expect(index.length).toBeGreaterThan(0)
  })
})
