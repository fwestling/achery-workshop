import type { Meta, StoryObj } from '@storybook/react'
import { EntityPill } from './EntityPill'

const meta: Meta<typeof EntityPill> = {
  title: 'Components/EntityPill',
  component: EntityPill,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof EntityPill>

export const Static: Story = {
  args: { label: 'Acme Corp', letter: 'A', tone: 'neutral' },
}

export const Clickable: Story = {
  args: { label: 'Click me', letter: 'C', tone: 'moss', onClick: () => alert('clicked') },
}

export const AsLink: Story = {
  args: { label: 'Open link', letter: 'L', tone: 'rust', href: '#' },
}

export const WithLetter: Story = {
  args: { label: 'Fred Westling', letter: 'F', tone: 'ochre', size: 'md' },
}

export const WithGlyph: Story = {
  args: { label: 'Flask Lab', glyph: 'flask', tone: 'plum', size: 'md' },
}

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <EntityPill label="Moss" letter="M" tone="moss" />
      <EntityPill label="Rust" letter="R" tone="rust" />
      <EntityPill label="Ochre" letter="O" tone="ochre" />
      <EntityPill label="Plum" letter="P" tone="plum" />
      <EntityPill label="Copper" letter="C" tone="copper" />
      <EntityPill label="Neutral" letter="N" tone="neutral" />
    </div>
  ),
}

export const SizeSm: Story = {
  args: { label: 'Small pill', letter: 'S', tone: 'moss', size: 'sm' },
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <EntityPill label="Moss dark" letter="M" tone="moss" />
      <EntityPill label="Neutral dark" letter="N" tone="neutral" />
    </div>
  ),
}
