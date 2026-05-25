import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SingleCombobox } from './Combobox'

const meta: Meta<typeof SingleCombobox> = {
  title: 'Components/SingleCombobox',
  component: SingleCombobox,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof SingleCombobox>

const options = ['Subscriptions', 'Utilities', 'Groceries', 'Transport', 'Entertainment', 'Health']

export const FixedOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null)
    return (
      <div style={{ width: 280 }}>
        <SingleCombobox
          value={value}
          onChange={setValue}
          options={options}
          placeholder="Select a category…"
        />
        <p style={{ marginTop: 8, fontSize: 12 }}>Selected: {value ?? 'none'}</p>
      </div>
    )
  },
}

export const WithCustom: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null)
    return (
      <div style={{ width: 280 }}>
        <SingleCombobox
          value={value}
          onChange={setValue}
          options={options}
          allowCustom
          placeholder="Select or type…"
        />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('Groceries')
    return (
      <div style={{ width: 280 }}>
        <SingleCombobox value={value} onChange={setValue} options={options} />
        <button onClick={() => setValue(null)} style={{ marginTop: 8 }}>Clear</button>
      </div>
    )
  },
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => {
    const [value, setValue] = useState<string | null>(null)
    return (
      <div style={{ width: 280 }}>
        <SingleCombobox value={value} onChange={setValue} options={options} placeholder="Select…" />
      </div>
    )
  },
}
