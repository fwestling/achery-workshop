import { GlyphCategories, RenamedGlyphs, type GlyphName } from 'achery-ui'

/** `ArrowDownRight` → `arrow-down-right`, `XCircle` → `x-circle`: the inverse of generate-glyphs.mjs's toPascal. */
export const kebabFromComponent = (pascal: string): string => pascal.replace(/(?!^)([A-Z])/g, '-$1').toLowerCase()

export const CATEGORISED = Object.values(GlyphCategories).flat() as GlyphName[]

// Every glyph there is, from the generated component files (src/glyphs/svg-components/*.tsx): the
// categorised ones, plus the few outside the picker's categories (spinner, the hex-arrow lockup).
// Only the paths are read; the files load lazily through <Glyph>, as they would anyway.
export const FILE_NAMES = Object.keys(import.meta.glob('../../../src/glyphs/svg-components/*.tsx')).map((path) =>
  kebabFromComponent(path.replace(/^.*\/(\w+)\.tsx$/, '$1')),
)

const DEPRECATED = new Set<string>(Object.keys(RenamedGlyphs))

export const UNCATEGORISED = FILE_NAMES.filter(
  (n) => !CATEGORISED.includes(n as GlyphName) && !DEPRECATED.has(n),
) as GlyphName[]

export const ALL_GLYPHS: GlyphName[] = [...CATEGORISED, ...UNCATEGORISED]

export const GLYPH_GROUPS: { name: string; glyphs: readonly GlyphName[] }[] = [
  ...Object.entries(GlyphCategories).map(([name, glyphs]) => ({ name, glyphs })),
  ...(UNCATEGORISED.length ? [{ name: 'Outside the picker', glyphs: UNCATEGORISED }] : []),
]
