import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'

type AccentEntry = { light: { main: string; fg: string }; dark: { main: string; fg: string } }

const accents: Record<string, AccentEntry> = {
  terracotta: {
    light: { main: '#c46a3a', fg: '#fbf8f0' },
    dark: { main: '#d97a4a', fg: '#14130f' },
  },
  moss: {
    light: { main: '#4a5a32', fg: '#fbf8f0' },
    dark: { main: '#8da866', fg: '#14130f' },
  },
  plum: {
    light: { main: '#5d4a6a', fg: '#fbf8f0' },
    dark: { main: '#8b6fa8', fg: '#14130f' },
  },
  ochre: {
    light: { main: '#b8924a', fg: '#1f1d18' },
    dark: { main: '#e0bc70', fg: '#1f1d18' },
  },
  rust: {
    light: { main: '#8a3a22', fg: '#fbf8f0' },
    dark: { main: '#c46a3a', fg: '#14130f' },
  },
  copper: {
    light: { main: '#b8742a', fg: '#1f1d18' },
    dark: { main: '#d68f48', fg: '#1f1d18' },
  },
  slate: {
    light: { main: '#195a73', fg: '#fbf8f0' },
    dark: { main: '#5189a1', fg: '#14130f' },
  },
  verdigris: {
    light: { main: '#00685f', fg: '#fbf8f0' },
    dark: { main: '#3f9086', fg: '#14130f' },
  },
  mauve: {
    light: { main: '#76425b', fg: '#fbf8f0' },
    dark: { main: '#a56c87', fg: '#14130f' },
  },
  amber: {
    light: { main: '#9a6839', fg: '#1f1d18' },
    dark: { main: '#be8c61', fg: '#1f1d18' },
  },
  fern: {
    light: { main: '#36643e', fg: '#fbf8f0' },
    dark: { main: '#618d67', fg: '#14130f' },
  },
  blush: {
    light: { main: '#955c63', fg: '#fbf8f0' },
    dark: { main: '#bc848a', fg: '#14130f' },
  },
}

for (const [name, entry] of Object.entries(accents)) {
  globalStyle(
    `[data-achery-root][data-theme="light"][data-accent="${name}"]`,
    {
      vars: {
        [vars.color.accent]: entry.light.main,
        [vars.color.accentFg]: entry.light.fg,
      },
    },
  )
  globalStyle(
    `[data-achery-root][data-theme="dark"][data-accent="${name}"]`,
    {
      vars: {
        [vars.color.accent]: entry.dark.main,
        [vars.color.accentFg]: entry.dark.fg,
      },
    },
  )
}
