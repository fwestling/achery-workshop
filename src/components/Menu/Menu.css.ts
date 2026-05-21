import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const content = style({
  minWidth: 180,
  background: vars.color.surface,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  boxShadow: vars.shadow.stamp,
  padding: `${vars.space.sp2} 0`,
  zIndex: 50,
  animationDuration: vars.duration.fast,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp3,
  padding: `${vars.space.sp2} ${vars.space.sp4}`,
  fontSize: '13px',
  fontFamily: vars.font.body,
  color: vars.color.fg,
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  selectors: {
    '&[data-highlighted]': {
      background: vars.color.surface2,
      color: vars.color.fg,
    },
    '&[data-disabled]': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
})

export const itemDanger = style({
  selectors: {
    '&[data-highlighted]': {
      background: vars.color.danger,
      color: vars.color.accentFg,
    },
  },
})

export const separator = style({
  height: '1px',
  background: vars.color.border,
  margin: `${vars.space.sp2} 0`,
})

export const itemGlyph = style({
  flexShrink: 0,
  opacity: 0.6,
})
