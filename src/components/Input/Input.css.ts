import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const fieldRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp2,
})

export const label = style({
  fontFamily: vars.font.body,
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: vars.color.fg2,
})

export const hint = style({
  fontFamily: vars.font.mono,
  fontSize: '10px',
  color: vars.color.fg3,
})

export const errorText = style({
  fontFamily: vars.font.mono,
  fontSize: '10px',
  color: vars.color.danger,
})

export const inputBase = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.none,
  padding: '7px 10px',
  width: '100%',
  outline: 'none',
  transition: `border-color ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&::placeholder': {
      color: vars.color.fgMute,
    },
    '&:focus': {
      borderColor: vars.color.accent,
      borderWidth: '2px',
      padding: '6px 9px',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const inputError = style({
  selectors: {
    '&, &:focus': {
      borderColor: vars.color.danger,
    },
  },
})

export const textarea = style([inputBase, {
  resize: 'vertical',
  minHeight: '80px',
}])

export const selectInput = style([inputBase, {
  appearance: 'none',
  paddingRight: '28px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  cursor: 'pointer',
}])

export const searchWrapper = style({
  position: 'relative',
})

export const searchIcon = style({
  position: 'absolute',
  left: '9px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.fg3,
  pointerEvents: 'none',
})

export const searchInput = style([inputBase, {
  paddingLeft: '30px',
}])
