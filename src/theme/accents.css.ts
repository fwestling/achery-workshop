import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'
import { accentColors } from '../tokens/accents'

// Each accent's light-mode fill (main) and dark-mode fill (light), with the text that sits on each — from the
// token module shared with achery-ui/native, so web and native never drift.
for (const [name, entry] of Object.entries(accentColors)) {
  globalStyle(
    `[data-achery-root][data-theme="light"][data-accent="${name}"]`,
    {
      vars: {
        [vars.color.accent]: entry.main,
        [vars.color.accentFg]: entry.fg,
      },
    },
  )
  globalStyle(
    `[data-achery-root][data-theme="dark"][data-accent="${name}"]`,
    {
      vars: {
        [vars.color.accent]: entry.light,
        [vars.color.accentFg]: entry.fgDark,
      },
    },
  )
}
