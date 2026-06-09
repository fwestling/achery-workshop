import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ColourInput } from './ColourInput'
import { Field } from '../Input/Input'

const meta: Meta<typeof ColourInput> = {
  title: 'Inputs/ColourInput',
  component: ColourInput,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof ColourInput>

export const Default: Story = {
  render: () => {
    const [colour, setColour] = useState('#c46a3a')
    return (
      <div style={{ width: 300 }}>
        <Field label="Accent colour">
          <ColourInput value={colour} onChange={setColour} />
        </Field>
        <p style={{ fontFamily: 'monospace', fontSize: 12, marginTop: 12 }}>{colour}</p>
      </div>
    )
  },
}

export const WithError: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Field label="Category colour" error="Required">
        <ColourInput value="#000000" error />
      </Field>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Field label="Locked colour">
        <ColourInput value="#4a5a32" disabled />
      </Field>
    </div>
  ),
}
