import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Table } from './Table'
import { Badge } from '../Badge/Badge'
import type { ColumnDef } from './Table'
import type { BadgeTone } from '../../types/components'

interface Recipe {
  [key: string]: unknown
  id: string
  ch: string
  name: string
  chapter: string
  state: string
  yield: string
  updated: string
}

const data: Recipe[] = [
  { id: 'r1', ch: 'I', name: 'Iron-gall ink', chapter: 'Ink', state: 'saved', yield: '340 ml', updated: '12 NOV 2026' },
  { id: 'r2', ch: 'II', name: 'Saffron tincture', chapter: 'Pigment', state: 'drafting', yield: '50 ml', updated: '08 NOV 2026' },
  { id: 'r3', ch: 'III', name: 'Oak-bark mordant', chapter: 'Dye', state: 'stopped', yield: '1.2 L', updated: '01 NOV 2026' },
  { id: 'r4', ch: 'IV', name: 'Beeswax polish', chapter: 'Finish', state: 'archived', yield: '200 g', updated: '24 OCT 2026' },
  { id: 'r5', ch: 'V', name: 'Walnut hull stain', chapter: 'Dye', state: 'saved', yield: '800 ml', updated: '19 OCT 2026' },
]

const columns: ColumnDef<Recipe>[] = [
  { key: 'ch', label: 'Ch.', mono: true, width: '48px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'chapter', label: 'Chapter', sortable: true },
  {
    key: 'state',
    label: 'State',
    render: row => (
      <Badge tone={row.state as BadgeTone} dot>{row.state}</Badge>
    ),
  },
  { key: 'yield', label: 'Yield', mono: true },
  { key: 'updated', label: 'Updated', mono: true, sortable: true },
]

const meta = {
  title: 'Data/Table',
  parameters: {
    docs: {
      description: {
        component: 'Sortable data table with hybrid controlled/uncontrolled sort state. Sorting cycles asc → desc → unsorted on repeated column clicks. Client-side sort uses `localeCompare` with `numeric: true`. Selected rows show a left accent rule. Provide `onRowClick` to make rows interactive.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Table
      columns={columns}
      data={data}
      rowKey={r => r.id}
    />
  ),
}

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    return (
      <Table
        columns={columns}
        data={data}
        rowKey={r => r.id}
        selectedKeys={selected}
        onRowClick={key => setSelected(prev =>
          prev.includes(key) ? prev.filter(k => k !== key) : [key]
        )}
      />
    )
  },
}

export const Sortable: Story = {
  render: () => (
    <Table
      columns={columns}
      data={data}
      rowKey={r => r.id}
      defaultSortKey="name"
      defaultSortDir="asc"
    />
  ),
}
