import { createContext, useContext, useState, type ReactNode } from 'react'
import { lightTokens, darkTokens } from 'achery-ui/tokens'
import type { SemanticTokens } from 'achery-ui/tokens'

interface ThemeContextValue {
  tokens: SemanticTokens
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  tokens: lightTokens,
  dark: false,
  toggle: () => {},
})

export function NativeThemeProvider({ children, defaultDark = false }: { children: ReactNode; defaultDark?: boolean }) {
  const [dark, setDark] = useState(defaultDark)
  return (
    <ThemeContext.Provider value={{ tokens: dark ? darkTokens : lightTokens, dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
