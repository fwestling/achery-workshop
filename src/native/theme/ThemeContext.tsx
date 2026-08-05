import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { useColorScheme } from 'react-native'
import { lightTokens, darkTokens } from 'achery-ui/tokens'
import type { SemanticTokens } from 'achery-ui/tokens'
import { accentColors } from 'achery-ui/tokens'
import type {
  AccentColor,
  AccentDial,
  MaterialSignature,
  SurfaceOrigin,
  ThemeMode,
  ResolvedTheme,
} from '../../types/theme'

/**
 * Storage keys — deliberately identical to the web provider's `localStorage`
 * keys so a shared-codebase project reads the same preference names on both
 * surfaces.
 */
const MODE_STORAGE_KEY = 'achery-theme-mode'
const ACCENT_STORAGE_KEY = 'achery-accent'
const DIAL_STORAGE_KEY = 'achery-dial'
const MATERIAL_STORAGE_KEY = 'achery-material'

/**
 * The minimal storage contract the provider needs in order to persist theme
 * preferences across app launches.
 *
 * React Native has no built-in synchronous key-value store, and achery-ui will
 * not depend on one — the choice between `expo-secure-store`,
 * `@react-native-async-storage/async-storage`, MMKV, or anything else belongs
 * to the consuming app. Pass an adapter and preferences persist; omit it and
 * the provider behaves exactly as before (in-memory only).
 *
 * Both methods may return synchronously or as a promise; both are awaited.
 *
 * @example
 * ```tsx
 * import AsyncStorage from '@react-native-async-storage/async-storage'
 *
 * <NativeThemeProvider storage={AsyncStorage}>…</NativeThemeProvider>
 * ```
 */
export interface ThemeStorage {
  getItem: (key: string) => string | null | Promise<string | null>
  setItem: (key: string, value: string) => void | Promise<void>
}

export interface NativeThemeContextValue {
  tokens: SemanticTokens
  /**
   * The user's colour-mode *preference* — may be `'system'`.
   * For the mode actually being rendered, read {@link dark} or {@link theme}.
   */
  mode: ThemeMode
  /** The *resolved* colour mode actually applied — always `'light'` or `'dark'`. */
  theme: ResolvedTheme
  /** Set the colour-mode preference. Persisted when a `storage` adapter is given. */
  setTheme: (mode: ThemeMode) => void
  /** True when the resolved mode is dark. Equivalent to `theme === 'dark'`. */
  dark: boolean
  /**
   * Flip between explicit light and dark. Resolves `'system'` to its current
   * concrete value first, so a toggle always visibly flips.
   */
  toggle: () => void
  accent: AccentColor
  setAccent: (accent: AccentColor) => void
  dial: AccentDial
  setDial: (dial: AccentDial) => void
  material: MaterialSignature
  setMaterial: (material: MaterialSignature) => void
  surfaceOrigin: SurfaceOrigin
  /**
   * False until any persisted preferences have been read back from `storage`.
   * Useful for holding a splash screen to avoid a light→dark flash on launch.
   * Always true immediately when no `storage` adapter is supplied.
   */
  hydrated: boolean
}

export interface NativeThemeProviderProps {
  children: ReactNode
  /**
   * Initial colour-mode preference. Overridden by any persisted value.
   * @default 'system'
   */
  defaultMode?: ThemeMode
  /**
   * @deprecated Use `defaultMode` instead. Kept for backwards compatibility:
   * `defaultDark` maps to `defaultMode="dark"` when `defaultMode` is not given.
   */
  defaultDark?: boolean
  defaultAccent?: AccentColor
  defaultDial?: AccentDial
  defaultMaterial?: MaterialSignature
  /**
   * Declares the design direction of this app — determines which adaptation
   * ladder governs component behaviour across surfaces.
   * @default 'native-only'
   */
  defaultSurfaceOrigin?: SurfaceOrigin
  /**
   * Optional persistence adapter. When supplied, the colour mode, accent, dial
   * and material are written on change and restored on next launch.
   * See {@link ThemeStorage}.
   */
  storage?: ThemeStorage
}

const ThemeContext = createContext<NativeThemeContextValue>({
  tokens: lightTokens,
  mode: 'light',
  theme: 'light',
  setTheme: () => {},
  dark: false,
  toggle: () => {},
  accent: 'terracotta',
  setAccent: () => {},
  dial: 'chrome',
  setDial: () => {},
  material: 'none',
  setMaterial: () => {},
  surfaceOrigin: 'native-only',
  hydrated: true,
})

const isThemeMode = (v: unknown): v is ThemeMode =>
  v === 'light' || v === 'dark' || v === 'system'

/**
 * Stored values are validated before use. An unrecognised accent (storage
 * written by an older/newer build, a renamed palette entry, corrupted data)
 * would otherwise index `accentColors` as `undefined` and crash token
 * derivation — so an unknown value is ignored and the default stands.
 */
const isAccentColor = (v: unknown): v is AccentColor =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(accentColors, v)

const isAccentDial = (v: unknown): v is AccentDial =>
  v === 'underline' || v === 'chrome' || v === 'surface'

const isMaterial = (v: unknown): v is MaterialSignature =>
  v === 'none' || v === 'leather' || v === 'wood' || v === 'copper'

