import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Glyph } from './Glyph'

const meta = {
  title: 'Native/Glyph',
  component: Glyph,
  parameters: {
    docs: {
      description: {
        component:
          'Any of the 397 glyphs on native, drawn with react-native-svg (Metro needs react-native-svg-transformer; see Setup). Colour defaults to the theme `fg`. Decorative unless given an `accessibilityLabel`.',
      },
    },
  },
  args: { name: 'fern', size: 24 },
} satisfies Meta<typeof Glyph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Glyph name="flask" size={16} />
      <Glyph name="flask" size={24} />
      <Glyph name="flask" size={32} />
      <Glyph name="flask" size={48} />
    </View>
  ),
}

export const Coloured: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Glyph name="leaf" color="#4a5a32" />
      <Glyph name="sun" color="#b8924a" />
      <Glyph name="moon" color="#5e486d" />
    </View>
  ),
}

/** With a label, the glyph is announced as an image; without one, screen readers skip it. */
export const Labelled: Story = {
  args: { name: 'warning', accessibilityLabel: 'Warning' },
}
