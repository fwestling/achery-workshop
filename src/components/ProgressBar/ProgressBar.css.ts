import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const track = style({
  width: '100%',
  background: vars.color.border,
  overflow: 'hidden',
  borderRadius: vars.radius.none,
})

export const trackSize = styleVariants({
  sm: { height: 4 },
  md: { height: 8 },
})

export const fill = style({
  height: '100%',
  transition: 'width 0.2s ease',
  borderRadius: 'inherit',
})

export const fillTone = styleVariants({
  neutral: { background: vars.color.fg2 },
  accent: { background: vars.color.accent },
})
