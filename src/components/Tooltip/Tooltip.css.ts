import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const content = style({
  fontFamily: vars.font.body,
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: 1.4,
  color: vars.color.bg,
  background: vars.color.fg,
  border: `1px solid ${vars.color.fg}`,
  padding: '4px 8px',
  borderRadius: vars.radius.none,
  maxWidth: '240px',
  zIndex: 200,
  animation: `${fadeIn} ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&[data-state="delayed-open"]': {
      animationName: fadeIn,
    },
  },
})
