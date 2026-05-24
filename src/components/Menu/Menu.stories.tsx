import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { layout: 'padded' },
}
export default meta

export const Default = () => (
  <Menu
    trigger={<Button variant="secondary" size="sm">Actions</Button>}
    items={[
      { id: 'edit', label: 'Edit', glyph: 'key', onSelect: () => alert('edit') },
      { id: 'duplicate', label: 'Duplicate', onSelect: () => alert('duplicate') },
      { type: 'separator', id: 'sep1' },
      { id: 'delete', label: 'Delete', danger: true, onSelect: () => alert('delete') },
    ]}
  />
)

export const WithDisabledItem = () => (
  <Menu
    trigger={<Button variant="ghost" size="sm">•••</Button>}
    items={[
      { id: 'start', label: 'Start phase', onSelect: () => {} },
      { id: 'skip', label: 'Skip (unavailable)', disabled: true, onSelect: () => {} },
      { type: 'separator', id: 'sep' },
      { id: 'archive', label: 'Archive', danger: true, onSelect: () => {} },
    ]}
  />
)

export const AlignStart = () => (
  <Menu
    trigger={<Button variant="accent">Open menu</Button>}
    align="start"
    items={[
      { id: 'a', label: 'Option A', onSelect: () => {} },
      { id: 'b', label: 'Option B', onSelect: () => {} },
    ]}
  />
)
