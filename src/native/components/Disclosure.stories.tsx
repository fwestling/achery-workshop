import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Disclosure } from './Disclosure'
import { Text } from './Text'

const meta = {
  title: 'Native/Disclosure',
  component: Disclosure,
  parameters: {
    docs: {
      description: {
        component:
          "A collapsible section: a labelled toggle with a 44px hit area that animates its content open. Rung 3 of the disclosure ladder, for what a phone can't show at once.",
      },
    },
  },
} satisfies Meta<typeof Disclosure>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Disclosure label="Method">
        <Text>Steep the galls for a week, strain, add the iron, then the gum.</Text>
      </Disclosure>
    </View>
  ),
}

export const OpenByDefault: Story = {
  render: () => (
    <View style={{ maxWidth: 360 }}>
      <Disclosure label="Ingredients" defaultOpen>
        <Text>Oak galls, iron sulfate, gum arabic, rainwater.</Text>
      </Disclosure>
    </View>
  ),
}