/**
 * Theme provider for native apps.
 *
 * Mirrors the web `AcheryProvider` contract: a three-way colour-mode preference
 * (`light` / `dark` / `system`), an accent colour, and the dial/material
 * signatures. `'system'` follows the OS appearance live via `useColorScheme()`.
 *
 * Persistence is opt-in through the `storage` prop — see {@link ThemeStorage}.
 * Because native storage is asynchronous, stored values are read *after* first
 * paint: the provider renders with the `default*` props, then swaps to the
 * stored preference once loaded. Any preference the user changes before
 * hydration finishes wins — the hydration pass never clobbers a live edit.
 */
export function NativeThemeProvider({
  children,
  defaultMode,
  defaultDark = false,
  defaultAccent = 'terracotta',
  defaultDial = 'chrome',
  defaultMaterial = 'none',
  defaultSurfaceOrigin = 'native-only',
  storage,
}: NativeThemeProviderProps) {
  const initialMode: ThemeMode = defaultMode ?? (defaultDark ? 'dark' : 'system')

  const [mode, setModeState] = useState<ThemeMode>(initialMode)
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent)
  const [dial, setDialState] = useState<AccentDial>(defaultDial)
  const [material, setMaterialState] = useState<MaterialSignature>(defaultMaterial)
  const [surfaceOrigin] = useState<SurfaceOrigin>(defaultSurfaceOrigin)
  const [hydrated, setHydrated] = useState(!storage)

  // The live OS appearance. Only consulted when mode === 'system', but the hook
  // must run unconditionally.
  const systemScheme = useColorScheme()
  const resolvedTheme: ResolvedTheme =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode
  const dark = resolvedTheme === 'dark'

  // Tracks which preferences the user has explicitly set. The async hydration
  // pass skips these, so a tap made before storage resolves is never undone.
  const userSet = useRef({ mode: false, accent: false, dial: false, material: false })

  // `storage` is captured once: swapping adapters mid-session is not a
  // supported use, and re-running hydration would fight the user's edits.
  const storageRef = useRef(storage)

  useEffect(() => {
    const store = storageRef.current
    if (!store) return
    let cancelled = false

    void (async () => {
      try {
        const [storedMode, storedAccent, storedDial, storedMaterial] = await Promise.all([
          store.getItem(MODE_STORAGE_KEY),
          store.getItem(ACCENT_STORAGE_KEY),
          store.getItem(DIAL_STORAGE_KEY),
          store.getItem(MATERIAL_STORAGE_KEY),
        ])
        if (cancelled) return
        if (isThemeMode(storedMode) && !userSet.current.mode) setModeState(storedMode)
        if (isAccentColor(storedAccent) && !userSet.current.accent) setAccentState(storedAccent)
        if (isAccentDial(storedDial) && !userSet.current.dial) setDialState(storedDial)
        if (isMaterial(storedMaterial) && !userSet.current.material)
          setMaterialState(storedMaterial)
      } catch {
        // A failed read is not fatal — fall back to the defaults already in state.
      } finally {
        if (!cancelled) setHydrated(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const persist = useCallback((key: string, value: string) => {
    const store = storageRef.current
    if (!store) return
    try {
      const result = store.setItem(key, value)
      // A rejected promise must not surface as an unhandled rejection.
      if (result && typeof (result as Promise<void>).catch === 'function') {
        void (result as Promise<void>).catch(() => {})
      }
    } catch {
      // Persistence is best-effort; the in-memory value still applies.
    }
  }, [])

  const setTheme = useCallback(
    (next: ThemeMode) => {
      userSet.current.mode = true
      setModeState(next)
      persist(MODE_STORAGE_KEY, next)
    },
    [persist],
  )

  const toggle = useCallback(() => {
    // Resolve 'system' to its concrete value first so a toggle always flips.
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  const setAccent = useCallback(
    (a: AccentColor) => {
      userSet.current.accent = true
      setAccentState(a)
      persist(ACCENT_STORAGE_KEY, a)
    },
    [persist],
  )

  const setDial = useCallback(
    (d: AccentDial) => {
      userSet.current.dial = true
      setDialState(d)
      persist(DIAL_STORAGE_KEY, d)
    },
    [persist],
  )

  const setMaterial = useCallback(
    (m: MaterialSignature) => {
      userSet.current.material = true
      setMaterialState(m)
      persist(MATERIAL_STORAGE_KEY, m)
    },
    [persist],
  )

  const tokens = useMemo(() => {
    const base = dark ? darkTokens : lightTokens
    // Fall back to the default palette entry if an unknown accent reaches here
    // via props — token derivation must never read from `undefined`.
    const a = accentColors[accent] ?? accentColors.terracotta
    return {
      ...base,
      accent: dark ? a.light : a.main,
      accentFg: dark ? a.fgDark : a.fg,
    } as SemanticTokens
  }, [dark, accent])

  const value = useMemo(
    () => ({
      tokens,
      mode,
      theme: resolvedTheme,
      setTheme,
      dark,
      toggle,
      accent,
      setAccent,
      dial,
      setDial,
      material,
      setMaterial,
      surfaceOrigin,
      hydrated,
    }),
    [
      tokens,
      mode,
      resolvedTheme,
      setTheme,
      dark,
      toggle,
      accent,
      setAccent,
      dial,
      setDial,
      material,
      setMaterial,
      surfaceOrigin,
      hydrated,
    ],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): NativeThemeContextValue {
  return useContext(ThemeContext)
}
