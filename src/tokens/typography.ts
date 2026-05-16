export const fontFamilies = {
  display: "'Roboto Slab', 'Rockwell', 'Courier New', serif",
  body: "'Space Grotesk', 'Helvetica Neue', 'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
} as const

export const fontSizes = {
  xs: '11px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  '2xl': '26px',
  '3xl': '34px',
  '4xl': '46px',
  '5xl': '64px',
  '6xl': '88px',
} as const

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const

export const lineHeights = {
  tight: 1.08,
  snug: 1.2,
  base: 1.45,
  loose: 1.65,
} as const

export const letterSpacings = {
  tight: '-0.02em',
  snug: '-0.01em',
  base: '0',
  wide: '0.04em',
  wider: '0.08em',
  widest: '0.18em',
} as const

export const googleFontsUrl =
  'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'
