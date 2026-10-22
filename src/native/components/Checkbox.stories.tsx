import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Native/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox with an optional label, controlled (`checked`) or not (`defaultChecked`), with an indeterminate state.',
      },
    },
  },
  args: { label: 'Mark done', defaultChecked: true },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled" defaultChecked disabled />
    </View>
  ),
}
