import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Native/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          'A bar from 0 to 100, in two sizes and two tones. `indeterminate` is for work whose size isn\'t known: a segment slides along the track (a slow pulse with Reduce Motion on).',
      },
    },
  },
  args: { value: 62, accessibilityLabel: 'Upload' },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 360 }}>
      <ProgressBar value={40} tone="neutral" accessibilityLabel="Neutral" />
      <ProgressBar value={70} tone="accent" accessibilityLabel="Accent" />
      <ProgressBar value={70} tone="accent" size="sm" accessibilityLabel="Accent, small" />
    </View>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 360 }}>
      <ProgressBar indeterminate accessibilityLabel="Uploading" />
      <ProgressBar indeterminate tone="accent" size="sm" accessibilityLabel="Uploading, small" />
    </View>
  ),
}
