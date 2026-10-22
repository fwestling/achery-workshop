import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Badge } from './Badge'

const row = { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' } as const
const TONES = ['neutral', 'saved', 'drafting', 'stopped', 'archived'] as const

const meta = {
  title: 'Native/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'A small status or category label. `tone` carries the meaning, `variant` the weight (`outline` or `solid`), and `dot` adds a status dot. The label is a string.',
      },
    },
  },
  args: { children: 'Saved', tone: 'saved' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllTones: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={row}>
        {TONES.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </View>
      <View style={row}>
        {TONES.map((tone) => (
          <Badge key={tone} tone={tone} variant="solid">
            {tone}
          </Badge>
        ))}
      </View>
    </View>
  ),
}

export const WithDot: Story = {
  render: () => (
    <View style={row}>
      <Badge tone="saved" dot>
        Saved
      </Badge>
      <Badge tone="drafting" dot>
        Drafting
      </Badge>
      <Badge tone="stopped" dot>
        Stopped
      </Badge>
    </View>
  ),
}

export const Sizes: Story = {
  render: () => (
    <View style={row}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </View>
  ),
}
