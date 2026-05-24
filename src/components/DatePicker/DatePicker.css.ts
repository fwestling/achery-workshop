import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

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
  },
})
