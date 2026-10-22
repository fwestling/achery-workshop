import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'react-native'
import { Button } from './Button'
import { ToastProvider, useToast } from './Toast'

const Demo = () => {
  const { toast } = useToast()
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, minHeight: 160 }}>
      <Button onPress={() => toast({ title: 'Saved.' })}>Title only</Button>
      <Button onPress={() => toast({ title: 'Three new things.', description: 'Imported from the field notes.' })}>
        With description
      </Button>
    </View>
  )
}

const meta = {
  title: 'Native/Toast',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Toasts that float over the screen and dismiss themselves. Mount `ToastProvider` once at the navigation root, then call `useToast().toast()` anywhere below it.',
      },
    },
  },
} satisfies Meta<typeof ToastProvider>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}
