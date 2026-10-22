import { darkTokens, lightTokens } from 'achery-ui/tokens'
import { contrast, rateNonText, rateText, type Rating } from './contrast'

export type Theme = 'light' | 'dark'
type Tokens = Record<string, string>

export const themeTokens: Record<Theme, Tokens> = { light: lightTokens, dark: darkTokens }

/**
 * How a semantic colour is used decides which contrast the page reports for it:
 * - `text`   — read on the page: against `bg` and `surface`
 * - `ground` — text sits on it: `fg` against it
 * - `edge`   — a line or mark: 3:1 against `bg` (non-text)
 * - `on`     — text on a partner fill (`accentFg` on `accent`)
 */
type Role = { kind: 'text' } | { kind: 'ground' } | { kind: 'edge' } | { kind: 'on'; fill: string }

export interface ColourGroup {
  title: string
  tokens: { key: string; role: Role }[]
}

const text = { kind: 'text' } as const
const ground = { kind: 'ground' } as const
const edge = { kind: 'edge' } as const

export const SEMANTIC_GROUPS: ColourGroup[] = [
  {
    title: 'Grounds',
    tokens: ['bg', 'bg2', 'bgSunken', 'surface', 'surface2'].map((key) => ({ key, role: ground })),
  },
  {
    title: 'Text',
    tokens: ['fg', 'fg2', 'fg3', 'fgMute'].map((key) => ({ key, role: text })),
  },
  {
    title: 'Lines',
    tokens: ['border', 'border2', 'borderMute', 'rule'].map((key) => ({ key, role: edge })),
  },
  {
    title: 'Accent',
    tokens: [
      { key: 'accent', role: text },
      { key: 'accentFg', role: { kind: 'on', fill: 'accent' } },
      { key: 'accent2', role: edge },
      { key: 'accent3', role: edge },
    ],
  },
  {
    title: 'Status',
    tokens: ['success', 'warn', 'danger', 'info'].map((key) => ({ key, role: text })),
  },
  {
    title: 'Selection',
    tokens: [
      { key: 'selectionBg', role: ground },
      { key: 'selectionFg', role: { kind: 'on', fill: 'selectionBg' } },
    ],
  },
]

export interface ContrastCheck {
  /** What the ratio is measured against, e.g. "on bg" */
  against: string
  ratio: number
  rating: Rating
}

/** The contrast checks reported for a semantic token in one theme. */
export const checks = (key: string, role: Role, theme: Theme): ContrastCheck[] => {
  const t = themeTokens[theme]
  const value = t[key]!
  switch (role.kind) {
    case 'text':
      return (['bg', 'surface'] as const).map((g) => {
        const ratio = contrast(value, t[g]!)
        return { against: `on ${g}`, ratio, rating: rateText(ratio) }
      })
    case 'ground': {
      const fg = key === 'selectionBg' ? t['selectionFg']! : t['fg']!
      const ratio = contrast(fg, value)
      return [{ against: key === 'selectionBg' ? 'selectionFg on it' : 'fg on it', ratio, rating: rateText(ratio) }]
    }
    case 'edge': {
      const ratio = contrast(value, t['bg']!)
      return [{ against: 'on bg', ratio, rating: rateNonText(ratio) }]
    }
    case 'on': {
      const ratio = contrast(value, t[role.fill]!)
      return [{ against: `on ${role.fill}`, ratio, rating: rateText(ratio) }]
    }
  }
}

/** Every key the groups above show, so a test can catch a new semantic token the page would miss. */
export const shownSemanticKeys = SEMANTIC_GROUPS.flatMap((g) => g.tokens.map((t) => t.key))
