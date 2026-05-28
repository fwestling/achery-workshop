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

export const SaveStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <Field label="Saving">
        <Input value="Iron-gall ink" status="saving" onChange={() => {}} />
      </Field>
      <Field label="Saved">
        <Input value="Iron-gall ink" status="saved" onChange={() => {}} />
      </Field>
      <Field label="Error">
        <Input value="Iron-gall ink" status="error" error onChange={() => {}} />
      </Field>
      <Field label="Notes (saving)">
        <Textarea value="Left to cure for 48 hours." status="saving" rows={3} onChange={() => {}} />
      </Field>
      <Field label="Notes (saved)">
        <Textarea value="Left to cure for 48 hours." status="saved" rows={3} onChange={() => {}} />
      </Field>
      <Field label="Chapter (saved)">
        <Select status="saved" value="ink" onChange={() => {}}>
          <option value="ink">Ink</option>
          <option value="pigment">Pigment</option>
        </Select>
      </Field>
    </div>
  ),
}
