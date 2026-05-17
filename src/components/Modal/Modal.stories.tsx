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
