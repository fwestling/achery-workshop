import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './Button'
import { Modal } from './Modal'
import { Text } from './Text'

const meta = {
  title: 'Native/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'A centred dialog, the native counterpart of the web Modal: title, description, a scrollable body and a footer. `dismissible={false}` for a question that must be answered.',
      },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const Demo = ({ dismissible = true }: { dismissible?: boolean }) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button variant="accent" onPress={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={close}
        dismissible={dismissible}
        title="Close the month"
        description="Seal the ledger and file it to the archive."
        footer={
          <>
            <Button variant="ghost" onPress={close}>
              Not yet
            </Button>
            <Button variant="primary" onPress={close}>
              Bind & archive
            </Button>
          </>
        }
      >
        <Text>Twelve entries, three recipes and a note will move to the archive.</Text>
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <Demo /> }

/** Only the footer buttons close it: no backdrop tap, no close button. */
export const NotDismissible: Story = { render: () => <Demo dismissible={false} /> }
