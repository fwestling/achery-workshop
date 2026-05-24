import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const wrapper = style({
  position: 'relative',
  width: '100%',
})

export const trigger = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space.sp2,
  minHeight: 36,
  width: '100%',
  padding: `${vars.space.sp2} ${vars.space.sp3}`,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  background: vars.color.surface,
  cursor: 'text',
  boxSizing: 'border-box',
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&[data-open="true"]': {
      borderColor: vars.color.accent,
    },
    '&[data-error="true"]': {
      borderColor: vars.color.danger,
    },
  },
})

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sp2,
  padding: `2px ${vars.space.sp2}`,
  background: vars.color.surface2,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.hairline,
  fontSize: 11,
  fontFamily: vars.font.mono,
  letterSpacing: '0.04em',
  lineHeight: 1.4,
  flexShrink: 0,
})

export const chipRemove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 14,
  height: 14,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  color: vars.color.fg2,
  opacity: 0.6,
  lineHeight: 1,
  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
})

export const input = style({
  flex: 1,
  minWidth: 80,
  border: 'none',
  background: 'none',
  outline: 'none',
  fontFamily: vars.font.body,
  fontSize: 13,
  color: vars.color.fg,
  padding: 0,
  lineHeight: 1.4,
})

export const placeholder = style({
  fontFamily: vars.font.body,
  fontSize: 13,
  color: vars.color.fgMute,
  pointerEvents: 'none',
})

export const popover = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  zIndex: 50,
  background: vars.color.surface,
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  boxShadow: vars.shadow.stamp,
  maxHeight: 220,
  overflowY: 'auto',
})

export const option = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space.sp2} ${vars.space.sp4}`,
  fontSize: 13,
  fontFamily: vars.font.body,
  color: vars.color.fg,
  cursor: 'pointer',
  selectors: {
    '&:hover, &[data-active="true"]': {
      background: vars.color.surface2,
    },
    '&[data-selected="true"]': {
      color: vars.color.accent,
    },
  },
})

export const optionCheck = style({
  color: vars.color.accent,
  fontSize: 11,
  fontFamily: vars.font.mono,
})

export const empty = style({
  padding: `${vars.space.sp3} ${vars.space.sp4}`,
  fontSize: 12,
  fontFamily: vars.font.body,
  color: vars.color.fgMute,
})
