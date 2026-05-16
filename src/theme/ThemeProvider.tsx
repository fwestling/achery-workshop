import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { ThemeContextValue, ThemeMode, AccentColor } from '../types/theme.js'

import './light.css.js'
import './dark.css.js'
import './accents.css.js'
import './global.css.js'

const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface AcheryProviderProps {
  children: ReactNode
  defaultTheme?: ThemeMode
  defaultAccent?: AccentColor
  className?: string
  style?: React.CSSProperties
}

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

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <AcheryProvider>')
  return ctx
}

export { ThemeContext }
