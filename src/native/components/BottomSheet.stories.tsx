import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './Button'
import { BottomSheet, SheetRow } from './BottomSheet'

const meta = {
  title: 'Native/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component:
          'A sheet that slides up over the screen: rung 5 of the disclosure ladder. `SheetRow` is its 44px touch row, with an optional danger tint.',
      },
    },
  },
} satisfies Meta<typeof BottomSheet>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const Demo = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open sheet</Button>
      <BottomSheet open={open} onClose={close} title="Recipe">
        <SheetRow label="Edit" onPress={close} />
        <SheetRow label="Duplicate" onPress={close} />
        <SheetRow label="Delete" danger onPress={close} />
      </BottomSheet>
    </>
  )
}

export const Default: Story = { render: () => <Demo /> }
