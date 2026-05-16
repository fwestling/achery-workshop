import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const track = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: '40px',
  height: '22px',
  borderRadius: vars.radius.pill,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  cursor: 'pointer',
  padding: '2px',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, border-color ${vars.duration.fast} ${vars.ease.out}`,
  flexShrink: 0,
  selectors: {
    '&[data-state="on"]': {
      background: vars.color.accent,
      borderColor: vars.color.accent,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const thumb = style({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: vars.color.fg,
  transition: `transform ${vars.duration.base} ${vars.ease.snap}`,
  selectors: {
    '[data-state="on"] &': {
      transform: 'translateX(18px)',
      background: vars.color.accentFg,
    },
  },
})

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sp4,
})

export const label = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  userSelect: 'none',
})
