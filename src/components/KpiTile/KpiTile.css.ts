import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const wrapper = style({
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  textAlign: 'left',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '2px',
    },
  },
})

// VE doesn't allow child selectors (`& > *`), so use globalStyle
globalStyle(`${wrapper}:hover > *`, {
  background: vars.color.bgSunken,
})

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp3,
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
})

export const value = style({
  fontFamily: vars.font.display,
  fontWeight: 900,
  fontSize: '28px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: vars.color.fg,
})
