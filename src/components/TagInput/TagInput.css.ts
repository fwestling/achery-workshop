import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const wrap = style({
  position: 'relative',
})

export const field = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px',
  padding: '6px',
  fontFamily: vars.font.body,
  color: vars.color.fg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.none,
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:focus-within': {
      borderColor: vars.color.accent,
    },
  },
})

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 4px 2px 8px',
  fontSize: '13px',
  lineHeight: 1.3,
  color: vars.color.accent,
  background: 'var(--achery-color-accentSoft)',
  border: `1px solid ${vars.color.accent}`,
  borderRadius: vars.radius.none,
})

export const remove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  padding: 0,
  border: 'none',
  background: 'none',
  color: 'inherit',
  cursor: 'pointer',
  opacity: 0.7,
  transition: `opacity ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': { opacity: 1 },
  },
})

export const input = style({
  flex: 1,
  minWidth: '80px',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: vars.color.fg,
  fontFamily: vars.font.body,
  fontSize: '14px',
  padding: '2px 0',
  '::placeholder': {
    color: vars.color.fg3,
  },
})

export const suggestions = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 20,
  marginTop: '2px',
  display: 'flex',
  flexDirection: 'column',
  background: vars.color.bg2,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.none,
  boxShadow: vars.shadow.stamp,
  overflow: 'hidden',
})

export const suggestion = style({
  textAlign: 'left',
  padding: '7px 10px',
  fontSize: '14px',
  fontFamily: vars.font.body,
  color: vars.color.fg,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  selectors: {
    '&:hover, &[data-active="true"]': {
      background: 'var(--achery-color-accentSoft)',
    },
  },
})
