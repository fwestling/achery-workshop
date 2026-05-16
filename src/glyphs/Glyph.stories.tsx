import type { Meta, StoryObj } from '@storybook/react'
import { Glyph } from './Glyph'
import type { GlyphName } from '../types/components'

const meta = {
  title: 'Primitives/Glyph',
  component: Glyph,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ['arrow-right', 'arrow-up', 'asterism', 'book', 'circle', 'compass', 'cross', 'eye', 'feather', 'fern', 'flask', 'flourish', 'hand', 'hex', 'key', 'leaf', 'mercury', 'minus', 'moon', 'plus', 'salt', 'scroll', 'sigil', 'sprig', 'square', 'star', 'sulfur', 'sun', 'tick', 'triangle', 'triangle-down'] },
    size: { control: { type: 'range', min: 12, max: 64, step: 2 } },
  },
  args: { name: 'hex', size: 24 },
} satisfies Meta<typeof Glyph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const allGlyphs: GlyphName[] = [
  'mercury', 'sulfur', 'salt', 'sun', 'moon', 'star', 'sigil', 'flask', 'key',
  'leaf', 'sprig', 'fern',
  'triangle', 'triangle-down', 'square', 'circle', 'hex', 'cross',
  'tick', 'plus', 'minus', 'arrow-up', 'arrow-right', 'eye', 'hand', 'compass', 'feather', 'book', 'scroll',
  'asterism', 'flourish',
]

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px' }}>
      {allGlyphs.map(name => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Glyph name={name} size={24} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.6 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
      {[12, 14, 16, 20, 24, 32].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Glyph name="hex" size={size} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.6 }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
}
