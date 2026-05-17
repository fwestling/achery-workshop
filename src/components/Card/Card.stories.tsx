import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { Body } from '../Typography/Typography'
import { Badge } from '../Badge/Badge'

const meta = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Surface container for grouping related content. `flat` is the standard bordered surface; `stamp` adds the characteristic hard-offset shadow. Use the `header` slot for section labels and `marginalia` to place a decorative botanical glyph in the corner.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['flat', 'stamp', 'stampLg'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    marginalia: { control: 'select', options: [undefined, 'fern', 'leaf', 'sprig', 'sigil', 'compass', 'hex'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Body>A workbench. Pin what you'll actually use.</Body>,
  },
}

export const WithHeader: Story = {
  args: {
    header: <Eyebrow count={3}>Recent entries</Eyebrow>,
    children: <Body>Three new things. Probably non-urgent.</Body>,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <Card variant="flat" header={<Eyebrow>Flat</Eyebrow>}>
        <Body>No elevation. Just a border.</Body>
      </Card>
      <Card variant="stamp" header={<Eyebrow>Stamp</Eyebrow>}>
        <Body>Hard 2px offset shadow.</Body>
      </Card>
      <Card variant="stampLg" header={<Eyebrow>Stamp large</Eyebrow>}>
        <Body>4px offset for featured content.</Body>
      </Card>
    </div>
  ),
}

export const WithMarginalia: Story = {
  args: {
    variant: 'stamp',
    marginalia: 'fern',
    header: <Eyebrow>Field guide — <Badge tone="saved" dot>Saved</Badge></Eyebrow>,
    children: (
      <Body>
        Steeped six weeks in rainwater drawn from the stone cistern.
        Iron content reads higher than expected — a good sign for the nibs.
      </Body>
    ),
    style: { minHeight: '160px' },
  },
}
