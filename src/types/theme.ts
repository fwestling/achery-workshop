import type { AccentColor } from '../tokens/accents.js'

export type ThemeMode = 'light' | 'dark'

export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  accent: AccentColor
  setAccent: (accent: AccentColor) => void
}

export type { AccentColor }
