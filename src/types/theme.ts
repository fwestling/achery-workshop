import type { AccentColor } from '../tokens/accents'

/**
 * The user's colour-mode **preference**.
 * - `'light'` / `'dark'` — explicit override
 * - `'system'` — follow the OS `prefers-color-scheme` media query
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/** The **resolved** colour mode actually applied to the DOM — always `'light'` or `'dark'`. */
export type ResolvedTheme = 'light' | 'dark'

/**
 * Value provided by {@link ThemeContext} and returned by {@link useTheme}.
 * Gives components read/write access to the active theme and accent colour.
 */
export interface ThemeContextValue {
  /** The user's colour-mode preference (`'light'` | `'dark'` | `'system'`). */
  mode: ThemeMode
  /** The resolved colour applied to the DOM — always `'light'` or `'dark'`. */
  theme: ResolvedTheme
  /** Set the colour-mode preference. */
  setTheme: (theme: ThemeMode) => void
  /** Toggle between `'light'` and `'dark'` (skips `'system'`). */
  toggleTheme: () => void
  /** Currently active accent colour. */
  accent: AccentColor
  /** Set the accent colour. */
  setAccent: (accent: AccentColor) => void
}

export type { AccentColor }
