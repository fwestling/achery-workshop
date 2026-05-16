import * as RadixTabs from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'
import * as styles from './Tabs.css.js'

export interface TabItem {
  value: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

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

export { RadixTabs as TabsPrimitive }
