import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'The primary interactive element. Five variants cover every emphasis level — use `accent` for the one CTA per view, `primary` for high-emphasis actions, `secondary` as the default, `ghost` for toolbar/icon buttons, and `danger` for destructive actions. Add a `glyph` for visual reinforcement and `kbd` to surface keyboard shortcuts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    glyph: { control: 'select', options: [undefined, 'plus', 'arrow-right', 'compass', 'leaf', 'flask', 'key', 'moon', 'sun', 'spinner'] },
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

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" loading>Primary</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="accent" loading>Accent</Button>
      <Button variant="ghost" loading>Ghost</Button>
      <Button variant="danger" loading>Danger</Button>
    </div>
  ),
}

export const LoadingCustomLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="accent" loading loadingLabel="Saving…">Save</Button>
      <Button variant="primary" loading loadingLabel="Deleting…">Delete</Button>
      <Button variant="secondary" loading loadingLabel="Importing…">Import</Button>
    </div>
  ),
}
