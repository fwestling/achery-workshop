import type { ComponentType, ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../types/components'
import * as styles from './Sidebar.css'

/** Props passed to the custom link renderer supplied via {@link SidebarProps.renderLink}. */
export interface SidebarLinkProps {
  href: string
  className?: string
  'data-active'?: boolean
  'aria-current'?: 'page' | undefined
  title?: string
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
  /** Colour tone for the count badge. @default 'neutral' */
  countTone?: 'accent' | 'neutral'
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
  /**
   * When `true`, the sidebar collapses to icon-only mode (52px wide).
   * Labels, counts, and group headings are hidden; glyphs remain.
   */
  collapsed?: boolean
  /** Called when the user clicks the collapse toggle button. */
  onCollapsedChange?: (collapsed: boolean) => void
  /**
   * Controlled mobile overlay open state. When true, sidebar slides in from
   * the left as a fixed overlay below `mobileBreakpoint`.
   */
  mobileOpen?: boolean
  /** Called when the backdrop is clicked or the sidebar should close on mobile. */
  onMobileOpenChange?: (open: boolean) => void
  /** Viewport width (px) below which mobile overlay mode activates. @default 768 */
  mobileBreakpoint?: number
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
export function Sidebar({
  groups,
  activeId,
  onItemClick,
  renderLink,
  footer,
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
  className,
}: SidebarProps) {
  const isMobileMode = mobileOpen !== undefined

  const nav = (
    <nav
      className={[
        styles.sidebar,
        isMobileMode ? styles.sidebarMobile : undefined,
        className,
      ].filter(Boolean).join(' ')}
      data-collapsed={collapsed ?? false}
      data-mobile-open={isMobileMode ? String(mobileOpen) : undefined}
    >
      <button
        className={styles.collapseToggle}
        onClick={() => onCollapsedChange?.(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? '›' : '‹'}
      </button>
      {groups.map((group, i) => (
        <NavGroup
          key={i}
          label={group.label}
          items={group.items}
          activeId={activeId}
          onItemClick={onItemClick}
          renderLink={renderLink}
          collapsed={collapsed ?? false}
        />
      ))}
      {footer && <div className={styles.footer}>{footer}</div>}
    </nav>
  )

  if (isMobileMode) {
    return (
      <>
        {mobileOpen && (
          <div
            className={styles.backdrop}
            onClick={() => onMobileOpenChange?.(false)}
            aria-hidden="true"
          />
        )}
        {nav}
      </>
    )
  }

  return nav
}

interface NavGroupProps {
  label: string | undefined
  items: NavItemDef[]
  activeId: string | undefined
  onItemClick: ((id: string) => void) | undefined
  renderLink: ComponentType<SidebarLinkProps> | undefined
  collapsed: boolean
}

function NavGroup({ label, items, activeId, onItemClick, renderLink, collapsed }: NavGroupProps) {
  return (
    <div className={styles.group}>
      {label && !collapsed && <span className={styles.groupLabel}>{label}</span>}
      {items.map(item => (
        <NavItem
          key={item.id}
          item={item}
          active={item.id === activeId}
          onClick={() => onItemClick?.(item.id)}
          renderLink={renderLink}
          collapsed={collapsed}
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
  collapsed: boolean
}

function NavItem({ item, active, onClick, renderLink, collapsed }: NavItemProps) {
  const content = (
    <>
      {item.glyph
        ? <Glyph name={item.glyph} size={14} aria-hidden="true" />
        : <span />}
      {!collapsed && <span>{item.label}</span>}
      {!collapsed && item.count !== undefined && (
        <span className={item.countTone === 'accent' ? styles.countAccent : styles.navItemCount}>
          {item.count}
        </span>
      )}
    </>
  )

  const titleProp = collapsed ? { title: item.label } : {}

  if (item.href) {
    const LinkComponent = renderLink ?? 'a'
    return (
      <LinkComponent
        href={item.href}
        className={styles.navItem}
        data-active={active}
        aria-current={active ? 'page' : undefined}
        {...titleProp}
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
      {...titleProp}
    >
      {content}
    </button>
  )
}
