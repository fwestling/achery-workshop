import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { AdaptivePanel } from './AdaptivePanel'
import { Button } from './Button'
import { Text } from './Text'

const meta = {
  title: 'Native/AdaptivePanel',
  component: AdaptivePanel,
  parameters: {
    docs: {
      description: {
        component:
          'A detail surface that adapts to width: a BottomSheet on a phone, and a docked side column from `ADAPTIVE_PANEL_BREAKPOINT` up, displacing the content rather than covering it. `useIsPanelDocked()` says which.',
      },
    },
  },
} satisfies Meta<typeof AdaptivePanel>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

const Demo = () => {
  const [open, setOpen] = useState(false)
  return (
    <View style={{ flexDirection: 'row', minHeight: 240 }}>
      <View style={{ flex: 1, gap: 12, alignItems: 'flex-start' }}>
        <Text>The list stays put; the panel opens beside it or over it.</Text>
        <Button onPress={() => setOpen((o) => !o)}>{open ? 'Close panel' : 'Open panel'}</Button>
      </View>
      <AdaptivePanel open={open} onClose={() => setOpen(false)} title="Iron-gall ink">
        <Text>Oak galls, iron sulfate, gum arabic.</Text>
      </AdaptivePanel>
    </View>
  )
}

/** Docked here (the window is wider than the breakpoint); on a phone it's a sheet. */
export const Default: Story = { render: () => <Demo /> }
