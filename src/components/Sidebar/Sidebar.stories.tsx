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
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vertical navigation sidebar. Groups of items can be labelled with an eyebrow heading. Each item can be a link (`href`) or a button (`onItemClick`). Active state is driven by `activeId` matching an item\'s `id` — the active item gets a filled accent background.',
      },
    },
  },
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

export const Desktop: Story = {
  render: () => {
    const [active, setActive] = useState('workbench')
    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Sidebar
          groups={groups}
          activeId={active}
          onItemClick={setActive}
          footer={<Mono variant="small">achery-ui v0.5.0</Mono>}
        />
      </div>
    )
  },
}

export const MobileOverlayClosed: Story = {
  render: () => {
    const [active, setActive] = useState('workbench')
    return (
      <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
        <Sidebar
          groups={groups}
          activeId={active}
          onItemClick={setActive}
          mobileOpen={false}
          onMobileOpenChange={() => {}}
          footer={<Mono variant="small">achery-ui v0.5.0</Mono>}
        />
        <p style={{ padding: 16 }}>Sidebar is off-screen (closed)</p>
      </div>
    )
  },
}

export const MobileOverlayOpen: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [active, setActive] = useState('workbench')
    return (
      <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
        <Sidebar
          groups={groups}
          activeId={active}
          onItemClick={setActive}
          mobileOpen={open}
          onMobileOpenChange={setOpen}
          footer={<Mono variant="small">achery-ui v0.5.0</Mono>}
        />
        <p style={{ padding: 16 }}>Click backdrop to close</p>
        <button onClick={() => setOpen(o => !o)} style={{ margin: 16 }}>Toggle</button>
      </div>
    )
  },
}

export const WithAccentCount: Story = {
  render: () => {
    const [active, setActive] = useState('workbench')
    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Sidebar
          groups={[{
            label: 'Workbench',
            items: [
              { id: 'workbench', label: 'All entries', glyph: 'scroll', count: 24, countTone: 'accent' },
              { id: 'saved', label: 'Saved', glyph: 'feather', count: 3, countTone: 'neutral' },
            ],
          }]}
          activeId={active}
          onItemClick={setActive}
        />
      </div>
    )
  },
}
