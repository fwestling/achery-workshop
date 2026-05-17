import type { Meta, StoryObj } from '@storybook/react'
import { Eyebrow } from './Eyebrow'

const meta = {
  title: 'Primitives/Eyebrow',
  component: Eyebrow,
  parameters: {
    docs: {
      description: {
        component: 'Uppercase section label rendered in small-caps with tracked letter-spacing. Used to introduce content groups, label panels, and head navigation sections. Optionally shows a numeric count badge and an `after` slot for trailing actions.',
      },
    },
  },
  argTypes: {
    count: { control: 'number' },
  },
  args: { children: 'Recent entries' },
} satisfies Meta<typeof Eyebrow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithCount: Story = { args: { count: 12 } }
export const ZeroCount: Story = { args: { count: 0 } }
