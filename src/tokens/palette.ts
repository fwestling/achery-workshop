export const palette = {
  ink: '#1f1d18',
  inkDeep: '#14130f',

  paper: '#fbf8f0',
  paperWarm: '#f0e9d6',
  paperToasted: '#e6dec5',
  cream: '#e8dfc8',
  creamSoft: '#d8cdb0',

  mossDeep: '#2e3a20',
  moss: '#4a5a32',
  mossMid: '#6b7a48',
  mossLight: '#8da866',
  sage: '#b6c898',

  terracotta: '#c46a3a',
  terracottaDeep: '#a05526',
  terracottaLight: '#d97a4a',

  plum: '#5d4a6a',
  plumMid: '#7a5e8a',
  plumLight: '#8b6fa8',

  rust: '#8a3a22',
  ochre: '#b8924a',

  slate: '#195a73',
  slateDeep: '#004157',
  slateLight: '#5189a1',

  verdigris: '#00685f',
  verdigrisDeep: '#004d46',
  verdigrisLight: '#3f9086',

  mauve: '#76425b',
  mauveDeep: '#5a2b43',
  mauveLight: '#a56c87',

  amber: '#9a6839',
  amberDeep: '#76491d',
  amberLight: '#be8c61',

  fern: '#36643e',
  fernDeep: '#1d4825',
  fernLight: '#618d67',

  blush: '#955c63',
  blushDeep: '#713f45',
  blushLight: '#bc848a',

  leather: '#6b3a26',
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

  gold: '#c69a4a',
  goldDeep: '#9a7430',
  goldLight: '#e0bc70',

  success: '#6ba03d',
} as const

export type PaletteKey = keyof typeof palette
