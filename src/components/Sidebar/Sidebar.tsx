import { useEffect, useRef, type ComponentType, type ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../types/components'
import { useAppBarSearch } from '../../context/AppBarSearchContext'
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
  /**
   * Custom leading node, rendered in place of `glyph`. Use for monograms,
   * avatars, or any bespoke mark. Takes precedence over `glyph`. Sized/aligned
   * by the item; keep it roughly 14–18px square so it matches glyph items.
   */
  icon?: ReactNode
  /**
   * Colour applied to the leading `glyph` (via `currentColor`). Ignored when a
   * custom `icon` node is supplied — colour that yourself. Any CSS colour.
   */
  iconColor?: string
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
   *
   * **Responsive action pattern:** `AppBar` hides its `actions` slot on mobile
   * via CSS (below 768 px). If those actions must remain accessible on mobile,
   * pass the same node here so it appears at the foot of the mobile overlay.
   *
   * @example
   * ```tsx
   * // Month selector: visible in AppBar on desktop, in Sidebar footer on mobile
   * const isMobile = useIsMobile()
   * const monthPicker = <MonthSelect value={month} onChange={setMonth} />
   *
   * <Sidebar footer={isMobile ? monthPicker : undefined} … />
   * <AppBar actions={monthPicker} … />
   * ```
   */
  footer?: ReactNode
  /**
   * When `true`, the sidebar collapses to icon-only mode (52px wide).
   * Labels, counts, and group headings are hidden; glyphs remain.
   */
  collapsed?: boolean
  /**
   * Called when the user clicks the collapse toggle button. The toggle is only
   * shown when this is provided (and never in mobile overlay mode).
   */
  onCollapsedChange?: (collapsed: boolean) => void
  /**
   * Controlled mobile overlay open state. Passing it (even `false`) switches the
   * sidebar to overlay mode: a fixed panel that slides in from the left. Pass it
   * only on narrow viewports — see `useIsDesktop`.
   *
   * While open, Escape closes it (via `onMobileOpenChange`), focus moves into the
   * panel and returns where it was on close. While closed, the panel is `inert`:
   * its links can't be tabbed to or read out.
   */
  mobileOpen?: boolean
  /** Called when the backdrop is clicked or Escape is pressed while the overlay is open. */
  onMobileOpenChange?: (open: boolean) => void
  /**
   * @deprecated Has no effect. Overlay mode is on whenever `mobileOpen` is passed;
   * choose when with `useIsDesktop(breakpoint)`.
   */
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
  const searchCtx = useAppBarSearch()
  const searchConfig = searchCtx?.searchConfig ?? null
  const navRef = useRef<HTMLElement>(null)
  // Read through a ref so an inline callback doesn't re-run the effect below (and re-steal focus) every render
  const onMobileOpenChangeRef = useRef(onMobileOpenChange)
  useEffect(() => {
    onMobileOpenChangeRef.current = onMobileOpenChange
  })

  // Open overlay: Escape closes it; focus moves in (the active item, else the first control) and goes back
  // to wherever it was — usually the menu button — when the overlay closes.
  useEffect(() => {
    if (!isMobileMode || !mobileOpen) return
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const nav = navRef.current
    const target =
      nav?.querySelector<HTMLElement>('[aria-current="page"]') ??
      nav?.querySelector<HTMLElement>('a[href], button:not([disabled]), input, select')
    target?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileOpenChangeRef.current?.(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // By now the closed panel is inert, so focus that was inside it has already fallen back to <body>
      const active = document.activeElement
      if (!active || active === document.body || nav?.contains(active)) returnTo?.focus()
    }
  }, [isMobileMode, mobileOpen])

  const nav = (
    <nav
      className={[
        styles.sidebar,
        isMobileMode ? styles.sidebarMobile : undefined,
        className,
      ].filter(Boolean).join(' ')}
      ref={navRef}
      data-collapsed={collapsed ?? false}
      data-mobile-open={isMobileMode ? String(mobileOpen) : undefined}
      // A closed overlay is only moved offscreen; inert keeps its links out of the tab order and the a11y tree
      inert={isMobileMode && !mobileOpen ? true : undefined}
    >
      {onCollapsedChange && !isMobileMode && (
        <button
          className={styles.collapseToggle}
          onClick={() => onCollapsedChange(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      )}
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
      <div className={styles.bottomSlot}>
        {searchConfig && (
          <div className={styles.mobileSearch}>
            <Glyph name="compass" size={12} aria-hidden="true" />
            <input
              type="search"
              placeholder={searchConfig.placeholder}
              className={styles.mobileSearchInput}
              aria-label="Search"
              onFocus={() => searchConfig.onSearchFocus?.()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') searchConfig.onSearch?.((e.target as HTMLInputElement).value)
              }}
            />
            {searchConfig.kbd && <span>{searchConfig.kbd}</span>}
          </div>
        )}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
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
  const leading = item.icon ? (
    <span aria-hidden="true" style={{ display: 'inline-flex' }}>{item.icon}</span>
  ) : item.glyph ? (
    <Glyph
      name={item.glyph}
      size={14}
      aria-hidden="true"
      {...(item.iconColor ? { style: { color: item.iconColor } } : {})}
    />
  ) : (
    <span />
  )

  const content = (
    <>
      {leading}
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
