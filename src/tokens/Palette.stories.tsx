import type { Meta, StoryObj } from '@storybook/react'
import { palette } from '../../src/tokens/palette'
import { accentColors } from '../../src/tokens/accents'

const meta = {
  title: 'Tokens/Palette',
} satisfies Meta

export default meta
type Story = StoryObj

function Swatch({ name, value }: { name: string; value: string }) {
  const isDark = parseInt(value.slice(1, 3), 16) < 128
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '140px' }}>
      <div style={{
        width: '100%',
        height: '56px',
        background: value,
        border: '1px solid rgba(0,0,0,0.12)',
      }} />
      <div style={{ fontFamily: 'monospace', fontSize: '11px', opacity: 0.7 }}>{name}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.5 }}>{value}</div>
    </div>
  )
}

export const RawPalette: Story = {
  render: () => (
    <div>
      <h3 style={{ fontFamily: 'monospace', marginBottom: '16px' }}>Raw palette</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {Object.entries(palette).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} />
        ))}
      </div>
    </div>
  ),
}

export const AccentVariants: Story = {
  render: () => (
    <div>
      <h3 style={{ fontFamily: 'monospace', marginBottom: '16px' }}>Accent colours</h3>
      {Object.entries(accentColors).map(([name, entry]) => (
        <div key={name} style={{ marginBottom: '24px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '12px', marginBottom: '8px', opacity: 0.6 }}>{name}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Swatch name="main" value={entry.main} />
            <Swatch name="light" value={entry.light} />
            <Swatch name="deep" value={entry.deep} />
          </div>
        </div>
      ))}
    </div>
  ),
}
