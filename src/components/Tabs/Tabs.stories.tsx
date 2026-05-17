import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import { Body } from '../Typography/Typography'

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Accessible tab navigation built on Radix Tabs. Handles roving `tabindex`, arrow-key navigation, and ARIA roles automatically. Supports controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) usage; defaults to the first tab when neither is specified.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { value: 'all', label: 'All', content: <Body style={{ padding: '16px 0' }}>All entries are shown here.</Body> },
      { value: 'saved', label: 'Saved', content: <Body style={{ padding: '16px 0' }}>Saved entries only.</Body> },
      { value: 'drafting', label: 'Drafting', content: <Body style={{ padding: '16px 0' }}>Works in progress.</Body> },
      { value: 'archived', label: 'Archived', content: <Body style={{ padding: '16px 0' }}>Archived for reference.</Body> },
    ],
  },
}
