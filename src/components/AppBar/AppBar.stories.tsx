import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AppBar } from './AppBar'
import { useTheme } from '../../theme/ThemeProvider'
import type { AccentColor } from '../../types/theme'

const meta = {
  title: 'Layout/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brandName: 'Achery',
    brandSub: 'Workshop',
    showSearch: true,
    searchKbd: '⌘K',
    avatarInitials: 'FW',
  },
}

export const WithThemeControls: Story = {
  render: () => {
    const { theme, toggleTheme, accent, setAccent } = useTheme()
    return (
      <AppBar
        brandName="Achery"
        brandSub="Workshop"
        showSearch
        searchKbd="⌘K"
        avatarInitials="FW"
        isDark={theme === 'dark'}
        accent={accent}
        onToggleTheme={toggleTheme}
        onAccentChange={setAccent}
        onNewClick={() => alert('New entry')}
      />
    )
  },
}

export const Minimal: Story = {
  args: {
    brandName: 'Achery',
    showSearch: false,
  },
}
