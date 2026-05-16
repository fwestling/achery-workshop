import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
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
