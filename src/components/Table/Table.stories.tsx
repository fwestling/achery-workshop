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

export const EmptyState: Story = {
  render: () => (
    <Table
      columns={columns}
      data={[]}
      rowKey={r => r.id}
      emptyState={<span>No subscriptions found.</span>}
    />
  ),
}

export const WithToolbarSlot: Story = {
  render: () => (
    <Table
      columns={columns}
      data={data}
      rowKey={r => r.id}
      toolbar={<input placeholder="Filter…" style={{ border: '1px solid #ccc', padding: '4px 8px', fontSize: 13 }} />}
    />
  ),
}

export const WideOverflow: Story = {
  render: () => (
    <div style={{ width: 600, border: '2px dashed tomato', resize: 'horizontal', overflow: 'hidden' }}>
      <Table
        columns={[
          { key: 'date', label: 'Date', mono: true, width: '120px', sortable: true },
          { key: 'description', label: 'Description', width: '220px' },
          { key: 'amount', label: 'Amount', mono: true, width: '100px', sortable: true },
          { key: 'type', label: 'Type', width: '100px' },
          { key: 'category', label: 'Category', width: '160px' },
          { key: 'account', label: 'Account', width: '160px' },
          { key: 'vendor', label: 'Vendor', width: '160px' },
          { key: 'subscription', label: 'Subscription', width: '160px' },
          { key: 'comments', label: 'Comments', width: '200px' },
          { key: 'delete', label: 'Delete', width: '80px' },
        ]}
        data={[
          { id: 't1', date: '1 Mar 2026', description: 'Woolworths Supermarkets MACQUARIE CENTRE', amount: '$-84.23', type: 'basic', category: 'Household', account: 'ING Daily', vendor: 'Woolworths', subscription: '—', comments: 'Weekly groceries', delete: '×' },
          { id: 't2', date: '1 Mar 2026', description: 'HARRY HARTOG BOOKSELLER NORTH RYDE', amount: '$-13.11', type: 'basic', category: 'Baby', account: 'ING Daily', vendor: 'Harry Hartog', subscription: '—', comments: '—', delete: '×' },
          { id: 't3', date: '1 Mar 2026', description: 'MISTER MINIT MACQUARIE CENTRE', amount: '$-20.24', type: 'basic', category: 'Household', account: 'ING Daily', vendor: 'Mister Minit', subscription: '—', comments: 'Sharpening knife', delete: '×' },
          { id: 't4', date: '19 Mar 2026', description: 'Spotify Australia STOCKHOLM', amount: '$-11.99', type: 'basic', category: 'Entertainment', account: 'Westpac Black', vendor: 'Spotify', subscription: 'Music', comments: '—', delete: '×' },
          { id: 't5', date: '19 Mar 2026', description: 'iinet Limited PERTH', amount: '$-89.95', type: 'basic', category: 'Utilities', account: 'Westpac Black', vendor: 'iinet', subscription: 'WiFi', comments: '—', delete: '×' },
        ]}
        rowKey={r => r.id as string}
        toolbar={<div style={{ fontSize: 12, color: '#666' }}>Resize the red box to verify horizontal scroll ↔</div>}
      />
    </div>
  ),
}

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(0)
    const pageSize = 2
    const pageData = data.slice(page * pageSize, page * pageSize + pageSize)
    return (
      <Table
        columns={columns}
        data={pageData}
        rowKey={r => r.id}
        pageIndex={page}
        pageSize={pageSize}
        totalRows={data.length}
        onPageChange={setPage}
      />
    )
  },
}

const manyRows: Recipe[] = Array.from({ length: 42 }, (_, i) => ({
  id: `r${i + 1}`,
  ch: String(i + 1),
  name: `Recipe ${i + 1}`,
  chapter: ['Ink', 'Pigment', 'Dye', 'Finish'][i % 4]!,
  state: ['saved', 'drafting', 'stopped', 'archived'][i % 4]!,
  yield: `${(i + 1) * 50} ml`,
  updated: `${String((i % 28) + 1).padStart(2, '0')} NOV 2026`,
}))

export const WithPaginationWindow: Story = {
  render: () => {
    const [page, setPage] = useState(0)
    const pageSize = 5
    const pageData = manyRows.slice(page * pageSize, (page + 1) * pageSize)
    return (
      <Table
        columns={columns}
        data={pageData}
        rowKey={r => r.id}
        pageIndex={page}
        pageSize={pageSize}
        totalRows={manyRows.length}
        onPageChange={setPage}
        paginationWindow={2}
      />
    )
  },
}

export const FixedHeight: Story = {
  render: () => (
    <Table
      columns={columns}
      data={manyRows}
      rowKey={r => r.id}
      height="400px"
      defaultSortKey="name"
      defaultSortDir="asc"
    />
  ),
}

export const FixedHeightWithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const pageData = manyRows.slice(page * pageSize, (page + 1) * pageSize)
    return (
      <Table
        columns={columns}
        data={pageData}
        rowKey={r => r.id}
        height="500px"
        pageIndex={page}
        pageSize={pageSize}
        totalRows={manyRows.length}
        onPageChange={setPage}
        pageSizeOptions={[5, 10, 20]}
        onPageSizeChange={size => { setPageSize(size); setPage(0) }}
      />
    )
  },
}

export const WithPageSizeSelector: Story = {
  render: () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const pageData = manyRows.slice(page * pageSize, (page + 1) * pageSize)
    return (
      <Table
        columns={columns}
        data={pageData}
        rowKey={r => r.id}
        pageIndex={page}
        pageSize={pageSize}
        totalRows={manyRows.length}
        onPageChange={setPage}
        pageSizeOptions={[5, 10, 20]}
        onPageSizeChange={size => { setPageSize(size); setPage(0) }}
        paginationWindow={1}
      />
    )
  },
}
