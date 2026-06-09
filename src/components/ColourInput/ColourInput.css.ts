import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp2,
})

export const swatch = style({
  width: 36,
  height: 36,
  border: `1px solid ${vars.color.border}`,
  padding: 2,
  cursor: 'pointer',
  background: 'transparent',
  flexShrink: 0,
  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const textWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.bgSunken,
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:focus-within': {
      borderColor: vars.color.accent,
      borderWidth: '2px',
    },
  },
})

export const textWrapperError = style({
  selectors: {
    '&, &:focus-within': {
      borderColor: vars.color.danger,
    },
  },
})

export const prefix = style({
  padding: '6px 0 6px 8px',
  fontFamily: vars.font.mono,
  fontSize: '13px',
  color: vars.color.fg3,
  userSelect: 'none',
  lineHeight: '1',
})

export const textInput = style({
  flex: 1,
  fontFamily: vars.font.mono,
  fontSize: '13px',
  border: 'none',
  padding: '6px 8px 6px 2px',
  background: 'transparent',
  color: vars.color.fg,
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.fgMute,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})
