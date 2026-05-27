import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const appBar = style({
  display: 'flex',
  alignItems: 'center',
  height: '56px',
  padding: `0 ${vars.space.sp6}`,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  gap: vars.space.sp6,
  flexShrink: 0,
})

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp4,
  flexShrink: 0,
})

export const brandName = style({
  fontFamily: vars.font.display,
  fontWeight: 900,
  fontSize: '18px',
  color: vars.color.fg,
  letterSpacing: '-0.01em',
})

export const brandDivider = style({
  width: '1px',
  height: '16px',
  background: vars.color.borderMute,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

export const brandSub = style({
  fontFamily: vars.font.body,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: vars.color.fg3,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

export const searchArea = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp4,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.bg,
  padding: `6px ${vars.space.sp5}`,
  minWidth: 0,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

export const searchInput = style({
  flex: 1,
  border: 'none',
  background: 'transparent',
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.fgMute,
    },
  },
})

export const searchKbd = style({
  fontFamily: vars.font.mono,
  fontSize: '10px',
  color: vars.color.fg3,
  border: `1px solid ${vars.color.borderMute}`,
  padding: '1px 5px',
  whiteSpace: 'nowrap',
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp4,
  flexShrink: 0,
})

/** Wraps all action slots except the avatar — hidden on mobile. */
export const actionsInner = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp4,
  '@media': {
    '(max-width: 767px)': {
      display: 'none',
    },
  },
})

export const accentPicker = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp2,
})

export const accentSwatch = style({
  width: '16px',
  height: '16px',
  border: `1px solid ${vars.color.borderMute}`,
  borderRadius: vars.radius.none,
  cursor: 'pointer',
  flexShrink: 0,
  selectors: {
    '&[data-active="true"]': {
      outline: `2px solid ${vars.color.fg}`,
      outlineOffset: '1px',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '2px',
    },
  },
})

export const avatar = style({
  width: '28px',
  height: '28px',
  background: vars.color.fg,
  color: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.font.display,
  fontWeight: 900,
  fontSize: '11px',
  flexShrink: 0,
  userSelect: 'none',
})
