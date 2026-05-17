import type { Meta, StoryObj } from '@storybook/react'
import { Marginalia } from './Marginalia'

const meta = {
  title: 'Primitives/Marginalia',
  component: Marginalia,
  parameters: {
    docs: {
      description: {
        component: 'Decorative botanical/alchemical glyph for corner or edge ornamentation. Always `aria-hidden` — purely presentational. Position it absolutely within a relatively-positioned container. The `Card` component exposes a `marginalia` shorthand prop that handles positioning automatically.',
      },
    },
  },
  argTypes: {
    glyph: { control: 'select', options: ['fern', 'leaf', 'sprig', 'sigil', 'compass', 'eye', 'hex', 'asterism', 'flourish'] },
    size: { control: { type: 'range', min: 40, max: 200, step: 10 } },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  args: { glyph: 'fern', size: 120, opacity: 0.4 },
} satisfies Meta<typeof Marginalia>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: Parameters<typeof Marginalia>[0]) => (
    <div style={{ position: 'relative', height: '200px', border: '1px solid currentColor' }}>
      <Marginalia {...args} />
    </div>
  ),
}

export const GlyphVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {(['fern', 'leaf', 'sprig', 'sigil', 'compass', 'asterism'] as const).map(glyph => (
        <div key={glyph} style={{ position: 'relative', height: '120px', border: '1px solid currentColor', padding: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.5 }}>{glyph}</span>
          <Marginalia glyph={glyph} size={60} />
        </div>
      ))}
    </div>
  ),
}
