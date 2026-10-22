import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Native/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: 'A pulsing placeholder for content that is loading: lines of a given width, or a block.',
      },
    },
  },
  args: { lines: 3, width: ['100%', '90%', '60%'] },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Lines: Story = {}

export const Block: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Skeleton block height={120} />
    </View>
  ),
}
