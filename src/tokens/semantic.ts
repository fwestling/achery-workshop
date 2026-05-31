import { palette } from './palette'

const materialDefaults = {
  // Material system — leather signature defaults; overridden by setMaterial in native context
  materialLeather: palette.leather,
  materialLeatherFg: palette.paper,
  materialWood: palette.wood,
  materialWoodFg: palette.paper,
  materialCopper: palette.copper,
  materialCopperFg: palette.ink,
  gold: palette.gold,
  goldDeep: palette.goldDeep,
  goldLight: palette.goldLight,
  silverLight: palette.silverLight,
  silverDeep: palette.silverDeep,
  copperPatina: palette.copperPatina,
}

export const lightTokens = {
  bg: palette.paper,
  bg2: palette.paperWarm,
  bgSunken: palette.paperToasted,
  surface: '#fdfaf3',
  surface2: palette.paperWarm,

  fg: palette.ink,
  fg2: '#4a463c',
  fg3: '#6e6a5e',
  fgMute: '#8a8576',

  border: palette.ink,
  border2: '#6e6a5e',
  borderMute: '#b8ad94',
  rule: palette.inkDeep,

  accent: palette.terracotta,
  accentFg: palette.paper,
  accent2: palette.moss,
  accent3: palette.plum,

  success: palette.success,
  warn: palette.ochre,
  danger: palette.rust,
  info: palette.plumMid,

  selectionBg: palette.ochre,
  selectionFg: palette.ink,

  ...materialDefaults,
} as const

export const darkTokens = {
  bg: palette.inkDeep,
  bg2: '#1f1d18',
  bgSunken: '#0c0b08',
  surface: '#26241e',
  surface2: '#2d2a23',

  fg: palette.cream,
  fg2: '#b8ad94',
  fg3: '#8a8576',
  fgMute: '#6e6a5e',

  border: palette.cream,
  border2: '#8a8576',
  borderMute: '#4a463c',
  rule: palette.cream,

  accent: palette.terracottaLight,
  accentFg: palette.inkDeep,
  accent2: palette.mossLight,
  accent3: palette.plumLight,

  success: '#7fba4a',
  warn: palette.ochre,
  danger: palette.terracotta,
  info: palette.plumMid,

  selectionBg: palette.mossLight,
  selectionFg: palette.inkDeep,

  ...materialDefaults,
  // In dark mode, gilt is bumped to gold-light so it stays legible on dark paper
  goldDeep: palette.goldLight,
  silverDeep: palette.silverLight,
} as const

export type SemanticTokens = typeof lightTokens | typeof darkTokens
