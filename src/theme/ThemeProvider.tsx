import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ThemeContextValue, ThemeMode, ResolvedTheme, AccentColor } from '../types/theme'

import './light.css.js'
import './dark.css.js'
import './accents.css.js'
import './global.css.js'

const STORAGE_KEY = 'achery-theme-mode'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode
}

function readStoredMode(fallback: ThemeMode): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {}
  return fallback
}

/** Props for the {@link AcheryProvider} component. */
export interface AcheryProviderProps {
  children: ReactNode
  /**
   * Initial colour-mode preference. Overridden by any persisted localStorage
   * value from a previous session.
   * @default 'system'
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
 * - Persists the colour-mode preference in `localStorage` under `'achery-theme-mode'`
 * - Supports `'system'` mode — resolves to light/dark based on `prefers-color-scheme`
 *   and updates live when the OS setting changes
 * - Renders a `[data-achery-root][data-theme][data-accent]` div that scopes all
 *   CSS custom properties
 * - Mirrors those attributes onto `<html>` so portaled content (Modal, Tooltip,
 *   Toast) inherits the same CSS vars outside the root div
 * - Provides {@link ThemeContext} for {@link useTheme}
 *
 * @example
 * ```tsx
 * import { AcheryProvider } from 'achery-ui'
 *
 * export default function App() {
 *   return (
 *     <AcheryProvider defaultTheme="system" defaultAccent="terracotta">
 *       <YourApp />
 *     </AcheryProvider>
 *   )
 * }
 * ```
 */
export function AcheryProvider({
  children,
  defaultTheme = 'system',
  defaultAccent = 'terracotta',
  className,
  style,
}: AcheryProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode(defaultTheme))
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(readStoredMode(defaultTheme)))

  const setTheme = useCallback((next: ThemeMode) => {
    setModeState(next)
    setResolvedTheme(resolveTheme(next))
    try { localStorage.setItem(STORAGE_KEY, next) } catch {}
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }, [resolvedTheme, setTheme])

  const setAccent = useCallback((next: AccentColor) => setAccentState(next), [])

  // When mode is 'system', subscribe to OS preference changes
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    // Sync immediately in case OS changed since mount
    setResolvedTheme(mq.matches ? 'dark' : 'light')
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  // Mirror theme attrs onto <html> so portaled content (Modal, Tooltip, Toast)
  // inherits CSS vars even though they render outside [data-achery-root].
  useEffect(() => {
    const html = document.documentElement
    html.dataset['theme'] = resolvedTheme
    html.dataset['accent'] = accent
    html.dataset['acheryRoot'] = ''
    return () => {
      delete html.dataset['theme']
      delete html.dataset['accent']
      delete html.dataset['acheryRoot']
    }
  }, [resolvedTheme, accent])

  return (
    <ThemeContext.Provider value={{ mode, theme: resolvedTheme, setTheme, toggleTheme, accent, setAccent }}>
      <div
        data-achery-root=""
        data-theme={resolvedTheme}
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
 *   const { mode, setTheme } = useTheme()
 *   return (
 *     <div style={{ display: 'flex', gap: 8 }}>
 *       {(['light', 'system', 'dark'] as const).map(m => (
 *         <Button key={m} variant={mode === m ? 'accent' : 'secondary'} onClick={() => setTheme(m)}>
 *           {m}
 *         </Button>
 *       ))}
 *     </div>
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
