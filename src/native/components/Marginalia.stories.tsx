import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Card } from './Card'
import { Marginalia } from './Marginalia'
import { Text } from './Text'

const meta = {
  title: 'Native/Marginalia',
  component: Marginalia,
  parameters: {
    docs: {
      description: {
        component:
          'A large decorative glyph tucked into a corner of its container, at low opacity. Non-interactive and hidden from screen readers. Use sparingly: one per view.',
      },
    },
  },
} satisfies Meta<typeof Marginalia>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Card variant="stamp" style={{ minHeight: 140, overflow: 'hidden' }}>
        <Text variant="heading">Field notes</Text>
        <Text muted>A fern in the corner, the way a margin gets a doodle.</Text>
        <Marginalia glyph="fern" />
      </Card>
    </View>
  ),
}

export const Accent: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Card style={{ minHeight: 140, overflow: 'hidden' }}>
        <Text variant="heading">In the accent</Text>
        <Marginalia glyph="sprig" accent corner="top-right" />
      </Card>
    </View>
  ),
}
