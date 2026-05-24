import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import type { ReactNode } from 'react'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../glyphs/index'
import * as styles from './Menu.css'

/** A single item in a {@link Menu}. */
export interface MenuItemDef {
  /** Unique key for this item. */
  id: string
  /** Display label. */
  label: ReactNode
  /** Optional glyph shown before the label. */
  glyph?: GlyphName
  /** Called when the item is selected. */
  onSelect: () => void
  /** When true, the item is visible but not selectable. */
  disabled?: boolean
  /** Renders the item with danger (destructive action) styling. */
  danger?: boolean
}

/** Renders a horizontal rule between groups of items. */
export interface MenuSeparator {
  type: 'separator'
  id: string
}

/** Props for the {@link Menu} component. */
export interface MenuProps {
  /**
   * Element that opens the menu when clicked. Rendered as a Radix `asChild`
   * trigger — pass any single React element (e.g. a {@link Button}).
   */
  trigger: ReactNode
  /**
   * Ordered list of items and separators to render in the dropdown.
   */
  items: (MenuItemDef | MenuSeparator)[]
  /** Preferred side to open the menu relative to the trigger. */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Alignment of the menu relative to the trigger. */
  align?: 'start' | 'center' | 'end'
  className?: string
}

/**
 * Dropdown menu built on Radix DropdownMenu. Renders into a portal so it
 * appears above all content regardless of overflow constraints.
 *
 * @example
 * ```tsx
 * <Menu
 *   trigger={<Button variant="ghost" size="sm">Actions</Button>}
 *   items={[
 *     { id: 'edit', label: 'Edit', glyph: 'key', onSelect: () => setEditing(true) },
 *     { type: 'separator', id: 'sep1' },
 *     { id: 'delete', label: 'Delete', danger: true, onSelect: handleDelete },
 *   ]}
 * />
 * ```
 */
export function Menu({ trigger, items, side = 'bottom', align = 'end', className }: MenuProps) {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        {trigger as React.ReactElement}
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          side={side}
          align={align}
          sideOffset={6}
          className={[styles.content, className].filter(Boolean).join(' ')}
        >
          {items.map((item) => {
            if ('type' in item && item.type === 'separator') {
              return <RadixDropdownMenu.Separator key={item.id} className={styles.separator} />
            }
            const def = item as MenuItemDef
            return (
              <RadixDropdownMenu.Item
                key={def.id}
                {...(def.disabled !== undefined ? { disabled: def.disabled } : {})}
                onSelect={def.onSelect}
                className={[styles.item, def.danger ? styles.itemDanger : ''].filter(Boolean).join(' ')}
              >
                {def.glyph && <Glyph name={def.glyph} size={14} className={styles.itemGlyph} />}
                {def.label}
              </RadixDropdownMenu.Item>
            )
          })}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
