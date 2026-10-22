import { describe, expect, it } from 'vitest'
import { docs, dropSections, mdxToMarkdown, pickSections, renderMarkdown, slugify, withoutHeading } from './content'

describe('mdxToMarkdown', () => {
  it('drops top-level imports and self-closing JSX blocks', () => {
    const mdx = "import { Meta } from '@storybook/addon-docs/blocks'\n\n<Meta title=\"Achery UI/Getting Started\" />\n\n# Title\n\nBody"
    expect(mdxToMarkdown(mdx)).toBe('# Title\n\nBody')
  })

  it('keeps imports inside code fences', () => {
    const mdx = "# Title\n\n```tsx\nimport { AcheryProvider } from 'achery-ui'\n<Meta />\n```"
    expect(mdxToMarkdown(mdx)).toBe(mdx)
  })
})

describe('dropSections', () => {
  it('removes a level-2 section up to the next one', () => {
    const md = '# Doc\n\n## Keep\n\nA\n\n## Storybook\n\nB\n\n### Sub\n\nC\n\n## After\n\nD'
    expect(dropSections(md, ['Storybook'])).toBe('# Doc\n\n## Keep\n\nA\n\n## After\n\nD')
  })

  it('ignores headings inside code fences', () => {
    const md = '## Storybook\n\n```md\n## Keep\n```\n\n## Keep\n\nA'
    expect(dropSections(md, ['Storybook'])).toBe('## Keep\n\nA')
  })
})

describe('slugify', () => {
  it('matches GitHub-style anchors', () => {
    expect(slugify('Wrap your app')).toBe('wrap-your-app')
    expect(slugify('Entry points & <code>exports</code>')).toBe('entry-points-exports')
  })
})

describe('getting started', () => {
  it('has no Storybook-only content left', () => {
    expect(docs.gettingStarted).not.toMatch(/<Meta\b|@storybook|## Storybook/)
    expect(docs.gettingStarted.startsWith('# Getting Started')).toBe(true)
  })

  it('renders headings with anchors', () => {
    expect(renderMarkdown(docs.gettingStarted)).toContain('<h2 id="install">Install</h2>')
  })
})

describe('pickSections', () => {
  it('keeps only the named level-2 sections, with their subsections', () => {
    const md = '# Doc\n\nIntro\n\n## A\n\nA body\n\n### A.1\n\nMore\n\n## B\n\nB body\n\n## C\n\nC body'
    expect(pickSections(md, ['A', 'C'])).toBe('## A\n\nA body\n\n### A.1\n\nMore\n\n## C\n\nC body')
  })

  it('drops a picked section heading on request', () => {
    expect(withoutHeading('## Motion\n\nBody')).toBe('Body')
  })
})

describe('styleguide sections', () => {
  it('finds every section the site renders', () => {
    for (const title of ['Philosophy', 'Corners', 'Marginalia', 'UI copy voice']) {
      expect(docs.principles).toContain(`## ${title}`)
    }
    expect(docs.motion).toMatch(/^Minimal and purposeful/)
  })
})
