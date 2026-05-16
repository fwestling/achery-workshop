import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['saved', 'drafting', 'stopped', 'archived', 'neutral', 'success', 'warn', 'danger', 'info'],
    },
    variant: { control: 'select', options: ['outline', 'solid', 'pill'] },
    dot: { control: 'boolean' },
  },
  args: { children: 'Saved', tone: 'saved', variant: 'outline' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge tone="saved">Saved</Badge>
      <Badge tone="drafting">Drafting</Badge>
      <Badge tone="stopped">Stopped</Badge>
      <Badge tone="archived">Archived</Badge>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warn">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="info">Info</Badge>
    </div>
  ),
}

export const Solid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge tone="saved" variant="solid">Saved</Badge>
      <Badge tone="drafting" variant="solid">Drafting</Badge>
      <Badge tone="stopped" variant="solid">Stopped</Badge>
      <Badge tone="archived" variant="solid">Archived</Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge tone="saved" dot>Saved</Badge>
      <Badge tone="drafting" dot>Drafting</Badge>
      <Badge tone="stopped" dot>Stopped</Badge>
    </div>
  ),
}
