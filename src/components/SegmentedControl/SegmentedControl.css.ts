import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const root = style({
  display: 'inline-flex',
  border: `1px solid ${vars.color.border}`,
})

export const segment = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.sp2,
  fontFamily: vars.font.body,
  fontWeight: 600,
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  fontSize: '11px',
  padding: `${vars.space.sp2} ${vars.space.sp4}`,
  background: vars.color.surface,
  color: vars.color.fg3,
  border: 'none',
  borderRight: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, color ${vars.duration.fast} ${vars.ease.out}`,
  outline: 'none',
  selectors: {
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover:not(:disabled)': {
      color: vars.color.fg,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '-2px',
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

export const segmentActive = style({
  background: vars.color.fg,
  color: vars.color.bg,
  selectors: {
    '&:hover:not(:disabled)': {
      color: vars.color.bg,
    },
  },
})

export const segmentSm = style({
  fontSize: '10px',
  padding: `${vars.space.sp1} ${vars.space.sp3}`,
})

export const segmentLg = style({
  fontSize: '13px',
  padding: `${vars.space.sp3} ${vars.space.sp5}`,
})
