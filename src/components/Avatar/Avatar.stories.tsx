import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="FW" size="sm" />
      <Avatar initials="FW" size="md" />
      <Avatar initials="FW" size="lg" />
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="FW" tone="neutral" size="md" />
      <Avatar initials="FW" tone="moss" size="md" />
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="FW" tone="neutral" size="md" />
      <Avatar initials="FW" tone="moss" size="md" />
    </div>
  ),
}
