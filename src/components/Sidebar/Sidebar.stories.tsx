import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sidebar } from './Sidebar'
import type { NavGroupDef } from './Sidebar'
import { Mono } from '../Typography/Typography'

const groups: NavGroupDef[] = [
  {
    label: 'Workbench',
    items: [
      { id: 'workbench', label: 'All entries', glyph: 'scroll', count: 24 },
      { id: 'saved', label: 'Saved', glyph: 'tick', count: 18 },
      { id: 'drafting', label: 'Drafting', glyph: 'feather', count: 4 },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'almanac', label: 'Almanac', glyph: 'book' },
      { id: 'guide', label: 'Field guide', glyph: 'leaf' },
      { id: 'archive', label: 'Archive', glyph: 'key', count: 2 },
    ],
  },
]

const meta = {
  title: 'Layout/Sidebar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('workbench')
    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Sidebar
          groups={groups}
          activeId={active}
          onItemClick={setActive}
          footer={<Mono variant="small">achery-ui v0.1.0</Mono>}
        />
      </div>
    )
  },
}
