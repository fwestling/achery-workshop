import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'Binary on/off switch built on Radix Toggle. Supports controlled (`pressed` + `onPressedChange`) and uncontrolled (`defaultPressed`) usage. Always provide a visible `label` or an `aria-label` for accessibility.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { label: 'Dark mode' },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const On: Story = { args: { defaultPressed: true } }
export const WithLabel: Story = { args: { label: 'Enable notifications', defaultPressed: true } }
export const Disabled: Story = { args: { disabled: true, defaultPressed: true, label: 'Disabled' } }

export const SaveStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle pressed label="Auto-sync (saving)" status="saving" />
      <Toggle pressed label="Auto-sync (saved)" status="saved" />
      <Toggle pressed label="Auto-sync (error)" status="error" />
      <Toggle pressed label="No status" />
    </div>
  ),
}
