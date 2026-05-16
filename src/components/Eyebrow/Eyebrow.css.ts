import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sp3,
  fontFamily: vars.font.body,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: vars.color.fg2,
})

export const count = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.font.mono,
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: 0,
  textTransform: 'none',
  color: vars.color.fg3,
  background: vars.color.bg2,
  border: `1px solid ${vars.color.borderMute}`,
  borderRadius: vars.radius.pill,
  minWidth: '18px',
  height: '16px',
  padding: '0 5px',
  lineHeight: 1,
})
