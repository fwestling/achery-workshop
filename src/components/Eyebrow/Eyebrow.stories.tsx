import type { Meta, StoryObj } from '@storybook/react'
import { Eyebrow } from './Eyebrow'

const meta = {
  title: 'Primitives/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
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
