import type { Preview, Decorator } from '@storybook/react'
import React from 'react'
import { AcheryProvider } from '../src/theme/ThemeProvider'
import type { AccentColor, ThemeMode, MaterialSignature } from '../src/types/theme'

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
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
    material: {
      name: 'Material',
      defaultValue: 'none',
      toolbar: {
        icon: 'category',
        items: [
          { value: 'none', title: 'No material' },
          { value: 'leather', title: 'Leather' },
          { value: 'wood', title: 'Wood' },
          { value: 'copper', title: 'Copper' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    ((Story, ctx) => {
      const theme = (ctx.globals['theme'] as ThemeMode | undefined) ?? 'light'
      const accent = (ctx.globals['accent'] as AccentColor) ?? 'terracotta'
      const material = (ctx.globals['material'] as MaterialSignature | undefined) ?? 'none'
      return (
        <AcheryProvider
          defaultTheme={theme}
          defaultAccent={accent}
          defaultMaterial={material}
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
