import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof BarChart>

const days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 8, 21 + i))
  return { label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' }), values: [[0, 1.5, 2.25, 0.5, 3, 0, 0.75][i % 7]!] }
})

/** One series: no legend — the label says what it is. */
export const Columns: Story = {
  args: { label: 'Hours spent per day', series: ['Hours'], data: days, formatValue: (v: number) => `${v}h` },
}

/** Stacked categorical series, with a legend; every value is in the hover and the table. */
export const Stacked: Story = {
  args: {
    label: 'Hours per week, by area',
    series: ['World', 'Rules', 'Dialogue', 'Scenes', 'Modules'],
    data: [
      { label: '31 Aug', values: [2, 1, 4, 0.5, 0] },
      { label: '7 Sep', values: [1, 0, 6, 2, 1] },
      { label: '14 Sep', values: [3, 2, 2, 1, 0.5] },
      { label: '21 Sep', values: [0.5, 0, 8, 3, 0] },
      { label: '28 Sep', values: [1, 1, 3, 4, 2] },
    ],
    showValues: true,
    formatValue: (v: number) => `${v}h`,
  },
}

/** Rows, an ordinal scale for ordered series, and bars that link to the list they count. */
export const RowsOrdinal: Story = {
  args: {
    label: 'Entities by status',
    orientation: 'horizontal',
    scale: 'ordinal',
    series: ['Stub', 'Draft', 'Complete'],
    data: [
      { label: 'Locations', values: [3, 8, 14], href: '#locations' },
      { label: 'NPCs', values: [12, 9, 4], href: '#npcs' },
      { label: 'Conversations', values: [2, 6, 1], href: '#conversations' },
      { label: 'A custom type with a long name', values: [0, 0, 2], href: '#custom' },
      { label: 'Recipes', values: [0, 0, 0], href: '#recipes' },
    ],
  },
}

/** Buttons instead of links */
export const Selectable: Story = {
  args: {
    label: 'Lines per NPC',
    orientation: 'horizontal',
    series: ['Lines'],
    data: [
      { label: 'Mira', values: [84], onSelect: () => alert('Mira') },
      { label: 'Bram', values: [31], onSelect: () => alert('Bram') },
      { label: 'Old Tom', values: [1240], onSelect: () => alert('Old Tom') },
    ],
  },
}

export const Empty: Story = {
  args: { label: 'Nothing yet', series: ['Count'], data: [] },
}

/** The largest bar meets the axis' top, with its total above it; quarter-hour ticks read exactly. */
export const ValuesOnColumns: Story = {
  args: {
    label: 'Conversations per NPC',
    series: ['Conversations'],
    showValues: true,
    data: [{ label: 'Mira', values: [8] }, { label: 'Bram', values: [3] }, { label: 'Tom', values: [5] }, { label: 'Ysolde', values: [1] }],
  },
}

export const Fractions: Story = {
  args: { label: 'Hours', series: ['Hours'], data: [{ label: 'Mon', values: [0.5] }, { label: 'Tue', values: [1] }, { label: 'Wed', values: [0.25] }] },
}
