import type { GlyphName } from 'achery-ui'

export interface PageDef {
  path: string
  /** The <title>; also used for link previews */
  title: string
  description: string
  /** Sidebar label */
  label: string
  /** Sidebar group */
  group: string
  glyph: GlyphName
}

const SUFFIX = ' — Achery Workshop'

export const PAGES: PageDef[] = [
  {
    path: '/',
    title: 'Achery Workshop — the achery-ui design system',
    description:
      'Tokens, themes and components for achery-ui, the React design system behind the Achery apps: autumn palette, hard edges, botanical marginalia.',
    label: 'Getting started',
    group: 'Start',
    glyph: 'compass',
  },
]

/** Sidebar groups in page order */
export const NAV_GROUPS = [...new Set(PAGES.map((p) => p.group))].map((group) => ({
  label: group,
  pages: PAGES.filter((p) => p.group === group),
}))

export const pageTitle = (title: string): string => `${title}${SUFFIX}`

export const normalisePath = (path: string): string => {
  const trimmed = path.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export const findPage = (path: string): PageDef | undefined => PAGES.find((p) => p.path === normalisePath(path))
