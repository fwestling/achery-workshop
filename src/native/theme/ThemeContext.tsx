import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { lightTokens, darkTokens } from 'achery-ui/tokens'
import type { SemanticTokens } from 'achery-ui/tokens'
import { accentColors } from 'achery-ui/tokens'
import type { AccentColor, AccentDial, MaterialSignature } from '../../types/theme'

export interface NativeThemeContextValue {
  tokens: SemanticTokens
  dark: boolean
  toggle: () => void
  accent: AccentColor
  setAccent: (accent: AccentColor) => void
  dial: AccentDial
  setDial: (dial: AccentDial) => void
  material: MaterialSignature
  setMaterial: (material: MaterialSignature) => void
}

export interface NativeThemeProviderProps {
  children: ReactNode
  defaultDark?: boolean
  defaultAccent?: AccentColor
  defaultDial?: AccentDial
  defaultMaterial?: MaterialSignature
}

const ThemeContext = createContext<NativeThemeContextValue>({
  tokens: lightTokens,
  dark: false,
  toggle: () => {},
  accent: 'terracotta',
  setAccent: () => {},
  dial: 'chrome',
  setDial: () => {},
  material: 'none',
  setMaterial: () => {},
})

export function NativeThemeProvider({
  children,
  defaultDark = false,
  defaultAccent = 'terracotta',
  defaultDial = 'chrome',
  defaultMaterial = 'none',
}: NativeThemeProviderProps) {
  const [dark, setDark] = useState(defaultDark)
  const [accent, setAccentState] = useState<AccentColor>(defaultAccent)
  const [dial, setDialState] = useState<AccentDial>(defaultDial)
  const [material, setMaterialState] = useState<MaterialSignature>(defaultMaterial)

  const toggle = useCallback(() => setDark(d => !d), [])
  const setAccent = useCallback((a: AccentColor) => setAccentState(a), [])
  const setDial = useCallback((d: AccentDial) => setDialState(d), [])
  const setMaterial = useCallback((m: MaterialSignature) => setMaterialState(m), [])

  const tokens = useMemo(() => {
    const base = dark ? darkTokens : lightTokens
    const a = accentColors[accent]
    return {
      ...base,
      accent: dark ? a.light : a.main,
      accentFg: dark ? a.fgDark : a.fg,
    } as SemanticTokens
  }, [dark, accent])

  return (
    <ThemeContext.Provider
      value={{
        tokens,
        dark,
        toggle,
        accent,
        setAccent,
        dial,
        setDial,
        material,
        setMaterial,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): NativeThemeContextValue {
  return useContext(ThemeContext)
}
