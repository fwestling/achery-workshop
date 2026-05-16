import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const slideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(20,19,15,0.55)',
  backdropFilter: 'blur(2px)',
  zIndex: 100,
  animation: `${fadeIn} ${vars.duration.base} ${vars.ease.out}`,
})

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.stampLg,
  padding: `${vars.space.sp8} ${vars.space.sp8}`,
  maxWidth: '580px',
  width: 'calc(100vw - 48px)',
  maxHeight: 'calc(100vh - 48px)',
  overflow: 'auto',
  zIndex: 101,
  borderRadius: vars.radius.none,
  animation: `${slideUp} ${vars.duration.slow} ${vars.ease.out}`,
})

export const header = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: vars.space.sp5,
})

export const title = style({
  fontFamily: vars.font.display,
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: vars.color.fg,
  margin: `${vars.space.sp3} 0 0`,
  maxWidth: '80%',
})

export const description = style({
  fontFamily: vars.font.body,
  fontSize: '14px',
  color: vars.color.fg2,
  marginTop: vars.space.sp3,
})

export const closeButton = style({
  background: 'transparent',
  border: `1px solid ${vars.color.borderMute}`,
  cursor: 'pointer',
  padding: vars.space.sp2,
  color: vars.color.fg2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: vars.radius.none,
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': {
      borderColor: vars.color.border,
      color: vars.color.fg,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '2px',
    },
  },
})

export const body = style({
  marginTop: vars.space.sp6,
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.space.sp4,
  marginTop: vars.space.sp8,
  paddingTop: vars.space.sp6,
  borderTop: `1px solid ${vars.color.borderMute}`,
})
