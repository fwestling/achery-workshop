import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Sparkline } from './Sparkline'
import { Text } from './Text'

const meta = {
  title: 'Native/Sparkline',
  component: Sparkline,
  parameters: {
    docs: {
      description: {
        component:
          'A small trend line, drawn with react-native-svg. Decorative unless given an `accessibilityLabel` that says what the trend is.',
      },
    },
  },
  args: { data: [1, 3, 2, 5, 4, 6], accessibilityLabel: 'Rising over six weeks' },
} satisfies Meta<typeof Sparkline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {(['positive', 'negative', 'neutral'] as const).map((tone) => (
        <View key={tone} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Sparkline data={tone === 'negative' ? [6, 4, 5, 2, 3, 1] : [1, 3, 2, 5, 4, 6]} tone={tone} width={120} height={36} />
          <Text>{tone}</Text>
        </View>
      ))}
    </View>
  ),
}
