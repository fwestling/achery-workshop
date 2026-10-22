import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Native/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'A determinate bar from 0 to 100, in two sizes and two tones.',
      },
    },
  },
  args: { value: 62 },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 360 }}>
      <ProgressBar value={40} tone="neutral" />
      <ProgressBar value={70} tone="accent" />
      <ProgressBar value={70} tone="accent" size="sm" />
    </View>
  ),
}
