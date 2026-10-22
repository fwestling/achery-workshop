import { Marked, type Tokens } from 'marked'
import gettingStartedMdx from '../../src/docs/GettingStarted.mdx?raw'
import styleguideMdx from '../../src/docs/Styleguide.mdx?raw'
import componentsMd from '../../COMPONENTS.md?raw'

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

/**
 * A heading's section of a markdown file, at whatever level it sits (COMPONENTS.md mixes `##` and `###`):
 * from the heading to the next heading at the same level or above. The heading line itself and trailing
 * `---` rules are dropped. Empty when there's no such heading.
 */
export const sectionByHeading = (md: string, title: string): string => {
  const lines = md.split('\n')
  let inFence = false
  let level = 0
  const out: string[] = []
  for (const line of lines) {
    if (FENCE.test(line)) inFence = !inFence
    const heading = inFence ? null : line.match(/^(#{1,6})\s+(.+?)\s*$/)
    if (level === 0) {
      if (heading && heading[2] === title) level = (heading[1] ?? '').length
      continue
    }
    if (heading && (heading[1] ?? '').length <= level) break
    out.push(line)
  }
  return out.join('\n').replace(/(\s*\n---\s*)+$/, '').trim()
}

/** The COMPONENTS.md documentation for a component page, its sections joined in order. */
export const componentDocs = (titles: readonly string[]): string =>
  titles
    .map((t) => sectionByHeading(componentsMd, t))
    .filter(Boolean)
    .join('\n\n')

const NATIVE_HEADING = 'React Native (`achery-ui/native`)'
const nativeMd = () => sectionByHeading(componentsMd, NATIVE_HEADING)

/**
 * A native component's documentation: its row of the "Available components" table, then its own
 * `### \`Name\` … (native)` section if it has one. `key` is the backticked name the row starts with.
 */
export const nativeComponentDocs = (key: string): string => {
  const native = nativeMd()
  const lines = native.split('\n')
  const row = lines.find((l) => l.startsWith(`| \`${key}\``))
  const heading = lines.find((l) => /^###\s/.test(l) && l.includes(`\`${key}\``) && /\(native\)\s*$/.test(l))
  const section = heading ? sectionByHeading(native, heading.replace(/^###\s+/, '').trim()) : ''
  return [row ? `| Component | Notes |\n|---|---|\n${row}` : '', section].filter(Boolean).join('\n\n')
}

/** The native overview: COMPONENTS.md's React Native intro, setup, accessibility and theme provider. */
export const nativeOverviewDocs = (): string => {
  const native = nativeMd()
  const intro = native.slice(0, native.search(/^###\s/m)).trim()
  const parts = ['Setup', 'Accessibility', '`NativeThemeProvider` / `useTheme` (native)'].map(
    (title) => `## ${title.replace(' (native)', '')}\n\n${sectionByHeading(native, title)}`,
  )
  return [intro, ...parts].join('\n\n')
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
