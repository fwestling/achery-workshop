import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const marginalia = style({
  position: 'absolute',
  bottom: vars.space.sp3,
  right: vars.space.sp3,
  pointerEvents: 'none',
  userSelect: 'none',
  color: vars.color.accent2,
})
