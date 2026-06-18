import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'

/**
 * Stable CSS custom property aliases under the `--achery-*` namespace.
 * These point at the hashed vanilla-extract vars so consumers can safely
 * reference them in inline styles, e.g. `var(--achery-color-fg)`.
 */
globalStyle('[data-achery-root], :root[data-achery-root]', {
  vars: {
    // Colour
    '--achery-color-bg': vars.color.bg,
    '--achery-color-bg2': vars.color.bg2,
    '--achery-color-bgSunken': vars.color.bgSunken,
    '--achery-color-surface': vars.color.surface,
    '--achery-color-surface2': vars.color.surface2,
    '--achery-color-fg': vars.color.fg,
    '--achery-color-fg2': vars.color.fg2,
    '--achery-color-fg3': vars.color.fg3,
    '--achery-color-fgMute': vars.color.fgMute,
    '--achery-color-border': vars.color.border,
    '--achery-color-border2': vars.color.border2,
    '--achery-color-borderMute': vars.color.borderMute,
    '--achery-color-rule': vars.color.rule,
    '--achery-color-accent': vars.color.accent,
    '--achery-color-accentFg': vars.color.accentFg,
    '--achery-color-accent2': vars.color.accent2,
    '--achery-color-accent3': vars.color.accent3,
    '--achery-color-success': vars.color.success,
    '--achery-color-warn': vars.color.warn,
    '--achery-color-danger': vars.color.danger,
    '--achery-color-info': vars.color.info,
    '--achery-color-selectionBg': vars.color.selectionBg,
    '--achery-color-selectionFg': vars.color.selectionFg,
    // Font
    '--achery-font-display': vars.font.display,
    '--achery-font-body': vars.font.body,
    '--achery-font-mono': vars.font.mono,
    // Space
    '--achery-space-sp1': vars.space.sp1,
    '--achery-space-sp2': vars.space.sp2,
    '--achery-space-sp3': vars.space.sp3,
    '--achery-space-sp4': vars.space.sp4,
    '--achery-space-sp5': vars.space.sp5,
    '--achery-space-sp6': vars.space.sp6,
    '--achery-space-sp7': vars.space.sp7,
    '--achery-space-sp8': vars.space.sp8,
    '--achery-space-sp9': vars.space.sp9,
  },
})

globalStyle('[data-achery-root]', {
  boxSizing: 'border-box',
  fontFamily: vars.font.body,
  fontSize: '14px',
  lineHeight: 1.45,
  color: vars.color.fg,
  background: vars.color.bg,
  WebkitFontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
})

globalStyle('[data-achery-root] *, [data-achery-root] *::before, [data-achery-root] *::after', {
  boxSizing: 'inherit',
})

// Reset UA button/input/select/textarea colour so they inherit the theme fg
// rather than the OS "ButtonText" system colour.
// Reset UA colour on bare/unstyled form elements. Exclude elements that already
// carry a class (e.g. Button, Input recipes) so their own color declarations win.
globalStyle('[data-achery-root] button:not([class]), [data-achery-root] input:not([class]), [data-achery-root] select:not([class]), [data-achery-root] textarea:not([class])', {
  color: 'inherit',
  fontFamily: 'inherit',
})

globalStyle('[data-achery-root] ::selection', {
  background: vars.color.selectionBg,
  color: vars.color.selectionFg,
})

globalStyle('[data-achery-root] a', {
  color: vars.color.fg,
  textDecoration: 'underline',
  textDecorationThickness: '1px',
  textUnderlineOffset: '3px',
  textDecorationColor: vars.color.accent,
})

globalStyle('[data-achery-root] a:hover', {
  color: vars.color.accent,
  textDecorationColor: vars.color.fg,
})

globalStyle('[data-achery-root] hr', {
  border: 0,
  borderTop: `1px solid ${vars.color.rule}`,
  margin: `${vars.space.sp8} 0`,
})

// ---------------------------------------------------------------------------
// Coarse-pointer (touch) layer — always on for touch/mobile surfaces.
//
// Spec: base type 14 → 16px; every interactive element gets a 44px minimum
// hit area via padding/min-size only. Visual marks stay compact; the *target*
// grows. Hairlines, square corners, and stamp shadows are unchanged.
// ---------------------------------------------------------------------------

globalStyle('[data-achery-root]', {
  '@media': {
    '(pointer: coarse)': {
      fontSize: '16px',
    },
  },
})

// Buttons, links, inputs, selects, and any element with a role that implies
// interactivity all get the 44px floor on coarse pointers.
globalStyle(
  [
    '[data-achery-root] button',
    '[data-achery-root] a',
    '[data-achery-root] input',
    '[data-achery-root] select',
    '[data-achery-root] textarea',
    '[data-achery-root] [role="button"]',
    '[data-achery-root] [role="checkbox"]',
    '[data-achery-root] [role="radio"]',
    '[data-achery-root] [role="tab"]',
    '[data-achery-root] [role="menuitem"]',
    '[data-achery-root] [role="option"]',
    '[data-achery-root] [role="switch"]',
  ].join(', '),
  {
    '@media': {
      '(pointer: coarse)': {
        minHeight: '44px',
        minWidth: '44px',
      },
    },
  },
)
