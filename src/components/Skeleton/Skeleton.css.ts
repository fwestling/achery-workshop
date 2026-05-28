import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
})

export const skeleton = style({
  display: 'block',
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  backgroundImage: `linear-gradient(
    90deg,
    ${vars.color.surface} 0%,
    ${vars.color.surface2} 50%,
    ${vars.color.surface} 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.4s ease-in-out infinite`,
})

export const line = style([skeleton, {
  height: '12px',
  width: '100%',
}])

export const block = style([skeleton, {
  width: '100%',
  height: '80px',
}])
