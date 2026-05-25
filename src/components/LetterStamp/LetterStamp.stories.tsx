import type { Meta, StoryObj } from '@storybook/react'
import { LetterStamp } from './LetterStamp'

const meta: Meta<typeof LetterStamp> = {
  title: 'Components/LetterStamp',
  component: LetterStamp,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof LetterStamp>

export const WithLetter: Story = {
  args: { letter: 'A', tone: 'neutral', size: 28 },
}

export const WithGlyph: Story = {
  args: { glyph: 'flask', tone: 'moss', size: 36 },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LetterStamp letter="A" size={14} tone="moss" />
      <LetterStamp letter="A" size={20} tone="moss" />
      <LetterStamp letter="A" size={28} tone="moss" />
      <LetterStamp letter="A" size={36} tone="moss" />
      <LetterStamp letter="A" size={48} tone="moss" />
    </div>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LetterStamp letter="M" tone="moss" size={36} />
      <LetterStamp letter="R" tone="rust" size={36} />
      <LetterStamp letter="O" tone="ochre" size={36} />
      <LetterStamp letter="P" tone="plum" size={36} />
      <LetterStamp letter="C" tone="copper" size={36} />
      <LetterStamp letter="N" tone="neutral" size={36} />
    </div>
  ),
}

export const WithColourEscapeHatch: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LetterStamp letter="X" colour="#2a5c8a" size={36} />
      <LetterStamp letter="Y" colour="#8a2a5c" size={36} />
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <LetterStamp letter="M" tone="moss" size={36} />
      <LetterStamp letter="R" tone="rust" size={36} />
      <LetterStamp letter="N" tone="neutral" size={36} />
    </div>
  ),
}
