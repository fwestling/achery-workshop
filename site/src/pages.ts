import type { GlyphName } from 'achery-ui'

export type PageId =
  | 'home'
  | 'principles'
  | 'colour'
  | 'accents'
  | 'typography'
  | 'space'
  | 'motion'
  | 'materials'
  | 'charts'
  | 'glyphs'

export interface PageDef {
  id: PageId
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

const page = (def: Omit<PageDef, 'title'> & { title?: string }): PageDef => ({
  ...def,
  title: def.title ?? `${def.label}${SUFFIX}`,
})

export const PAGES: PageDef[] = [
  page({
    id: 'home',
    path: '/',
    title: 'Achery Workshop — the achery-ui design system',
    description:
      'Tokens, themes and components for achery-ui, the React design system behind the Achery apps: autumn palette, hard edges, botanical marginalia.',
    label: 'Getting started',
    group: 'Start',
    glyph: 'compass',
  }),
  page({
    id: 'principles',
    path: '/principles',
    description: 'The design intent behind achery-ui: letterpress, square corners, marginalia and a spare copy voice.',
    label: 'Principles',
    group: 'Start',
    glyph: 'feather',
  }),
  page({
    id: 'colour',
    path: '/colour',
    description: 'Semantic colour tokens in light and dark, with WCAG contrast and usage, and the raw palette.',
    label: 'Colour',
    group: 'Foundations',
    glyph: 'palette',
  }),
  page({
    id: 'accents',
    path: '/accents',
    description: 'The fourteen per-project accents with their contrast, and the accent dial.',
    label: 'Accents & dial',
    group: 'Foundations',
    glyph: 'droplet',
  }),
  page({
    id: 'typography',
    path: '/typography',
    description: 'Roboto Slab, Space Grotesk and JetBrains Mono: type styles, scales and the components that set them.',
    label: 'Typography',
    group: 'Foundations',
    glyph: 'book',
  }),
  page({
    id: 'space',
    path: '/space',
    description: 'The 4px spacing scale, square radii, stamp shadows and z-index layers.',
    label: 'Space & shape',
    group: 'Foundations',
    glyph: 'ruler',
  }),
  page({
    id: 'motion',
    path: '/motion',
    description: 'Durations and easing curves, with demos.',
    label: 'Motion',
    group: 'Foundations',
    glyph: 'timer',
  }),
  page({
    id: 'materials',
    path: '/materials',
    description: 'Leather, wood and copper signatures for contained, occasional objects.',
    label: 'Materials',
    group: 'Foundations',
    glyph: 'layers',
  }),
  page({
    id: 'charts',
    path: '/charts',
    description: 'Categorical and ordinal chart colours for light and dark, with contrast against the surface.',
    title: `Chart colours${SUFFIX}`,
    label: 'Chart colours',
    group: 'Foundations',
    glyph: 'chart-bar',
  }),
  page({
    id: 'glyphs',
    path: '/glyphs',
    description: 'All achery-ui glyphs, searchable by name and keyword.',
    label: 'Glyphs',
    group: 'Foundations',
    glyph: 'sigil',
  }),
]

/** Sidebar groups in page order */
export const NAV_GROUPS = [...new Set(PAGES.map((p) => p.group))].map((group) => ({
  label: group,
  pages: PAGES.filter((p) => p.group === group),
}))

export const normalisePath = (path: string): string => {
  const trimmed = path.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export const findPage = (path: string): PageDef | undefined => PAGES.find((p) => p.path === normalisePath(path))
