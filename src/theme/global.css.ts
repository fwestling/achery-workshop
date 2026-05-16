import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css.js'

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
