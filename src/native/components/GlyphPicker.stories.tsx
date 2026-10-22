import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import type { GlyphName } from '../../types/components'
import { GlyphPicker } from './GlyphPicker'

const meta = {
  title: 'Native/GlyphPicker',
  component: GlyphPicker,
  parameters: {
    docs: {
      description: {
        component:
          'A trigger that opens a sheet of every glyph, with search and an eight-column grid. Picking the selected glyph again clears it.',
      },
    },
  },
} satisfies Meta<typeof GlyphPicker>

export default meta
type Story = StoryObj<typeof meta>

const Picker = ({ initial }: { initial?: GlyphName }) => {
  const [glyph, setGlyph] = useState<GlyphName | undefined>(initial)
  return (
    <View style={{ maxWidth: 280 }}>
      <GlyphPicker onChange={setGlyph} {...(glyph ? { value: glyph } : {})} />
    </View>
  )
}

export const Default: Story = { render: () => <Picker /> }

export const WithValue: Story = { render: () => <Picker initial="flask" /> }

export const Disabled: Story = {
  render: () => (
    <View style={{ maxWidth: 280 }}>
      <GlyphPicker value="fern" disabled />
    </View>
  ),
}
