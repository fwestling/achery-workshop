import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { ThemeContextValue, ThemeMode, AccentColor } from '../types/theme.js'

import './light.css.js'
import './dark.css.js'
import './accents.css.js'
import './global.css.js'

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Props for the {@link AcheryProvider} component. */
export interface AcheryProviderProps {
  children: ReactNode
  /**
   * Initial colour theme.
   * @default 'light'
   */
  defaultTheme?: ThemeMode
  /**
   * Initial accent colour.
   * @default 'terracotta'
   */
  defaultAccent?: AccentColor
  /** className applied to the root `[data-achery-root]` div. */
  className?: string
  /** Inline styles applied to the root `[data-achery-root]` div. */
  style?: React.CSSProperties
}

/**
 * Root provider for the Achery design system. Must wrap any part of the tree
 * that uses Achery components.
 *
 * Responsibilities:
 * - Injects theme CSS (light, dark, accents, global reset) as side-effect imports
 * - Renders a `[data-achery-root][data-theme][data-accent]` div that scopes all
 *   CSS custom properties
 * - Mirrors those attributes onto `<html>` so portaled content (Modal, Tooltip,
 *   Toast) inherits the same CSS vars outside the root div
 * - Provides {@link ThemeContext} for {@link useTheme}
 *
 * @example
 * ```tsx
 * // app entry point
 * import { AcheryProvider } from 'achery-ui'
 *
 * export default function App() {
 *   return (
 *     <AcheryProvider defaultTheme="light" defaultAccent="terracotta">
 *       <YourApp />
 *     </AcheryProvider>
 *   )
 * }
 * ```
 */
export function AcheryProvider({
  children,
  defaultTheme = 'light',
  defaultAccent = 'terracotta',
  className,
  style,
}: AcheryProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme)
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent)

  const setTheme = (next: ThemeMode) => setThemeState(next)
  const toggleTheme = () => setThemeState(t => (t === 'light' ? 'dark' : 'light'))
  const setAccent = (next: AccentColor) => setAccentState(next)

  // Mirror theme attrs onto <html> so portaled content (Modal, Tooltip, Toast)
  // inherits CSS vars even though they render outside [data-achery-root].
  useEffect(() => {
    const html = document.documentElement
    html.dataset['theme'] = theme
    html.dataset['accent'] = accent
    html.dataset['acheryRoot'] = ''
    return () => {
      delete html.dataset['theme']
      delete html.dataset['accent']
      delete html.dataset['acheryRoot']
    }
  }, [theme, accent])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, accent, setAccent }}>
      <div
        data-achery-root=""
        data-theme={theme}
        data-accent={accent}
        className={className}
        style={style}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

/**
 * Hook that returns the current theme state and setters from the nearest
 * {@link AcheryProvider}.
 *
 * @throws If called outside an `<AcheryProvider>`.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, toggleTheme, accent, setAccent } = useTheme()
 *   return (
 *     <Button
 *       glyph={theme === 'dark' ? 'sun' : 'moon'}
 *       onClick={toggleTheme}
 *       aria-label="Toggle theme"
 *     />
 *   )
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <AcheryProvider>')
  return ctx
}

/** Raw React context — use {@link useTheme} in components instead. */
export { ThemeContext }
