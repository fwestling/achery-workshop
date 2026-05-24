import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  width: '220px',
  borderRight: `1px solid ${vars.color.border}`,
  background: vars.color.bg2,
  padding: `${vars.space.sp6} 0 0`,
  height: '100%',
  overflow: 'auto',
  transition: `width ${vars.duration.base} ${vars.ease.out}`,
  selectors: {
    '&[data-collapsed="true"]': {
      width: '52px',
    },
  },
})

export const collapseToggle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: `0 0 ${vars.space.sp4}`,
  color: vars.color.fg3,
  width: '100%',
  transition: `color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': { color: vars.color.fg },
  },
})

export const group = style({
  padding: `0 ${vars.space.sp5} ${vars.space.sp6}`,
  borderBottom: `1px dashed ${vars.color.borderMute}`,
  marginBottom: vars.space.sp5,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
      marginBottom: 0,
    },
  },
})

export const groupLabel = style({
  display: 'block',
  fontFamily: vars.font.body,
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: vars.color.fg3,
  marginBottom: vars.space.sp4,
})

export const navItem = style({
  display: 'grid',
  gridTemplateColumns: '14px 1fr auto',
  alignItems: 'center',
  gap: vars.space.sp3,
  padding: `5px ${vars.space.sp4}`,
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderRadius: vars.radius.none,
  textAlign: 'left',
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  cursor: 'pointer',
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
  outline: 'none',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      background: vars.color.bg,
    },
    '&[data-active="true"]': {
      background: vars.color.fg,
      color: vars.color.bg,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '-2px',
    },
    '[data-collapsed="true"] &': {
      gridTemplateColumns: '14px',
      justifyContent: 'center',
      padding: `8px 0`,
    },
  },
})

export const navItemCount = style({
  fontFamily: vars.font.mono,
  fontSize: '10px',
  opacity: 0.65,
  color: 'inherit',
})

export const footer = style({
  marginTop: 'auto',
  padding: vars.space.sp5,
  borderTop: `1px solid ${vars.color.borderMute}`,
})
