import * as RadixTabs from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'
import * as styles from './Tabs.css'

/** A single tab definition passed to {@link Tabs}. */
export interface TabItem {
  /** Unique string identifier — used as the controlled/uncontrolled value. */
  value: string
  /** Content rendered in the tab trigger button. Usually a short text label. */
  label: ReactNode
  /** Content rendered in the tab panel when this tab is active. */
  content: ReactNode
  /** When true, the tab is visible but not selectable. */
  disabled?: boolean
}

/** Props for the {@link Tabs} component. */
export interface TabsProps {
  /** Ordered list of tab definitions. */
  items: TabItem[]
  /**
   * Controlled active tab value. When provided alongside `onValueChange`,
   * the component is fully controlled.
   */
  value?: string
  /**
   * Initial active tab value for uncontrolled usage. Defaults to the
   * `value` of the first item if not specified.
   */
  defaultValue?: string
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void
  className?: string
}

/**
 * Accessible tab navigation built on Radix Tabs. Handles roving `tabindex`,
 * arrow-key navigation, and ARIA roles automatically.
 *
 * Supports both controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) usage. When neither is provided, the first tab is active
 * by default.
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { value: 'details', label: 'Details', content: <DetailsPanel /> },
 *     { value: 'history', label: 'History', content: <HistoryPanel /> },
 *     { value: 'notes', label: 'Notes', content: <NotesPanel />, disabled: true },
 *   ]}
 * />
 * ```
 */
export function Tabs({ items, value, defaultValue, onValueChange, className }: TabsProps) {
  const resolvedDefault = defaultValue ?? items[0]?.value

  return (
    <RadixTabs.Root
      {...(value !== undefined ? { value } : {})}
      {...(resolvedDefault != null ? { defaultValue: resolvedDefault } : {})}
      {...(onValueChange !== undefined ? { onValueChange } : {})}
      {...(className !== undefined ? { className } : {})}
    >
      <RadixTabs.List className={styles.tabList}>
        {items.map(item => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={styles.tab}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map(item => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className={styles.tabPanel}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}

/** Direct access to Radix Tabs primitives for advanced composition. */
export { RadixTabs as TabsPrimitive }
