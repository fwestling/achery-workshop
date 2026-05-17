import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta = {
  title: 'Overlays/Tooltip',
  parameters: {
    docs: {
      description: {
        component: 'Contextual label on hover or focus. Built on Radix Tooltip — portaled, never clipped by overflow. Auto-flips when the preferred `side` lacks space. Use for supplementary information only; never for content required to complete a task.',
      },
    },
  },
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
      <Tooltip content="Steeping. Allow three minutes." side="top">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
}

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '16px', justifyContent: 'center', padding: '48px' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side} content={`Side: ${side}`} side={side}>
          <Button variant="ghost" size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
}
