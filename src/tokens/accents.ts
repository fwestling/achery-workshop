import { palette } from './palette.js'

export const accentColors = {
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
} as const

export type AccentColor = keyof typeof accentColors
export const accentColorNames = Object.keys(accentColors) as AccentColor[]
