import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: { value: 60 },
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const Neutral: Story = { args: { tone: 'neutral' } }
export const Accent: Story = { args: { tone: 'accent' } }
export const Small: Story = { args: { size: 'sm', tone: 'accent' } }
export const Empty: Story = { args: { value: 0 } }
export const Full: Story = { args: { value: 100, tone: 'accent' } }
