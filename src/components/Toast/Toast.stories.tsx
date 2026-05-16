import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import { Button } from '../Button/Button'
import { AcheryProvider } from '../../theme/ThemeProvider'

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button
        variant="secondary"
        onClick={() => toast({ title: 'Saved.', description: 'The page knows.' })}
      >
        Simple toast
      </Button>
      <Button
        variant="primary"
        onClick={() => toast({
          title: 'Three new things.',
          description: 'Probably non-urgent.',
          duration: 6000,
        })}
      >
        With description
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({
          title: 'Something gave way.',
          description: 'Check the log.',
          duration: 0,
        })}
      >
        Persistent
      </Button>
    </div>
  )
}

const meta = {
  title: 'Overlays/Toast',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}
