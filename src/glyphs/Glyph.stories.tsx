import type { Meta, StoryObj } from '@storybook/react'
import { Glyph } from './Glyph'
import { GlyphCategories } from './glyphMeta'
import type { GlyphName } from '../types/components'

const allGlyphs = Object.values(GlyphCategories).flat() as GlyphName[]

const meta = {
  title: 'Primitives/Glyph',
  component: Glyph,
  parameters: {
    docs: {
      description: {
        component: '394 SVG icons + 3 brand marks drawn in the vocabulary of alchemical and botanical illustration. All use `stroke="currentColor"` — they inherit colour from context. Decorative by default (`aria-hidden`); pass `title` for semantic use in icon-only buttons. See the **GlyphGallery** story for a searchable reference.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: allGlyphs },
    size: { control: { type: 'range', min: 12, max: 64, step: 2 } },
  },
  args: { name: 'hex', size: 24 },
} satisfies Meta<typeof Glyph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

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
