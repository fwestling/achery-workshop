import type { Meta, StoryObj } from '@storybook/react'
import { Field, Input, Textarea, Select, SearchInput } from './Input'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Form primitives: `Field` (label + hint/error wrapper), `Input` (single-line), `Textarea` (multi-line), `Select` (native dropdown), and `SearchInput` (search with compass icon). Compose `Field` around any input element to add accessible labels and validation text.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const AllInputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <Field label="Name" hint="What do you call this batch?">
        <Input placeholder="e.g. Iron-gall ink" />
      </Field>
      <Field label="Notes">
        <Textarea placeholder="Describe the process…" rows={4} />
      </Field>
      <Field label="Chapter">
        <Select>
          <option value="">Select a chapter</option>
          <option value="ink">Ink</option>
          <option value="pigment">Pigment</option>
          <option value="binding">Binding</option>
        </Select>
      </Field>
      <SearchInput placeholder="Search entries…" />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <Field label="Name" error="Something gave way — this field is required.">
        <Input placeholder="e.g. Iron-gall ink" error />
      </Field>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <Field label="Locked field">
        <Input placeholder="Cannot be changed" disabled />
      </Field>
    </div>
  ),
}
