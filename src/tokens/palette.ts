// Raw colours, from the Achery design system's tokens.json. The design system writes some hues in OKLCH;
// they're converted to sRGB hex here (all in gamut) because React Native can't parse oklch().
export const palette = {
  ink: '#1f1d18',
  inkDeep: '#14130f',

  paper: '#fbf8f0',
  paperWarm: '#f0e9d6',
  paperToasted: '#e6dec5',
  cream: '#e8dfc8',
  creamSoft: '#d8cdb0',

  mossDeep: '#31411b',
  moss: '#4a5a32',
  mossMid: '#5f7043',
  mossLight: '#718654',
  sage: '#b6c898',

  terracotta: '#c46a3a',
  terracottaDeep: '#a05526',
  terracottaLight: '#e6895a',

  plum: '#5e486d',
  plumDeep: '#453152',
  plumMid: '#755e85',
  plumLight: '#8c769e',

  // Held at the previous values: the design system is still settling rust-light and dark `danger`.
  // Pull rust, rustDeep and rustLight from it (and the rust accent and `danger`) together once it lands.
  rust: '#8a3a22',

  ochre: '#b8924a',
  ochreDeep: '#95712e',
  ochreLight: '#d6b676',

  slate: '#195a73', // oklch(44% 0.075 228)
  slateDeep: '#024156', // oklch(35% 0.067 228)
  slateLight: '#5189a1', // oklch(60% 0.07 228)

  // Woad — indigo, filling the blue-violet gap between slate and plum
  woad: '#445282', // oklch(45% 0.08 270)
  woadDeep: '#2e3a64', // oklch(36% 0.075 270)
  woadLight: '#6f7eae', // oklch(60% 0.075 270)

  verdigris: '#04665e', // oklch(46% 0.08 185)
  verdigrisDeep: '#034a44', // oklch(37% 0.064 185)
  verdigrisLight: '#3f9086', // oklch(60% 0.08 185)

  mauve: '#76425b', // oklch(45% 0.08 350)
  mauveDeep: '#5a2b43', // oklch(36% 0.075 350)
  mauveLight: '#a56c87', // oklch(60% 0.08 350)

  amber: '#9a6839', // oklch(56% 0.09 62)
  amberDeep: '#76491d', // oklch(45% 0.085 62)
  amberLight: '#be8c61', // oklch(68% 0.085 62)

  fern: '#36643e', // oklch(46% 0.08 148)
  fernDeep: '#1d4825', // oklch(36% 0.075 148)
  fernLight: '#618d67', // oklch(60% 0.075 148)

  // Olive — legacy alias of moss (the old yellow olive #5a5a2a is retired). Prefer moss in new work.
  olive: '#4a5a32',
  oliveDeep: '#31411b',
  oliveMid: '#5f7043',
  oliveLight: '#718654',

  blush: '#955c63', // oklch(54% 0.075 12)
  blushDeep: '#713f45', // oklch(43% 0.07 12)
  blushLight: '#bc848a', // oklch(67% 0.07 12)

  leather: '#6b3a26',
  leatherDeep: '#4a2418',
  leatherMid: '#8a4e34',
  leatherLight: '#a86a48',

  copper: '#b8742a',
  copperDeep: '#8a531a',
  copperLight: '#d68f48',
  copperPatina: '#5a7a6a',

  silver: '#a8a098',
  silverDeep: '#6e6a62',
  silverLight: '#c8c0b6',

  wood: '#7a5a3a',
  woodLight: '#a88660',
  woodDeep: '#4a3422',

  // Gilt — the leather signature's metal. Brighter and yellower than ochre, kept well clear of it.
  gold: '#dbb73f',
  goldDeep: '#9c7b22',
  goldLight: '#f1d680',

  success: '#6ba03d',
} as const

export type PaletteKey = keyof typeof palette
