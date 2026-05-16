import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space.sp4,
    fontFamily: vars.font.body,
    fontWeight: 600,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.none,
    cursor: 'pointer',
    transition: `transform ${vars.duration.fast} ${vars.ease.out}, box-shadow ${vars.duration.fast} ${vars.ease.out}, background ${vars.duration.fast} ${vars.ease.out}`,
    outline: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${vars.color.accent}`,
        outlineOffset: '2px',
      },
      '&:disabled, &[aria-disabled="true"]': {
        opacity: 0.4,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: vars.color.fg,
        color: vars.color.bg,
        boxShadow: vars.shadow.stamp,
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'translate(-1px, -1px)',
            boxShadow: `3px 3px 0 0 ${vars.color.fg}`,
          },
          '&:active:not(:disabled)': {
            transform: 'translate(2px, 2px)',
            boxShadow: 'none',
          },
        },
      },
      secondary: {
        background: vars.color.surface,
        color: vars.color.fg,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.color.bg2,
            borderWidth: '2px',
          },
          '&:active:not(:disabled)': {
            boxShadow: vars.shadow.press,
          },
        },
      },
      accent: {
        background: vars.color.accent,
        color: vars.color.accentFg,
        borderColor: vars.color.accent,
        boxShadow: vars.shadow.stamp,
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'translate(-1px, -1px)',
            boxShadow: `3px 3px 0 0 ${vars.color.accent}`,
          },
          '&:active:not(:disabled)': {
            transform: 'translate(2px, 2px)',
            boxShadow: 'none',
          },
        },
      },
      ghost: {
        background: 'transparent',
        color: vars.color.fg2,
        borderColor: vars.color.borderMute,
        selectors: {
          '&:hover:not(:disabled)': {
            color: vars.color.fg,
            borderColor: vars.color.border,
          },
          '&:active:not(:disabled)': {
            boxShadow: vars.shadow.press,
          },
        },
      },
      danger: {
        background: vars.color.danger,
        color: vars.color.bg,
        borderColor: vars.color.danger,
        boxShadow: vars.shadow.stamp,
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'translate(-1px, -1px)',
            boxShadow: `3px 3px 0 0 ${vars.color.danger}`,
          },
          '&:active:not(:disabled)': {
            transform: 'translate(2px, 2px)',
            boxShadow: 'none',
          },
        },
      },
    },
    size: {
      sm: {
        fontSize: '11px',
        padding: '5px 10px',
        gap: vars.space.sp3,
      },
      md: {
        fontSize: '12px',
        padding: '7px 12px',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
})

export const kbdHint = style({
  fontFamily: vars.font.mono,
  fontSize: '9px',
  letterSpacing: '0.05em',
  textTransform: 'none',
  opacity: 0.7,
  marginLeft: vars.space.sp2,
  border: `1px solid currentColor`,
  padding: '1px 4px',
  borderRadius: vars.radius.hairline,
})
