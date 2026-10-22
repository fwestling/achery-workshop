import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { BottomTabBar, type BottomTabItem } from './BottomTabBar'

const meta = {
  title: 'Native/BottomTabBar',
  component: BottomTabBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "An app's root navigation (the promotion ladder): up to four primary tabs, the rest in a More sheet, with a 2px accent stripe over the active tab.",
      },
    },
  },
} satisfies Meta<typeof BottomTabBar>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const ITEMS: BottomTabItem[] = [
  { value: 'today', label: 'Today', glyph: 'sun' },
  { value: 'recipes', label: 'Recipes', glyph: 'book' },
  { value: 'pantry', label: 'Pantry', glyph: 'flask' },
  { value: 'notes', label: 'Notes', glyph: 'feather' },
  { value: 'archive', label: 'Archive', glyph: 'archive' },
  { value: 'settings', label: 'Settings', glyph: 'gear' },
]

const Demo = ({ items }: { items: BottomTabItem[] }) => {
  const [tab, setTab] = useState('today')
  return (
    <View style={{ maxWidth: 420 }}>
      <BottomTabBar items={items} value={tab} onValueChange={setTab} />
    </View>
  )
}

export const FourTabs: Story = { render: () => <Demo items={ITEMS.slice(0, 4)} /> }

/** More than four: the rest go into a More sheet. */
export const WithOverflow: Story = { render: () => <Demo items={ITEMS} /> }
