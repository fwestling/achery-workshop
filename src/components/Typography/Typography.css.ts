import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const display = style({
  fontFamily: vars.font.display,
  fontWeight: 900,
  fontSize: '88px',
  lineHeight: 0.95,
  letterSpacing: '-0.02em',
  color: vars.color.fg,
  margin: 0,
})

export const h1 = style({
  fontFamily: vars.font.display,
  fontWeight: 700,
  fontSize: '46px',
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  color: vars.color.fg,
  margin: 0,
})

export const h2 = style({
  fontFamily: vars.font.display,
  fontWeight: 700,
  fontSize: '34px',
  lineHeight: 1.08,
  letterSpacing: '-0.01em',
  color: vars.color.fg,
  margin: 0,
})

export const h3 = style({
  fontFamily: vars.font.display,
  fontWeight: 500,
  fontSize: '26px',
  lineHeight: 1.2,
  color: vars.color.fg,
  margin: 0,
})

export const h4 = style({
  fontFamily: vars.font.display,
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: 1.2,
  color: vars.color.fg,
  margin: 0,
})

export const h5 = style({
  fontFamily: vars.font.body,
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.color.fg,
  margin: 0,
})

export const body = style({
  fontFamily: vars.font.body,
  fontSize: '14px',
  lineHeight: 1.45,
  color: vars.color.fg,
  margin: 0,
})

export const bodyLead = style({
  fontFamily: vars.font.body,
  fontSize: '16px',
  lineHeight: 1.45,
  color: vars.color.fg2,
  margin: 0,
})

export const bodySmall = style({
  fontFamily: vars.font.body,
  fontSize: '12px',
  lineHeight: 1.45,
  color: vars.color.fg2,
  margin: 0,
})

export const mono = style({
  fontFamily: vars.font.mono,
  fontSize: '13px',
  lineHeight: 1.45,
  color: vars.color.fg,
  fontVariantNumeric: 'tabular-nums',
  margin: 0,
})

export const monoSmall = style({
  fontFamily: vars.font.mono,
  fontSize: '11px',
  lineHeight: 1.45,
  color: vars.color.fg2,
  fontVariantNumeric: 'tabular-nums',
  margin: 0,
})
