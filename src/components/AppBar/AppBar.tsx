import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import { Button } from '../Button/Button.js'
import { accentColors, accentColorNames } from '../../tokens/accents.js'
import type { AccentColor } from '../../types/theme.js'
import * as styles from './AppBar.css.js'

/** Props for the {@link AppBar} component. */
export interface AppBarProps {
  /**
   * Primary brand name shown beside the hex mark.
   * @default 'Achery'
   */
  brandName?: string
  /** Secondary brand descriptor shown after a divider — e.g. a workspace or project name. */
  brandSub?: string
  /**
   * Show the central search field.
   * @default true
   */
  showSearch?: boolean
  /** Placeholder text for the search field. @default 'Search…' */
  searchPlaceholder?: string
  /** Keyboard shortcut hint displayed inside the search field (display only). */
  searchKbd?: string
  /**
   * Arbitrary content inserted after the built-in controls (theme toggle, accent
   * picker, new button) and before the avatar. Use for custom action buttons.
   */
  actions?: ReactNode
  /** Currently active accent colour — drives the accent picker selection indicator. */
  accent?: AccentColor
  /**
   * Called when the user selects a new accent colour via the built-in picker.
   * When omitted, the accent picker is hidden.
   */
  onAccentChange?: (accent: AccentColor) => void
  /**
   * Called when the theme toggle button is clicked.
   * When omitted, the theme toggle is hidden.
   */
  onToggleTheme?: () => void
  /** Pass `true` when the dark theme is active to show the correct toggle icon. */
  isDark?: boolean
  /** Up to two initials rendered in the avatar circle at the trailing edge. */
  avatarInitials?: string
  /**
   * Called when the "New" button is clicked.
   * When omitted, the new button is hidden.
   */
  onNewClick?: () => void
  className?: string
}

/**
 * Top-of-page application bar. Contains brand identity, search, theme and
 * accent controls, and a slot for custom actions.
 *
 * Each built-in slot is opt-in — only provide the callback/prop to show it:
 * - `onAccentChange` → renders accent colour picker swatches
 * - `onToggleTheme` → renders sun/moon theme toggle button
 * - `onNewClick` → renders accent "New" button
 * - `avatarInitials` → renders user avatar circle
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme, accent, setAccent } = useTheme()
 *
 * <AppBar
 *   brandName="Achery"
 *   brandSub="Field Guide"
 *   isDark={theme === 'dark'}
 *   onToggleTheme={toggleTheme}
 *   accent={accent}
 *   onAccentChange={setAccent}
 *   onNewClick={() => setModalOpen(true)}
 *   avatarInitials="FW"
 * />
 * ```
 */
export function AppBar({
  brandName = 'Achery',
  brandSub,
  showSearch = true,
  searchPlaceholder = 'Search…',
  searchKbd,
  actions,
  accent = 'terracotta',
  onAccentChange,
  onToggleTheme,
  isDark,
  avatarInitials,
  onNewClick,
  className,
}: AppBarProps) {
  return (
    <header className={[styles.appBar, className].filter(Boolean).join(' ')}>
      <div className={styles.brand}>
        <Glyph name="hex" size={20} aria-hidden="true" />
        <span className={styles.brandName}>{brandName}</span>
        {brandSub && (
          <>
            <span className={styles.brandDivider} />
            <span className={styles.brandSub}>{brandSub}</span>
          </>
        )}
      </div>

      {showSearch && (
        <div className={styles.searchArea}>
          <Glyph name="compass" size={12} aria-hidden="true" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className={styles.searchInput}
            aria-label="Search"
          />
          {searchKbd && <span className={styles.searchKbd}>{searchKbd}</span>}
        </div>
      )}

      <div className={styles.actions}>
        {onAccentChange && (
          <div className={styles.accentPicker} role="group" aria-label="Brand colour">
            {accentColorNames.map(name => (
              <button
                key={name}
                className={styles.accentSwatch}
                data-active={name === accent}
                onClick={() => onAccentChange(name)}
                aria-label={name}
                aria-pressed={name === accent}
                style={{ background: accentColors[name].main }}
              />
            ))}
          </div>
        )}

        {onToggleTheme && (
          <Button
            variant="ghost"
            size="sm"
            glyph={isDark ? 'sun' : 'moon'}
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          />
        )}

        {onNewClick && (
          <Button variant="accent" size="sm" glyph="plus" onClick={onNewClick}>
            New
          </Button>
        )}

        {actions}

        {avatarInitials && (
          <div className={styles.avatar} aria-label={`User: ${avatarInitials}`}>
            {avatarInitials.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  )
}
