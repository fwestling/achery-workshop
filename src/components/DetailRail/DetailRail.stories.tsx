import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DetailRail } from './DetailRail'
import { Button } from '../Button/Button'
import { Field } from '../Input/Input'
import { Input } from '../Input/Input'
import { Badge } from '../Badge/Badge'

const meta: Meta<typeof DetailRail> = {
  title: 'Layout/DetailRail',
  component: DetailRail,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof DetailRail>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: 32 }}>
        <Button variant="accent" onClick={() => setOpen(true)}>Open rail</Button>
        <DetailRail open={open} onClose={() => setOpen(false)} title="Transaction detail" eyebrow="Transaction">
          <Field label="Merchant"><Input defaultValue="Corner Bakery" /></Field>
          <div style={{ marginTop: 16 }}><Field label="Amount"><Input defaultValue="$12.50" /></Field></div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Badge tone="saved">Categorised</Badge>
            <Badge tone="neutral">Food</Badge>
          </div>
        </DetailRail>
      </div>
    )
  },
}

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: 32 }}>
        <Button variant="accent" onClick={() => setOpen(true)}>Open with footer</Button>
        <DetailRail
          open={open}
          onClose={() => setOpen(false)}
          title="Edit subscription"
          eyebrow="Subscription"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm">Save</Button>
            </div>
          }
        >
          <Field label="Name"><Input defaultValue="Netflix" /></Field>
          <div style={{ marginTop: 16 }}><Field label="Monthly amount"><Input defaultValue="22.99" /></Field></div>
        </DetailRail>
      </div>
    )
  },
}

export const NarrowWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: 32 }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open narrow (280px)</Button>
        <DetailRail open={open} onClose={() => setOpen(false)} title="Quick view" width={280}>
          <p style={{ fontSize: 13, margin: 0 }}>Narrow rail for compact panels.</p>
        </DetailRail>
      </div>
    )
  },
}
