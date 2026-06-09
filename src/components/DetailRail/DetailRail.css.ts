import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

const slideInRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
})

const slideInUp = keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 29,
  background: 'transparent',
})

export const rail = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  background: vars.color.bg,
  borderLeft: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  zIndex: 30,
  animation: `${slideInRight} ${vars.duration.base} ${vars.ease.out}`,
  '@media': {
    '(max-width: 640px)': {
      top: 'auto',
      left: 0,
      right: 0,
      bottom: 0,
      height: '70vh',
      borderLeft: 'none',
      borderTop: `1px solid ${vars.color.border}`,
      animation: `${slideInUp} ${vars.duration.base} ${vars.ease.out}`,
    },
  },
})

export const backdropVisible = style({
  animation: `${fadeIn} ${vars.duration.fast} ${vars.ease.out}`,
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: `${vars.space.sp5} ${vars.space.sp5} ${vars.space.sp5}`,
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})

export const headerText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp1,
})

export const body = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.space.sp5,
})

export const footer = style({
  padding: vars.space.sp4,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
})
