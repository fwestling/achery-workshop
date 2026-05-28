import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Animated placeholder that communicates loading state without layout shift. ' +
          'Use `lines` for text content, varying `width` per line for a natural paragraph feel. ' +
          'Use `block` for chart areas, images, or any tall region. ' +
          'All variants share the same shimmer animation so mixed usage stays in sync.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => <Skeleton />,
}

export const MultiLine: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      <Skeleton lines={3} />
      <Skeleton lines={4} width={['100%', '90%', '95%', '55%']} />
    </div>
  ),
}

export const CustomWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Skeleton width="30%" />
      <Skeleton width="60%" />
      <Skeleton width="45%" />
    </div>
  ),
}

export const Block: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Skeleton block />
      <Skeleton block height="160px" />
      <Skeleton block height="48px" />
    </div>
  ),
}

export const MixedContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      <Skeleton width="40%" />
      <Skeleton block height="120px" />
      <Skeleton lines={2} width={['100%', '70%']} />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 600 }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 1fr',
            gap: '0 16px',
            alignItems: 'start',
          }}
        >
          <Skeleton block height="48px" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
            <Skeleton width={['80%', '55%'][i % 2]!} />
            <Skeleton width="40%" />
          </div>
        </div>
      ))}
    </div>
  ),
}
