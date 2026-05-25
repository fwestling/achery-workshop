import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Field, Input, Textarea, Select } from '../Input/Input'

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'Accessible dialog built on Radix Dialog. Renders into a portal at `document.body` with a blurred backdrop. Includes focus trapping, `Escape` to close, and backdrop-click to dismiss. Pass a `trigger` element for uncontrolled usage, or control `open` externally.',
      },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Modal
      trigger={<Button variant="accent" glyph="plus">New entry</Button>}
      title="New recipe"
      description="Add a recipe to the field guide."
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field label="Name">
          <Input placeholder="e.g. Iron-gall ink" autoFocus />
        </Field>
        <Field label="Chapter">
          <Select>
            <option value="">Select a chapter</option>
            <option value="ink">Ink</option>
            <option value="pigment">Pigment</option>
            <option value="binding">Binding</option>
          </Select>
        </Field>
        <Field label="Notes">
          <Textarea placeholder="Describe the process, proportions, notes from the bench…" rows={5} />
        </Field>
      </div>
    </Modal>
  ),
}

export const SmallModal: Story = {
  render: () => (
    <Modal
      defaultOpen
      size="sm"
      title="Small modal"
      description="400px wide. Default size."
      trigger={<Button variant="accent">Open sm</Button>}
      footer={<Button variant="ghost">Cancel</Button>}
    >
      <p style={{ fontSize: 13 }}>This is a small modal.</p>
    </Modal>
  ),
}

export const MediumModal: Story = {
  render: () => (
    <Modal
      defaultOpen
      size="md"
      title="Medium modal"
      description="560px wide."
      trigger={<Button variant="accent">Open md</Button>}
      footer={<Button variant="ghost">Cancel</Button>}
    >
      <p style={{ fontSize: 13 }}>This is a medium modal.</p>
    </Modal>
  ),
}

export const LargeModal: Story = {
  render: () => (
    <Modal
      defaultOpen
      size="lg"
      title="Large modal"
      description="760px wide."
      trigger={<Button variant="accent">Open lg</Button>}
      footer={<Button variant="ghost">Cancel</Button>}
    >
      <p style={{ fontSize: 13 }}>This is a large modal.</p>
    </Modal>
  ),
}

export const ScrollableBody: Story = {
  render: () => (
    <Modal
      defaultOpen
      size="md"
      scrollable
      title="Scrollable body"
      description="Content area is scrollable, capped at 70vh."
      trigger={<Button variant="accent">Open scrollable</Button>}
      footer={<Button variant="ghost">Close</Button>}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i} style={{ fontSize: 13, margin: '8px 0' }}>
          Paragraph {i + 1} — long content that causes the body to scroll…
        </p>
      ))}
    </Modal>
  ),
}
