import { useState, type ReactNode } from 'react'
import {
  AppBar,
  Field,
  SegmentedControl,
  Select,
  Sidebar,
  useIsDesktop,
  useTheme,
  type AccentColor,
  type NavGroupDef,
  type ThemeMode,
} from 'achery-ui'
import { accentColorNames } from 'achery-ui/tokens'
import { version } from '../../../package.json'
import { NAV_GROUPS } from '../pages'
import { AcheryMark } from './AcheryMark'

const NAV: NavGroupDef[] = NAV_GROUPS.map(({ label, pages }) => ({
  label,
  items: pages.map((p) => ({ id: p.path, label: p.label, glyph: p.glyph, href: p.path })),
}))

const MODES: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
]

const isAccent = (value: string): value is AccentColor => (accentColorNames as readonly string[]).includes(value)

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// AppBar hides its theme toggle and accent swatches below 768px; on a phone they live in the sidebar footer
const MobileThemeControls = () => {
  const { mode, setTheme, accent, setAccent } = useTheme()
  return (
    <div className="theme-controls">
      <div role="group" aria-label="Colour mode">
        <SegmentedControl
          size="sm"
          options={MODES}
          value={mode}
          // Clicking the active segment reports null (deselect); the mode always has a value, so ignore it
          onChange={(value) => value && setTheme(value)}
        />
      </div>
      <Field label="Accent">
        <Select value={accent} onChange={(e) => isAccent(e.target.value) && setAccent(e.target.value)}>
          {accentColorNames.map((name) => (
            <option key={name} value={name}>
              {capitalise(name)}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  )
}

export const Layout = ({ path, children }: { path: string; children: ReactNode }) => {
  const { theme, toggleTheme, accent, setAccent } = useTheme()
  const isDesktop = useIsDesktop()
  const [menuOpen, setMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const footer = (
    <div className="sidebar-footer">
      {!isDesktop && <MobileThemeControls />}
      <p>
        achery-ui <span className="sidebar-footer__version">v{version}</span>
      </p>
    </div>
  )

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AppBar
        className="site-appbar"
        brandName="Achery"
        brandSub="Workshop"
        brandLogo={<AcheryMark size={20} />}
        showSearch={false}
        isDark={theme === 'dark'}
        onToggleTheme={toggleTheme}
        accent={accent}
        onAccentChange={setAccent}
        {...(isDesktop ? {} : { onMenuClick: () => setMenuOpen((open) => !open) })}
      />
      <div className="site-body">
        <Sidebar
          className="site-sidebar"
          groups={NAV}
          activeId={path}
          // The collapsed rail is 52px wide: no room for the footer
          {...(isDesktop && collapsed ? {} : { footer })}
          {...(isDesktop
            ? { collapsed, onCollapsedChange: setCollapsed }
            : { mobileOpen: menuOpen, onMobileOpenChange: setMenuOpen })}
        />
        <main id="main" className="site-main">
          {children}
        </main>
      </div>
    </div>
  )
}
