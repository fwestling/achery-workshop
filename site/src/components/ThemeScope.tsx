import type { HTMLAttributes } from 'react'
import { useTheme, type AccentColor, type AccentDial, type MaterialSignature } from 'achery-ui'

type Theme = 'light' | 'dark'

interface ThemeScopeProps extends HTMLAttributes<HTMLDivElement> {
  /** Defaults to the page's theme */
  theme?: Theme
  /** Defaults to the page's accent */
  accent?: AccentColor
  dial?: AccentDial
  material?: MaterialSignature
}

// achery-ui keys its variables off [data-achery-root][data-theme][data-accent] (plus data-dial and
// data-material) on one element, so a nested root re-scopes them for its subtree: a preview can show
// another theme, accent, dial or material than the page around it. Portalled components (Modal, Tooltip,
// Toast) render into <body> and take the page's theme instead. Based on ../achery-site's AccentScope.
export const ThemeScope = ({ theme, accent, dial, material, className, children, ...rest }: ThemeScopeProps) => {
  const page = useTheme()
  return (
    <div
      data-achery-root=""
      data-theme={theme ?? page.theme}
      data-accent={accent ?? page.accent}
      data-dial={dial ?? page.dial}
      {...(material && material !== 'none' ? { 'data-material': material } : {})}
      className={className ? `theme-scope ${className}` : 'theme-scope'}
      {...rest}
    >
      {children}
    </div>
  )
}
