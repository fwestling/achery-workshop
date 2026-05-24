import type { AccentColor } from '../tokens/accents'

/** Light or dark colour mode. */
export type ThemeMode = 'light' | 'dark'

/**
 * Value provided by {@link ThemeContext} and returned by {@link useTheme}.
 * Gives components read/write access to the active theme and accent colour.
 */
export interface ThemeContextValue {
  /** Currently active colour mode. */
  theme: ThemeMode
  /** Set the colour mode explicitly. */
  setTheme: (theme: ThemeMode) => void
  /** Toggle between `'light'` and `'dark'`. */
  toggleTheme: () => void
  /** Currently active accent colour. */
  accent: AccentColor
  /** Set the accent colour. */
  setAccent: (accent: AccentColor) => void
}

export type { AccentColor }
