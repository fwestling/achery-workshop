import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import { Button } from '../Button/Button.js'
import { accentColors, accentColorNames } from '../../tokens/accents.js'
import type { AccentColor } from '../../types/theme.js'
import * as styles from './AppBar.css.js'

export interface AppBarProps {
  brandName?: string
  brandSub?: string
  showSearch?: boolean
  searchPlaceholder?: string
  searchKbd?: string
  actions?: ReactNode
  accent?: AccentColor
  onAccentChange?: (accent: AccentColor) => void
  onToggleTheme?: () => void
  isDark?: boolean
  avatarInitials?: string
  onNewClick?: () => void
  className?: string
}

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
