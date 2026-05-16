import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    glyph: { control: 'select', options: [undefined, 'plus', 'arrow-right', 'compass', 'leaf', 'flask', 'key', 'moon', 'sun'] },
    glyphPosition: { control: 'select', options: ['start', 'end'] },
    kbd: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Save draft',
    variant: 'secondary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
    </div>
  ),
}

export const WithGlyph: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" glyph="plus">New entry</Button>
      <Button variant="secondary" glyph="compass">Explore</Button>
      <Button variant="accent" glyph="arrow-right" glyphPosition="end">Continue</Button>
      <Button variant="ghost" glyph="moon" />
    </div>
  ),
}

export const WithKbd: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="secondary" kbd="⌘K">Search</Button>
      <Button variant="primary" kbd="⌘S">Save</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="accent" disabled>Accent</Button>
      <Button variant="danger" disabled>Danger</Button>
    </div>
  ),
}
