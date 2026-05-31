import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.sp2,
  padding: `${vars.space.sp2} ${vars.space.sp3}`,
  minWidth: 36,
  height: 36,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  background: vars.color.surface,
  cursor: 'pointer',
  fontFamily: vars.font.body,
  fontSize: 13,
  color: vars.color.fg,
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': {
      borderColor: vars.color.accent,
    },
    '&[data-state="open"]': {
      borderColor: vars.color.accent,
    },
  },
})

export const triggerPlaceholder = style({
  color: vars.color.fgMute,
  fontSize: 12,
  fontFamily: vars.font.body,
})

export const popoverContent = style({
  background: vars.color.surface,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  boxShadow: vars.shadow.stamp,
  width: 340,
  maxHeight: 440,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 100,
  overflow: 'hidden',
})

export const searchRow = style({
  padding: vars.space.sp3,
  borderBottom: `1px solid ${vars.color.borderMute}`,
  flexShrink: 0,
})

export const searchInput = style({
  width: '100%',
  padding: `${vars.space.sp2} ${vars.space.sp3}`,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  background: vars.color.bg,
  fontFamily: vars.font.body,
  fontSize: 13,
  color: vars.color.fg,
  outline: 'none',
  boxSizing: 'border-box',
  selectors: {
    '&:focus': {
      borderColor: vars.color.accent,
    },
    '&::placeholder': {
      color: vars.color.fgMute,
    },
  },
})

export const scrollArea = style({
  overflowY: 'auto',
  flex: 1,
  padding: vars.space.sp3,
})

export const categoryHeading = style({
  fontSize: 10,
  fontFamily: vars.font.mono,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: vars.color.fgMute,
  padding: `${vars.space.sp3} 0 ${vars.space.sp2}`,
  selectors: {
    '&:first-child': {
      paddingTop: 0,
    },
  },
})

export const glyphGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gap: vars.space.sp1,
  marginBottom: vars.space.sp2,
})

export const glyphBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  border: `1px solid transparent`,
  borderRadius: vars.radius.hairline,
  background: 'none',
  cursor: 'pointer',
  color: vars.color.fg2,
  transition: `background ${vars.duration.fast} ${vars.ease.out}, color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': {
      background: vars.color.surface2,
      color: vars.color.fg,
    },
    '&[data-selected="true"]': {
      background: vars.color.accent,
      color: vars.color.accentFg,
      borderColor: vars.color.accent,
    },
  },
})

export const emptyState = style({
  padding: `${vars.space.sp6} ${vars.space.sp4}`,
  textAlign: 'center',
  fontSize: 12,
  fontFamily: vars.font.body,
  color: vars.color.fgMute,
})

export const clearBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  color: vars.color.fgMute,
  flexShrink: 0,
  selectors: {
    '&:hover': {
      color: vars.color.fg,
    },
  },
})
