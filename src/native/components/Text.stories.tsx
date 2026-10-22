import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Text } from './Text'

const meta = {
  title: 'Native/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'All native type: `display`, `heading`, `body`, `mono`, `eyebrow` and `caption` variants, with `size`, `muted` and `bold` adjustments. Sizes come from the shared type scale; there is no font family, so text uses the platform font.',
      },
    },
  },
  args: { children: 'A workbench, not a factory.', variant: 'body' },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text variant="display">The slow apothecary</Text>
      <Text variant="heading">Salt, sulfur, mercury</Text>
      <Text variant="body">Body copy is short, plain, and a little dry.</Text>
      <Text variant="mono">const tincture = await steep()</Text>
      <Text variant="eyebrow">Field guide</Text>
      <Text variant="caption">1. See Field Guide, p. 14.</Text>
    </View>
  ),
}

export const MutedAndBold: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text muted>Muted body text, in the theme's secondary ink.</Text>
      <Text bold>Bold body text.</Text>
    </View>
  ),
}
