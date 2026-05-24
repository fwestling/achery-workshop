import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  args: { label: 'Accept terms' },
}

export const Checked: Story = {
  args: { checked: true, label: 'Accept terms' },
}

export const Indeterminate: Story = {
  args: { checked: 'indeterminate', label: 'Select all' },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable option' },
}

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, label: 'Locked selection' },
}

export const Controlled = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label={`Status: ${checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}`}
    />
  )
}

export const NoLabel: Story = {
  args: { 'aria-label': 'Toggle selection', checked: false },
}
