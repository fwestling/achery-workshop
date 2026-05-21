import type { ComponentType, ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Sidebar.css.js'

/** Props passed to the custom link renderer supplied via {@link SidebarProps.renderLink}. */
export interface SidebarLinkProps {
  href: string
  className?: string
  'data-active'?: boolean
  'aria-current'?: 'page' | undefined
  children: ReactNode
}

/** A single navigation item within a {@link NavGroupDef}. */
export interface NavItemDef {
  /** Unique identifier used for active state tracking and `onItemClick` callbacks. */
  id: string
  /** Visible label. */
  label: string
  /** Optional {@link Glyph} shown to the left of the label. */
  glyph?: GlyphName
  /** Numeric badge shown at the trailing edge — useful for unread counts. */
  count?: number
  /**
   * When provided, the item renders as a link instead of a `<button>`.
   * Use for top-level routes; omit for in-page actions.
   */
  href?: string
}

/** A labelled group of {@link NavItemDef} items within a {@link Sidebar}. */
export interface NavGroupDef {
  /** Optional group heading rendered in eyebrow style above the items. */
  label?: string
  items: NavItemDef[]
}

/** Props for the {@link Sidebar} component. */
export interface SidebarProps {
  /** Ordered list of navigation groups. Groups without a label are unlabelled. */
  groups: NavGroupDef[]
  /** `id` of the currently active navigation item — highlights it with accent colouring. */
  activeId?: string
  /**
   * Called when a navigation item (button variant) is clicked.
   * Receives the `id` of the clicked item.
   */
  onItemClick?: (id: string) => void
  /**
   * Optional custom link component used to render items that have an `href`.
   * Pass your router's `<Link>` here to enable client-side navigation.
   * Falls back to a plain `<a>` tag if omitted.
   *
   * @example
   * ```tsx
   * import { Link } from '@tanstack/react-router'
   * <Sidebar renderLink={Link} … />
   * ```
   */
  renderLink?: ComponentType<SidebarLinkProps>
  /**
   * Content rendered at the bottom of the sidebar — typically user account
   * info, a settings link, or version text.
   */
  footer?: ReactNode
  className?: string
}

/**
 * Vertical navigation sidebar. Renders one or more labelled groups of nav items,
 * each of which can be a link (`href`) or a button (`onItemClick`).
 *
 * Active state is driven by `activeId` matching an item's `id`. The active item
 * receives a filled accent-coloured background.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   activeId={currentPage}
 *   onItemClick={navigate}
 *   groups={[
 *     {
 *       label: 'Workshop',
 *       items: [
 *         { id: 'recipes', label: 'Recipes', glyph: 'book', count: 12 },
 *         { id: 'ingredients', label: 'Ingredients', glyph: 'flask' },
 *       ],
 *     },
 *     {
 *       items: [{ id: 'settings', label: 'Settings', glyph: 'key' }],
 *     },
 *   ]}
 *   footer={<Body variant="small">v0.1.0</Body>}
 * />
 * ```
 */
export function Sidebar({ groups, activeId, onItemClick, renderLink, footer, className }: SidebarProps) {
  return (
    <nav className={[styles.sidebar, className].filter(Boolean).join(' ')}>
      {groups.map((group, i) => (
        <NavGroup
          key={i}
          label={group.label}
          items={group.items}
          activeId={activeId}
          onItemClick={onItemClick}
          renderLink={renderLink}
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
  renderLink: ComponentType<SidebarLinkProps> | undefined
}

function NavGroup({ label, items, activeId, onItemClick, renderLink }: NavGroupProps) {
  return (
    <div className={styles.group}>
      {label && <span className={styles.groupLabel}>{label}</span>}
      {items.map(item => (
        <NavItem
          key={item.id}
          item={item}
          active={item.id === activeId}
          onClick={() => onItemClick?.(item.id)}
          renderLink={renderLink}
        />
      ))}
    </div>
  )
}

interface NavItemProps {
  item: NavItemDef
  active: boolean
  onClick: () => void
  renderLink: ComponentType<SidebarLinkProps> | undefined
}

function NavItem({ item, active, onClick, renderLink }: NavItemProps) {
  const glyphStyle = active ? { filter: 'invert(1)' } : undefined
  const content = (
    <>
      {item.glyph
        ? <Glyph name={item.glyph} size={14} style={glyphStyle} aria-hidden="true" />
        : <span />}
      <span>{item.label}</span>
      {item.count !== undefined && (
        <span className={styles.navItemCount}>{item.count}</span>
      )}
    </>
  )

  if (item.href) {
    const LinkComponent = renderLink ?? 'a'
    return (
      <LinkComponent
        href={item.href}
        className={styles.navItem}
        data-active={active}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </LinkComponent>
    )
  }

  return (
    <button
      className={styles.navItem}
      data-active={active}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </button>
  )
}
