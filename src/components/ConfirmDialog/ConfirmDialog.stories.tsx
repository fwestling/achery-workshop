import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ConfirmDialogProvider, useConfirm } from './ConfirmDialog'
import { Button } from '../Button/Button'
import { Body } from '../Typography/Typography'

// Storybook needs a component with no required props as the meta component so
// stories don't have to supply args. The provider is always injected via decorator.
const Placeholder = () => null

const meta = {
  title: 'Overlays/ConfirmDialog',
  component: Placeholder,
  decorators: [
    (Story) => (
      <ConfirmDialogProvider>
        <Story />
      </ConfirmDialogProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Async confirmation dialog. Mount `<ConfirmDialogProvider>` once at the app root, then call `useConfirm()` anywhere below it. Returns a `Promise<boolean>` — `true` if the user confirmed, `false` if they cancelled or closed.',
      },
    },
  },
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof Placeholder>

// ─── Harness components ───────────────────────────────────────────────────────

function BasicDemo() {
  const confirm = useConfirm()
  const [result, setResult] = useState<string | null>(null)

  async function handleClick() {
    const ok = await confirm({
      title: 'Publish entry',
      message: 'This will make the entry visible to all team members.',
      confirmLabel: 'Publish',
    })
    setResult(ok ? 'Confirmed' : 'Cancelled')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Button variant="accent" onClick={handleClick}>Publish entry</Button>
      {result && <Body variant="small" style={{ opacity: 0.6 }}>Result: {result}</Body>}
    </div>
  )
}

function DestructiveDemo() {
  const confirm = useConfirm()
  const [result, setResult] = useState<string | null>(null)

  async function handleClick() {
    const ok = await confirm({
      title: 'Delete entry',
      message: 'This cannot be undone. The entry and all its associated data will be permanently removed.',
      confirmLabel: 'Delete',
      destructive: true,
    })
    setResult(ok ? 'Deleted' : 'Cancelled')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Button variant="danger" onClick={handleClick}>Delete entry</Button>
      {result && <Body variant="small" style={{ opacity: 0.6 }}>Result: {result}</Body>}
    </div>
  )
}

function MessageOnlyDemo() {
  const confirm = useConfirm()
  const [result, setResult] = useState<string | null>(null)

  async function handleClick() {
    const ok = await confirm({
      message: 'Are you sure you want to leave? Unsaved changes will be lost.',
      confirmLabel: 'Leave',
      cancelLabel: 'Stay',
    })
    setResult(ok ? 'Left' : 'Stayed')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Button variant="secondary" onClick={handleClick}>Navigate away</Button>
      {result && <Body variant="small" style={{ opacity: 0.6 }}>Result: {result}</Body>}
    </div>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <BasicDemo />,
}

export const Destructive: Story = {
  render: () => <DestructiveDemo />,
}

export const MessageOnly: Story = {
  name: 'No title',
  render: () => <MessageOnlyDemo />,
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <BasicDemo />
      <DestructiveDemo />
      <MessageOnlyDemo />
    </div>
  ),
}
