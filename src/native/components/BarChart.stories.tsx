import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { BarChart } from './BarChart'

const meta = {
  title: 'Native/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component:
          'The native counterpart of the web BarChart, with the same data and colours. Tapping a bar shows its values beneath the chart; with `onPress`, long-press does.',
      },
    },
  },
  args: {
    label: 'Hours per day',
    series: ['Hours'],
    data: [
      { label: 'Mon', values: [3] },
      { label: 'Tue', values: [5] },
      { label: 'Wed', values: [2] },
      { label: 'Thu', values: [6] },
      { label: 'Fri', values: [4] },
    ],
  },
  decorators: [(Story) => <View style={{ maxWidth: 480 }}><Story /></View>],
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Columns: Story = {}

export const StackedRows: Story = {
  args: {
    label: 'Entities by status',
    orientation: 'horizontal',
    scale: 'ordinal',
    series: ['Stub', 'Draft', 'Complete'],
    data: [
      { label: 'NPCs', values: [12, 9, 4] },
      { label: 'Places', values: [3, 8, 14] },
      { label: 'Items', values: [7, 5, 6] },
    ],
  },
}
