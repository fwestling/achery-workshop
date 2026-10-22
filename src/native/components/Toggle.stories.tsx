import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Toggle } from './Toggle'

const meta = {
  title: 'Native/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component:
          "An animated on/off switch. Unlike the web Toggle, it takes `value` / `onChange` (or `defaultValue`), React Native's convention.",
      },
    },
  },
  args: { label: 'Sync over mobile data', defaultValue: true },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Toggle label="Off" />
      <Toggle label="On" defaultValue />
      <Toggle label="Disabled" defaultValue disabled />
    </View>
  ),
}
