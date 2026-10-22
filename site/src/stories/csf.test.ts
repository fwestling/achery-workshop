import { readFileSync } from 'node:fs'
import { createElement, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { componentDocs, nativeComponentDocs, sectionByHeading } from '../content'
import { composeStory, parseStorySources, storyExports, storyNameFromExport, type StoryMeta } from './csf'
import { COMPONENTS, NATIVE_COMPONENTS } from './registry'

const storyFiles = Object.keys(import.meta.glob('../../../src/**/*.stories.tsx')).map((rel) =>
  readFileSync(new URL(rel, import.meta.url), 'utf8'),
)

describe('storyNameFromExport', () => {
  it('sentence-cases export names, keeping acronyms', () => {
    expect(storyNameFromExport('Default')).toBe('Default')
    expect(storyNameFromExport('AllTones')).toBe('All tones')
    expect(storyNameFromExport('WithURLParam')).toBe('With URL param')
    expect(storyNameFromExport('Size2Columns')).toBe('Size2 columns')
  })
})

describe('parseStorySources', () => {
  const raw = `const meta = { title: 'X/Y' }
export default meta

export const Default: Story = {}

/**
 * Pass \`href\` and it's a link.
 * Second line.
 */
export const AsLink: Story = {
  render: () => <a href="#">x</a>,
}
`
  it('reads each export with its JSDoc description', () => {
    const sources = parseStorySources(raw)
    expect(sources.get('Default')).toEqual({ code: 'export const Default: Story = {}' })
    expect(sources.get('AsLink')?.description).toBe("Pass `href` and it's a link. Second line.")
    expect(sources.get('AsLink')?.code).toMatch(/^export const AsLink[\s\S]*\}$/)
  })
})

describe('storyExports', () => {
  it('turns function stories into a render, without taking the function name as the story name', () => {
    const Default = () => createElement('i', null, 'fn')
    const module = { default: { title: 'X/Y' }, Default, Object: { args: { a: 1 } } }
    const stories = storyExports(module)
    expect(stories.map(([k]) => k)).toEqual(['Default', 'Object'])
    const [, fnStory] = stories[0]!
    expect(fnStory.name).toBeUndefined()
    expect(renderToStaticMarkup(createElement(composeStory(module.default, fnStory)))).toBe('<i>fn</i>')
  })
})

describe('composeStory', () => {
  const Label = ({ text }: { text?: string }) => createElement('span', null, text)
  const meta: StoryMeta = {
    title: 'Test/Label',
    component: Label as ComponentType<Record<string, unknown>>,
    args: { text: 'meta' },
    decorators: [(Story) => createElement('div', { id: 'meta' }, createElement(Story))],
  }

  it('merges args and renders the meta component', () => {
    const Story = composeStory(meta, { args: { text: 'story' } })
    expect(renderToStaticMarkup(createElement(Story))).toBe('<div id="meta"><span>story</span></div>')
  })

  it('wraps story decorators inside meta decorators', () => {
    const Story = composeStory(meta, {
      decorators: [(S) => createElement('section', null, createElement(S))],
    })
    expect(renderToStaticMarkup(createElement(Story))).toBe('<div id="meta"><section><span>meta</span></section></div>')
  })

  it('prefers the story render, given the merged args', () => {
    const Story = composeStory(meta, { render: (args) => createElement('b', null, String(args['text'])) })
    expect(renderToStaticMarkup(createElement(Story))).toBe('<div id="meta"><b>meta</b></div>')
  })
})

describe('achery-ui stories', () => {
  // Features this renderer doesn't implement. Add support in csf.ts before using one in a story.
  const UNSUPPORTED: [string, RegExp][] = [
    ['play functions', /\bplay\s*:/],
    ['loaders', /\bloaders\s*:/],
    ['beforeEach', /\bbeforeEach\s*:/],
    // A nested provider rewrites <html>'s theme attributes, and removes them when it unmounts
    ['a nested AcheryProvider', /^\s*<AcheryProvider\b/m],
  ]

  it.each(UNSUPPORTED)('none use %s', (_, pattern) => {
    expect(storyFiles.filter((text) => pattern.test(text)).map((t) => t.match(/title: '([^']+)'/)?.[1])).toEqual([])
  })

  it('give every component page a unique slug', () => {
    const slugs = COMPONENTS.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every component page has COMPONENTS.md documentation', () => {
    expect(COMPONENTS.filter((c) => !componentDocs(c.sections)).map((c) => c.name)).toEqual([])
  })

  it('every native page has a row in COMPONENTS.md\'s React Native table', () => {
    expect(NATIVE_COMPONENTS.filter((c) => !nativeComponentDocs(c.docKey).startsWith('| Component')).map((c) => c.name)).toEqual([])
  })

  it('give every native page a unique path', () => {
    const paths = NATIVE_COMPONENTS.map((c) => c.path)
    expect(new Set(paths).size).toBe(paths.length)
  })
})

describe('sectionByHeading', () => {
  const md = '## A\n\nA body\n\n### A.1\n\nSub\n\n---\n\n## B\n\nB body\n\n### C\n\nC body\n\n---\n\n## D'
  it('takes a section at its own level, subsections included, without trailing rules', () => {
    expect(sectionByHeading(md, 'A')).toBe('A body\n\n### A.1\n\nSub')
    expect(sectionByHeading(md, 'C')).toBe('C body')
    expect(sectionByHeading(md, 'Nope')).toBe('')
  })
})
