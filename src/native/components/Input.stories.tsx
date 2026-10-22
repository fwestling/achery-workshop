import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { Field, Input, Textarea } from './Input'

const meta = {
  title: 'Native/FormInputs',
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          '`Field` wraps a control with a label, a hint and an error; `Input` and `Textarea` are themed `TextInput`s that take every `TextInput` prop, plus `error`.',
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const NameField = () => {
  const [name, setName] = useState('')
  return (
    <Field label="Name" hint="e.g. Iron-gall ink">
      <Input value={name} onChangeText={setName} placeholder="Name the recipe" />
    </Field>
  )
}

export const Default: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <NameField />
    </View>
  ),
}

export const WithError: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Field label="Quantity" error="Enter a number">
        <Input defaultValue="a few" error />
      </Field>
    </View>
  ),
}

export const TextareaField: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Field label="Notes">
        <Textarea rows={4} placeholder="Describe the process, proportions, notes from the bench…" />
      </Field>
    </View>
  ),
}
