import { style, styleVariants, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const input = style({
  fontFamily: vars.font.mono,
  fontSize: '13px',
  color: vars.color.fg,
  background: vars.color.surface,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  padding: `${vars.space.sp2} ${vars.space.sp3}`,
  width: '100%',
  boxSizing: 'border-box',
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.accent,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    '&[data-error="true"]': {
      borderColor: vars.color.danger,
    },
    '&[data-has-status="true"]': {
      paddingRight: '28px',
    },
  },
})

export const wrapper = style({
  position: 'relative',
  width: '100%',
})

export const statusIcon = style({
  position: 'absolute',
  right: '9px',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
})

export const statusIconVariants = styleVariants({
  saving: { color: vars.color.fg3, animation: `${spin} 1s linear infinite` },
  saved: { color: vars.color.accent },
  error: { color: vars.color.danger },
})
