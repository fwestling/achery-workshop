import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { StatusDot } from './StatusDot'
import { Text } from './Text'

const TONES = ['neutral', 'saved', 'drafting', 'stopped', 'archived'] as const

const meta = {
  title: 'Native/StatusDot',
  component: StatusDot,
  parameters: {
    docs: {
      description: {
        component:
          "A small filled dot for compact status, in Badge's tones. Decorative: put the status in words beside it.",
      },
    },
  },
  args: { tone: 'saved' },
} satisfies Meta<typeof StatusDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllTones: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {TONES.map((tone) => (
        <View key={tone} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <StatusDot tone={tone} />
          <Text>{tone}</Text>
        </View>
      ))}
    </View>
  ),
}
