import type { Meta, StoryObj } from '@storybook/react'
import { StatePill } from './StatePill'

const meta: Meta<typeof StatePill> = {
  title: 'Components/StatePill',
  component: StatePill,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof StatePill>

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatePill state="stable" />
      <StatePill state="drift-up" />
      <StatePill state="drift-down" />
      <StatePill state="new-price" />
      <StatePill state="renewing" />
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatePill state="stable" />
      <StatePill state="drift-up" />
      <StatePill state="drift-down" />
      <StatePill state="new-price" />
      <StatePill state="renewing" />
    </div>
  ),
}
