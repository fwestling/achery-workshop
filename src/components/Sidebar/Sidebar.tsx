import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Sidebar.css.js'

export interface NavItemDef {
  id: string
  label: string
  glyph?: GlyphName
  count?: number
  href?: string
}

export interface NavGroupDef {
  label?: string
  items: NavItemDef[]
}

export interface SidebarProps {
  groups: NavGroupDef[]
  activeId?: string
  onItemClick?: (id: string) => void
  footer?: ReactNode
  className?: string
}

export function Sidebar({ groups, activeId, onItemClick, footer, className }: SidebarProps) {
  return (
    <nav className={[styles.sidebar, className].filter(Boolean).join(' ')}>
      {groups.map((group, i) => (
        <NavGroup
          key={i}
          label={group.label}
          items={group.items}
          activeId={activeId}
          onItemClick={onItemClick}
        />
      ))}
      {footer && <div className={styles.footer}>{footer}</div>}
    </nav>
  )
}

interface NavGroupProps {
  label: string | undefined
  items: NavItemDef[]
  activeId: string | undefined
  onItemClick: ((id: string) => void) | undefined
}

function NavGroup({ label, items, activeId, onItemClick }: NavGroupProps) {
  return (
    <div className={styles.group}>
      {label && <span className={styles.groupLabel}>{label}</span>}
      {items.map(item => (
        <NavItem
          key={item.id}
          item={item}
          active={item.id === activeId}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </div>
  )
}

interface NavItemProps {
  item: NavItemDef
  active: boolean
  onClick: () => void
}

function NavItem({ item, active, onClick }: NavItemProps) {
  const glyphStyle = active ? { filter: 'invert(1)' } : undefined

  if (item.href) {
    return (
      <a
        href={item.href}
        className={styles.navItem}
        data-active={active}
        aria-current={active ? 'page' : undefined}
      >
        {item.glyph
          ? <Glyph name={item.glyph} size={14} style={glyphStyle} aria-hidden="true" />
          : <span />}
        <span>{item.label}</span>
        {item.count !== undefined && (
          <span className={styles.navItemCount}>{item.count}</span>
        )}
      </a>
    )
  }

  return (
    <button
      className={styles.navItem}
      data-active={active}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {item.glyph
        ? <Glyph name={item.glyph} size={14} style={glyphStyle} aria-hidden="true" />
        : <span />}
      <span>{item.label}</span>
      {item.count !== undefined && (
        <span className={styles.navItemCount}>{item.count}</span>
      )}
    </button>
  )
}
