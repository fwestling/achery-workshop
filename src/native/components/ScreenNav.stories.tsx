import type { Meta, StoryObj } from '@storybook/react'
import { ScreenNav } from './ScreenNav'

const meta = {
  title: 'Native/ScreenNav',
  component: ScreenNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The bar at the top of a pushed or modal screen: a back button, a centred title that truncates to one line, and an optional action.',
      },
    },
  },
  args: { title: 'Iron-gall ink', onBack: () => {} },
} satisfies Meta<typeof ScreenNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: { title: 'New recipe', backLabel: 'Cancel', actionLabel: 'Save', onAction: () => {} },
}

export const ActionDisabled: Story = {
  args: { title: 'New recipe', backLabel: 'Cancel', actionLabel: 'Save', onAction: () => {}, actionDisabled: true },
}

export const Compact: Story = {
  args: { title: 'A rather long title that will not fit on one line', compact: true },
}
