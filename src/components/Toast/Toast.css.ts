import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

const slideOut = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(4px)' },
})

export const viewport = style({
  position: 'fixed',
  bottom: vars.space.sp8,
  right: vars.space.sp8,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp4,
  zIndex: 200,
  width: '360px',
  maxWidth: 'calc(100vw - 48px)',
  listStyle: 'none',
  padding: 0,
  margin: 0,
})

export const toast = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.stamp,
  padding: `${vars.space.sp5} ${vars.space.sp6}`,
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: vars.space.sp4,
  alignItems: 'start',
  animation: `${slideIn} ${vars.duration.base} ${vars.ease.out}`,
  selectors: {
    '&[data-state="closed"]': {
      animation: `${slideOut} ${vars.duration.fast} ${vars.ease.out}`,
    },
  },
})

export const toastTitle = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  fontWeight: 600,
  color: vars.color.fg,
  marginBottom: vars.space.sp1,
})

export const toastDescription = style({
  fontFamily: vars.font.body,
  fontSize: '12px',
  color: vars.color.fg2,
  lineHeight: 1.5,
})

export const toastClose = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: vars.color.fg3,
  padding: vars.space.sp1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: `color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': {
      color: vars.color.fg,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '2px',
    },
  },
})

export const toastAction = style({
  marginTop: vars.space.sp3,
})
