import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Button } from './Button'
import { MaterialCard, MaterialEyebrow } from './MaterialCard'
import { Text } from './Text'

const meta = {
  title: 'Native/MaterialCard',
  component: MaterialCard,
  parameters: {
    docs: {
      description: {
        component:
          "A contained surface in the project's material, for objects that arrive: a sheet, a receipt, one featured card. The signature comes from the theme provider's `material`, or `signature` here; `intensity` sets how loudly it shows.",
      },
    },
  },
} satisfies Meta<typeof MaterialCard>

export default meta
type Story = StoryObj<typeof meta>

export const Intensities: Story = {
  render: () => (
    <View style={{ gap: 20, maxWidth: 360 }}>
      {(['chrome', 'surface', 'full'] as const).map((intensity) => (
        <MaterialCard
          key={intensity}
          intensity={intensity}
          header="Close the month"
          footer={<Button size="sm">Bind & archive</Button>}
        >
          <MaterialEyebrow intensity={intensity}>{`intensity · ${intensity}`}</MaterialEyebrow>
          <Text>Seal the ledger and file it to the archive.</Text>
        </MaterialCard>
      ))}
    </View>
  ),
}

export const Signatures: Story = {
  render: () => (
    <View style={{ gap: 20, maxWidth: 360 }}>
      {(['leather', 'wood', 'copper'] as const).map((signature) => (
        <MaterialCard key={signature} signature={signature} intensity="surface" header={signature}>
          <Text>The same card in each signature.</Text>
        </MaterialCard>
      ))}
    </View>
  ),
}
