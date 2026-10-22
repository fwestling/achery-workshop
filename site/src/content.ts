import { Marked, type Tokens } from 'marked'
import gettingStartedMdx from '../../src/docs/GettingStarted.mdx?raw'
import styleguideMdx from '../../src/docs/Styleguide.mdx?raw'

// Long-form pages render the library's own docs (src/docs/*.mdx), so the site never keeps a second copy.
// Those files are MDX for Storybook; the site reads them as markdown and drops what only Storybook understands.

const FENCE = /^\s*(```|~~~)/

/**
 * MDX → plain markdown: drops top-level ESM imports and self-closing JSX blocks such as `<Meta title="…" />`.
 * Lines inside code fences are left alone (the docs show `import` statements as examples).
 */
export const mdxToMarkdown = (mdx: string): string => {
  let inFence = false
  return mdx
    .split('\n')
    .filter((line) => {
      if (FENCE.test(line)) inFence = !inFence
      if (inFence) return true
      return !/^import\s.+\sfrom\s+['"][^'"]+['"];?\s*$/.test(line) && !/^<[A-Z][\w.]*\b[^>]*\/>\s*$/.test(line)
    })
    .join('\n')
    .replace(/^\s+/, '')
}

/** Removes `## <title>` sections (to the next `##` or higher heading) that only make sense inside Storybook. */
export const dropSections = (md: string, titles: readonly string[]): string => {
  let dropping = false
  let inFence = false
  return md
    .split('\n')
    .filter((line) => {
      if (FENCE.test(line)) inFence = !inFence
      if (!inFence) {
        const heading = line.match(/^(#{1,2})\s+(.+?)\s*$/)
        if (heading) dropping = heading[1] === '##' && titles.includes(heading[2] ?? '')
      }
      return !dropping
    })
    .join('\n')
    .trimEnd()
}

/** Keeps only the named `## <title>` sections (each up to the next `##` or higher heading), in file order. */
export const pickSections = (md: string, titles: readonly string[]): string => {
  let keeping = false
  let inFence = false
  return md
    .split('\n')
    .filter((line) => {
      if (FENCE.test(line)) inFence = !inFence
      if (!inFence) {
        const heading = line.match(/^(#{1,2})\s+(.+?)\s*$/)
        if (heading) keeping = heading[1] === '##' && titles.includes(heading[2] ?? '')
      }
      return keeping
    })
    .join('\n')
    .trim()
}

/** Drops a section's own `## <title>` line, for pages that set their own headings around it. */
export const withoutHeading = (md: string): string => md.replace(/^##\s+.+\n+/, '')

// GitHub-style heading anchors, so in-page links and #fragments keep working
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')

const marked = new Marked({
  gfm: true,
  async: false,
  renderer: {
    heading({ tokens, depth, text }: Tokens.Heading) {
      return `<h${depth} id="${slugify(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`
    },
  },
})

export const renderMarkdown = (md: string): string => marked.parse(md) as string

export const docs = {
  gettingStarted: dropSections(mdxToMarkdown(gettingStartedMdx), ['Storybook']),
  principles: pickSections(mdxToMarkdown(styleguideMdx), ['Philosophy', 'Corners', 'Marginalia', 'UI copy voice']),
  motion: withoutHeading(pickSections(mdxToMarkdown(styleguideMdx), ['Motion'])),
} as const

export type DocId = keyof typeof docs
