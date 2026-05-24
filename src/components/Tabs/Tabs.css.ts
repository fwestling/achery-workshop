import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const tabList = style({
  display: 'flex',
  borderBottom: `1px solid ${vars.color.border}`,
})

export const tab = style({
  fontFamily: vars.font.body,
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  padding: `${vars.space.sp4} ${vars.space.sp5}`,
  background: 'transparent',
  border: 'none',
  borderBottom: '3px solid transparent',
  marginBottom: '-1px',
  color: vars.color.fg2,
  cursor: 'pointer',
  transition: `color ${vars.duration.fast} ${vars.ease.out}`,
  outline: 'none',
  selectors: {
    '&[data-state="active"]': {
      color: vars.color.fg,
      borderBottomColor: vars.color.accent,
    },
    '&:hover:not([data-state="active"])': {
      color: vars.color.fg,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '-2px',
    },
  },
})

export const tabPanel = style({
  outline: 'none',
})
