import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GlyphPicker } from './GlyphPicker'
import type { GlyphName } from '../../types/components'
import { Glyph } from '../../glyphs/Glyph'
import { glyphLabel } from '../../glyphs/glyphMeta'

const meta: Meta<typeof GlyphPicker> = {
  title: 'Components/GlyphPicker',
  component: GlyphPicker,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof GlyphPicker>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<GlyphName | undefined>(undefined)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <GlyphPicker {...(value ? { value } : {})} onChange={setValue} />
        <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>
          Selected: {value ? glyphLabel(value) : 'none'}
        </p>
      </div>
    )
  },
}

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState<GlyphName | undefined>('flask')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <GlyphPicker {...(value ? { value } : {})} onChange={setValue} />
        <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>
          Selected: {value ? glyphLabel(value) : 'none'}
        </p>
      </div>
    )
  },
}

export const NotClearable: Story = {
  render: () => {
    const [value, setValue] = useState<GlyphName | undefined>('star')
    return (
      <GlyphPicker {...(value ? { value } : {})} onChange={setValue} clearable={false} />
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <GlyphPicker value="moon" disabled />
  ),
}

export const InAForm: Story = {
  render: () => {
    const [icon, setIcon] = useState<GlyphName | undefined>(undefined)
    const [label, setLabel] = useState('My Category')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, opacity: 0.7 }}>Name</label>
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            style={{
              padding: '6px 10px', border: '1.5px solid #ccc', borderRadius: 2,
              fontFamily: 'inherit', fontSize: 13,
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, opacity: 0.7 }}>Icon</label>
          <GlyphPicker {...(icon ? { value: icon } : {})} onChange={setIcon} placeholder="No icon" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f5f0e8', borderRadius: 4 }}>
          {icon && <Glyph name={icon} size={16} />}
          <span style={{ fontSize: 13 }}>{label}</span>
        </div>
      </div>
    )
  },
}
