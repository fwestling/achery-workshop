import type { Meta, StoryObj } from '@storybook/react'
import { spacingScale } from '../../src/tokens/spacing'

const meta = {
  title: 'Tokens/Spacing',
} satisfies Meta

export default meta
type Story = StoryObj

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {spacingScale.map((val, i) => (
        <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.5, width: '32px' }}>sp{i}</div>
          <div style={{ width: `${val}px`, height: '16px', background: 'currentColor', opacity: 0.2, minWidth: '1px' }} />
          <div style={{ fontFamily: 'monospace', fontSize: '10px', opacity: 0.5 }}>{val}px</div>
        </div>
      ))}
    </div>
  ),
}
