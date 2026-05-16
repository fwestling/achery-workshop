import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const card = recipe({
  base: {
    position: 'relative',
    background: vars.color.surface,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radius.none,
    overflow: 'hidden',
  },
  variants: {
    variant: {
      flat: {},
      stamp: {
        boxShadow: vars.shadow.stamp,
      },
      stampLg: {
        boxShadow: vars.shadow.stampLg,
      },
    },
    padding: {
      none: { padding: 0 },
      sm: { padding: vars.space.sp5 },
      md: { padding: vars.space.sp6 },
      lg: { padding: vars.space.sp8 },
    },
  },
  defaultVariants: {
    variant: 'flat',
    padding: 'md',
  },
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: vars.space.sp3,
  marginBottom: vars.space.sp4,
})
