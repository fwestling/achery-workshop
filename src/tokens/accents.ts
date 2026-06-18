import { palette } from './palette'
import type { AccentColor } from '../types/theme'

export type { AccentColor }

export const accentColors: Record<AccentColor, {
  readonly main: string
  readonly light: string
  readonly deep: string
  readonly fg: string
  readonly fgDark: string
}> = {
  terracotta: {
    main: palette.terracotta,
    light: palette.terracottaLight,
    deep: palette.terracottaDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  moss: {
    main: palette.moss,
    light: palette.mossLight,
    deep: palette.mossDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  plum: {
    main: palette.plum,
    light: palette.plumLight,
    deep: palette.plum,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  ochre: {
    main: palette.ochre,
    light: palette.goldLight,
    deep: palette.goldDeep,
    fg: palette.ink,
    fgDark: palette.ink,
  },
  rust: {
    main: palette.rust,
    light: palette.terracotta,
    deep: palette.rust,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  copper: {
    main: palette.copper,
    light: palette.copperLight,
    deep: palette.copperDeep,
    fg: palette.ink,
    fgDark: palette.ink,
  },
  slate: {
    main: palette.slate,
    light: palette.slateLight,
    deep: palette.slateDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  verdigris: {
    main: palette.verdigris,
    light: palette.verdigrisLight,
    deep: palette.verdigrisDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  mauve: {
    main: palette.mauve,
    light: palette.mauveLight,
    deep: palette.mauveDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  amber: {
    main: palette.amber,
    light: palette.amberLight,
    deep: palette.amberDeep,
    fg: palette.ink,
    fgDark: palette.ink,
  },
  fern: {
    main: palette.fern,
    light: palette.fernLight,
    deep: palette.fernDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
  blush: {
    main: palette.blush,
    light: palette.blushLight,
    deep: palette.blushDeep,
    fg: palette.paper,
    fgDark: palette.inkDeep,
  },
} as const

export const accentColorNames = Object.keys(accentColors) as AccentColor[]
