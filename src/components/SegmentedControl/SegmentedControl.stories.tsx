import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Inputs/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  render: () => {
    const [v, setV] = useState<string | null>('month')
    return (
      <SegmentedControl
        options={[
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
        value={v}
        onChange={setV}
      />
    )
  },
}

export const Small: Story = {
  render: () => {
    const [v, setV] = useState<string | null>('hard')
    return (
      <SegmentedControl
        size="sm"
        options={[{ value: 'hard', label: 'Hard' }, { value: 'soft', label: 'Soft' }]}
        value={v}
        onChange={setV}
      />
    )
  },
}

export const Large: Story = {
  render: () => {
    const [v, setV] = useState<string | null>('list')
    return (
      <SegmentedControl
        size="lg"
        options={[
          { value: 'list', label: 'List' },
          { value: 'board', label: 'Board' },
          { value: 'calendar', label: 'Calendar' },
        ]}
        value={v}
        onChange={setV}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <SegmentedControl
      options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
      value="a"
      onChange={() => {}}
      disabled
    />
  ),
}
