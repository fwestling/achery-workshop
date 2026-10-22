import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { SegmentedControl } from './SegmentedControl'

const meta = {
  title: 'Native/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component:
          'An inline group where exactly one option is active. Options are announced as tabs with their selected state; give a non-string `label` an `accessibilityLabel`.',
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const Period = ({ disabled }: { disabled?: boolean }) => {
  const [period, setPeriod] = useState('month')
  return (
    <View style={{ maxWidth: 360 }}>
      <SegmentedControl
        options={[
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
        value={period}
        onChange={setPeriod}
        {...(disabled ? { disabled } : {})}
      />
    </View>
  )
}

export const Default: Story = { render: () => <Period /> }

export const Disabled: Story = { render: () => <Period disabled /> }
