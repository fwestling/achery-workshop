import type { Meta, StoryObj } from '@storybook/react'
import { Sparkline } from './Sparkline'

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Sparkline',
  component: Sparkline,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Sparkline>

const longData = Array.from({ length: 50 }, (_, i) => Math.sin(i * 0.4) * 50 + 60 + Math.random() * 20)

export const Positive: Story = {
  args: { data: [1, 3, 2, 5, 4, 6, 5, 8], tone: 'positive', width: 80, height: 28 },
}

export const Negative: Story = {
  args: { data: [8, 6, 7, 4, 5, 3, 2, 1], tone: 'negative', width: 80, height: 28 },
}

export const Neutral: Story = {
  args: { data: [3, 5, 3, 7, 4, 6, 5, 4], tone: 'neutral', width: 80, height: 28 },
}

export const ShortData: Story = {
  args: { data: [2, 8], tone: 'positive', width: 80, height: 28 },
}

export const LongData: Story = {
  args: { data: longData, tone: 'neutral', width: 120, height: 36 },
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { data: [2, 5, 3, 8, 6, 7, 4, 9], tone: 'positive', width: 80, height: 28 },
}
