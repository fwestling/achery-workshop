import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Field } from '../Input/Input'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: { value: '2026-06-01' },
}

export const Empty: Story = {
  args: { value: '' },
}

export const Disabled: Story = {
  args: { value: '2026-06-01', disabled: true },
}

export const WithError: Story = {
  args: { value: '', error: true },
}

export const WithMinMax: Story = {
  args: { value: '2026-06-15', min: '2026-06-01', max: '2026-12-31' },
}

export const Controlled = () => {
  const [date, setDate] = useState('2026-06-01')
  return (
    <Field label="Scheduled date">
      <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
    </Field>
  )
}

export const DateOnly: Story = {
  args: { type: 'date', value: '2026-06-15' },
}

export const DatetimeLocal: Story = {
  args: { type: 'datetime-local', value: '2026-06-15T14:30' },
}

export const SaveStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Field label="Saving">
        <DatePicker value="2026-06-01" status="saving" />
      </Field>
      <Field label="Saved">
        <DatePicker value="2026-06-01" status="saved" />
      </Field>
      <Field label="Error">
        <DatePicker value="" status="error" error />
      </Field>
    </div>
  ),
}
