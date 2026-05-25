import type { Meta, StoryObj } from '@storybook/react'
import { KpiTile } from './KpiTile'

const meta: Meta<typeof KpiTile> = {
  title: 'Components/KpiTile',
  component: KpiTile,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof KpiTile>

const spark = [2800, 3100, 2900, 3400, 3800, 4200]

export const NoExtras: Story = {
  args: { label: 'Total Income', value: '$4,200' },
}

export const WithDelta: Story = {
  args: { label: 'Total Income', value: '$4,200', delta: '+$340 vs last month', deltaTone: 'positive' },
}

export const WithSparkline: Story = {
  args: { label: 'Total Income', value: '$4,200', sparkData: spark, deltaTone: 'positive' },
}

export const Clickable: Story = {
  args: {
    label: 'Total Income',
    value: '$4,200',
    delta: '+$340 vs last month',
    deltaTone: 'positive',
    onClick: () => alert('tile clicked'),
  },
}

export const FullExample: Story = {
  args: {
    label: 'Total Income',
    value: '$4,200',
    delta: '+$340 vs last month',
    deltaTone: 'positive',
    sparkData: spark,
    onClick: () => alert('navigate'),
  },
}

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { label: 'Total Income', value: '$4,200', delta: '+$340 vs last month', deltaTone: 'positive', sparkData: spark },
}
