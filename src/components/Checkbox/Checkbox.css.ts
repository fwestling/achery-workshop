import { style, styleVariants, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'
import { dialVar } from '../../theme/dial'

const tickFill = dialVar('tickFill', vars.color.accent)

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sp3,
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const root = style({
  width: 16,
  height: 16,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  background: vars.color.surface,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    // Accent under the chrome and surface dials, ink under underline
    '&[data-state="checked"]': {
      background: tickFill,
      borderColor: tickFill,
    },
    '&[data-state="indeterminate"]': {
      background: tickFill,
      borderColor: tickFill,
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

export const indicator = style({
  color: dialVar('tickMark', vars.color.accentFg),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
})

export const label = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  userSelect: 'none',
  lineHeight: 1.4,
})

export const statusIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
})

export const statusIndicatorVariants = styleVariants({
  saving: { color: vars.color.fg3, animation: `${spin} 1s linear infinite` },
  saved: { color: vars.color.accent },
  error: { color: vars.color.danger },
})
