import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { View } from 'react-native'
import { Button } from './Button'
import { ConfirmDialogProvider, useConfirm } from './ConfirmDialog'
import { Text } from './Text'

const Demo = () => {
  const confirm = useConfirm()
  const [result, setResult] = useState('Nothing asked yet.')
  const ask = async () => {
    const ok = await confirm({
      title: 'Delete recipe?',
      message: "This can't be undone.",
      confirmLabel: 'Delete',
      destructive: true,
    })
    setResult(ok ? 'Confirmed.' : 'Cancelled.')
  }
  return (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button variant="danger" onPress={ask}>
        Delete recipe
      </Button>
      <Text muted>{result}</Text>
    </View>
  )
}

const meta = {
  title: 'Native/ConfirmDialog',
  component: ConfirmDialogProvider,
  parameters: {
    docs: {
      description: {
        component:
          'A promise-based yes/no dialog with the same options as the web `useConfirm`. Mount `ConfirmDialogProvider` once inside the theme provider; `await confirm({...})` resolves `true` or `false`.',
      },
    },
  },
} satisfies Meta<typeof ConfirmDialogProvider>

export default meta
// Render-only stories: the component has required props the args would otherwise have to supply
type Story = StoryObj

export const Destructive: Story = {
  render: () => (
    <ConfirmDialogProvider>
      <Demo />
    </ConfirmDialogProvider>
  ),
}
