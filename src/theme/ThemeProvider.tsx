import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ThemeContextValue, ThemeMode, ResolvedTheme, AccentColor, AccentDial, MaterialSignature, SurfaceOrigin } from '../types/theme'
import { AppBarSearchProvider } from '../context/AppBarSearchContext'

import './light.css'
import './dark.css'
import './accents.css'
import './dial.css'
import './material.css'
import './global.css'

const STORAGE_KEY = 'achery-theme-mode'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(mode: ThemeMode | string): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode
  return getSystemTheme()
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
  /**
   * How loudly the accent runs across the working UI.
   * - `'underline'` — accent on links, focus, and active-tab underline only
   * - `'chrome'`    — accent threads the wiring: tabs, ticks, eyebrows, outlines
   * - `'surface'`   — one `.signature-surface` panel floods with accent (default for storefront/game products)
   * @default 'chrome'
   */
  defaultDial?: AccentDial
  /**
   * Hero material signature for contained, occasional objects (modals, dialogs, featured cards).
   * - `'none'`    — no material; objects use plain paper/ink
   * - `'leather'` — cordovan + gilt
   * - `'wood'`    — walnut + pewter
   * - `'copper'`  — oxidised copper + patina
   * @default 'none'
   */
  defaultMaterial?: MaterialSignature
  /**
   * Declares the design direction of this app — determines which adaptation
   * ladder governs component behaviour across surfaces.
   *
   * - `'web-first'`    — dense desk layout descended to phone via the disclosure ladder
   * - `'native-first'` — phone layout promoted to desk via the promotion ladder
   * - `'parity'`       — feature set agreed up front; neither ladder dominates
   * - `'native-only'`  — no web twin; Achery touch rules apply in full
   *
   * This prop does not drive CSS directly — `@media (pointer: coarse/fine)` and
   * component variants handle that. It is available via `useTheme().surfaceOrigin`
   * for components and app code that need to know the declared direction.
   *
   * @default 'web-first'
   */
  defaultSurfaceOrigin?: SurfaceOrigin
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
  defaultDial = 'chrome',
  defaultMaterial = 'none',
  defaultSurfaceOrigin = 'web-first',
  className,
  style,
}: AcheryProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode(defaultTheme))
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent)
  const [dial, setDialState] = useState<AccentDial>(defaultDial)
  const [material, setMaterialState] = useState<MaterialSignature>(defaultMaterial)
  const [surfaceOrigin] = useState<SurfaceOrigin>(defaultSurfaceOrigin)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(readStoredMode(defaultTheme)))

  // Sync explicit light/dark prop changes (e.g. Storybook toolbar) into state.
  // 'system' is intentionally excluded — it should not override a user's stored preference.
  useEffect(() => {
    setModeState(defaultTheme)
    setResolvedTheme(resolveTheme(defaultTheme))
  }, [defaultTheme])

  useEffect(() => { setAccentState(defaultAccent) }, [defaultAccent])
  useEffect(() => { setDialState(defaultDial) }, [defaultDial])
  useEffect(() => { setMaterialState(defaultMaterial) }, [defaultMaterial])

  const setTheme = useCallback((next: ThemeMode) => {
    setModeState(next)
    setResolvedTheme(resolveTheme(next))
    try { localStorage.setItem(STORAGE_KEY, next) } catch {}
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }, [resolvedTheme, setTheme])

  const setAccent = useCallback((next: AccentColor) => setAccentState(next), [])
  const setDial = useCallback((next: AccentDial) => setDialState(next), [])
  const setMaterial = useCallback((next: MaterialSignature) => setMaterialState(next), [])

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
    html.dataset['dial'] = dial
    if (material !== 'none') html.dataset['material'] = material
    else delete html.dataset['material']
    html.dataset['acheryRoot'] = ''
    return () => {
      delete html.dataset['theme']
      delete html.dataset['accent']
      delete html.dataset['dial']
      delete html.dataset['material']
      delete html.dataset['acheryRoot']
    }
  }, [resolvedTheme, accent, dial, material])

  return (
    <ThemeContext.Provider value={{ mode, theme: resolvedTheme, setTheme, toggleTheme, accent, setAccent, dial, setDial, material, setMaterial, surfaceOrigin }}>
      <AppBarSearchProvider>
        <div
          data-achery-root=""
          data-theme={resolvedTheme}
          data-accent={accent}
          data-dial={dial}
          {...(material !== 'none' ? { 'data-material': material } : {})}
          className={className}
          style={style}
        >
          {children}
        </div>
      </AppBarSearchProvider>
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
