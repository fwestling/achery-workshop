import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const avatar = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.radius.pill,
    fontFamily: vars.font.display,
    fontWeight: 900,
    lineHeight: 1,
    userSelect: 'none',
    flexShrink: 0,
    border: `1px solid ${vars.color.border}`,
  },
  variants: {
    size: {
      sm: { width: '24px', height: '24px', fontSize: '11px' },
      md: { width: '32px', height: '32px', fontSize: '14px' },
      lg: { width: '40px', height: '40px', fontSize: '18px' },
    },
    tone: {
      moss:    { background: '#4a5a32', color: vars.color.bg },
      neutral: { background: vars.color.bg2, color: vars.color.fg },
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'neutral',
  },
})

export const initials = style({
  display: 'block',
  lineHeight: 1,
  // Roboto Slab cap-height optical correction (same as LetterStamp)
  transform: 'translateY(0.08em)',
})
