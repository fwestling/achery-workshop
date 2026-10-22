import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Card } from './Card'
import { Text } from './Text'

const meta = {
  title: 'Native/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'A bordered surface: `flat` or `stamp` (the hard offset shadow), four padding steps, and an optional `header`. Accepts every `View` prop.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 20, maxWidth: 360 }}>
      <Card variant="flat">
        <Text>A flat card: border only.</Text>
      </Card>
      <Card variant="stamp">
        <Text>A stamp card: the hard 2px offset.</Text>
      </Card>
    </View>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Card variant="stamp" header={<Text variant="eyebrow">Recipe · ink</Text>}>
        <Text variant="heading">Iron-gall ink</Text>
        <Text muted>Oak galls, iron sulfate, gum arabic.</Text>
      </Card>
    </View>
  ),
}

export const Padding: Story = {
  render: () => (
    <View style={{ gap: 12, maxWidth: 360 }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Card key={padding} padding={padding}>
          <Text variant="mono">padding="{padding}"</Text>
        </Card>
      ))}
    </View>
  ),
}
