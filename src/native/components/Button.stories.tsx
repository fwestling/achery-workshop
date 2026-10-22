import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Button } from './Button'

// React Native stories: rendered on workshop.achery.dev through react-native-web. Not part of this repo's
// Storybook (web only) and not published to npm (package.json `files` excludes them).

const row = { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' } as const

const meta = {
  title: 'Native/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The native counterpart of the web Button: the same five variants and three sizes, as a `TouchableOpacity` announced as a button. A label that is only an icon needs `accessibilityLabel`.',
      },
    },
  },
  args: { children: 'Save draft', variant: 'secondary', size: 'md' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <View style={row}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </View>
  ),
}

export const Sizes: Story = {
  render: () => (
    <View style={row}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg" variant="accent">
        Large
      </Button>
    </View>
  ),
}

export const Disabled: Story = {
  render: () => (
    <View style={row}>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="accent" disabled>
        Accent
      </Button>
    </View>
  ),
}
