export const duration = {
  fast: '120ms',
  base: '180ms',
  slow: '320ms',
} as const

export const easing = {
  out: 'cubic-bezier(.2,.7,.2,1)',
  in: 'cubic-bezier(.6,.0,.8,.3)',
  snap: 'cubic-bezier(.5,1.6,.4,1)',
} as const

export const zIndex = {
  base: 1,
  sticky: 10,
  overlay: 50,
  modal: 100,
  toast: 200,
} as const
