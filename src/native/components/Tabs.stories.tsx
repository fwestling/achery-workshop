import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import { Text } from './Text'

const meta = {
  title: 'Native/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'A horizontally scrolling tab bar with an underline on the active tab, and the active tab\'s content below. Announced as tabs with their selected state.',
      },
    },
  },
  args: {
    defaultValue: 'overview',
    items: [
      { value: 'overview', label: 'Overview', content: <Text>The recipe at a glance.</Text> },
      { value: 'ingredients', label: 'Ingredients', content: <Text>Oak galls, iron sulfate, gum arabic.</Text> },
      { value: 'method', label: 'Method', content: <Text>Steep, strain, settle.</Text> },
      { value: 'archive', label: 'Archive', content: <Text>Nothing here.</Text>, disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
