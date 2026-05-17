import type { Preview, Decorator } from '@storybook/react'
import React from 'react'
import { AcheryProvider } from '../src/theme/ThemeProvider'
import type { AccentColor } from '../src/types/theme'
import type { ThemeMode } from '../src/types/theme'

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    accent: {
      name: 'Accent',
      defaultValue: 'terracotta',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'terracotta', title: 'Terracotta' },
          { value: 'moss', title: 'Moss' },
          { value: 'plum', title: 'Plum' },
          { value: 'ochre', title: 'Ochre' },
          { value: 'rust', title: 'Rust' },
          { value: 'copper', title: 'Copper' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    ((Story, ctx) => {
      const accent = (ctx.globals['accent'] as AccentColor) ?? 'terracotta'
      const sbTheme = ctx.globals['theme'] as string | undefined
      const theme: ThemeMode = sbTheme === 'dark' ? 'dark' : 'light'
      return (
        <AcheryProvider
          defaultTheme={theme}
          defaultAccent={accent}
          style={{ minHeight: '100%', padding: '24px' }}
        >
          <Story />
        </AcheryProvider>
      )
    }) satisfies Decorator,
  ],
  parameters: {
    themes: {
      themeOverride: {
        light: { name: 'Light', class: '', color: '#fbf8f0' },
        dark: { name: 'Dark', class: '', color: '#14130f' },
      },
    },
    layout: 'fullscreen',
  },
}

export default preview
