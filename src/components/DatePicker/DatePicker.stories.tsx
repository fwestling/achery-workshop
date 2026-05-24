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
