import { recipe } from '@vanilla-extract/recipes'
import { vars } from '../../theme/vars.css'

export const tag = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: vars.font.mono,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    border: `1px solid ${vars.color.borderMute}`,
    padding: '1px 5px',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    borderRadius: vars.radius.none,
  },
  variants: {
    type: {
      basic: {
        color: vars.color.fg3,
        background: 'transparent',
      },
      internal: {
        color: vars.color.fg3,
        background: 'transparent',
      },
      exceptional: {
        color: vars.color.danger,
        // 8% opacity via rgba — can't use var() in rgba() directly in VE
        background: 'rgba(138,58,34,0.08)',
        borderColor: vars.color.danger,
      },
      fee: {
        color: vars.color.warn,
        background: 'rgba(184,146,74,0.08)',
        borderColor: vars.color.warn,
      },
    },
  },
  defaultVariants: { type: 'basic' },
})
