import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css.js'

export const tableWrapper = style({
  width: '100%',
  overflow: 'auto',
  border: `1px solid ${vars.color.border}`,
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontVariantNumeric: 'tabular-nums',
})

export const thead = style({
  background: vars.color.bg2,
  borderBottom: `1px solid ${vars.color.border}`,
})

export const th = style({
  fontFamily: vars.font.body,
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: vars.color.fg2,
  padding: `9px ${vars.space.sp6}`,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  userSelect: 'none',
})

export const thSortable = style([th, {
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: vars.color.fg,
    },
  },
}])

export const sortIndicator = style({
  display: 'inline-flex',
  marginLeft: vars.space.sp2,
  opacity: 0.5,
  verticalAlign: 'middle',
})

export const tr = style({
  borderBottom: `1px solid ${vars.color.borderMute}`,
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': {
      background: vars.color.bg2,
    },
    '&[data-selected="true"]': {
      background: vars.color.bg2,
      boxShadow: `inset 3px 0 0 ${vars.color.accent}`,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
})

export const td = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg,
  padding: `10px ${vars.space.sp6}`,
  verticalAlign: 'middle',
})

export const tdMono = style([td, {
  fontFamily: vars.font.mono,
  fontSize: '11px',
  color: vars.color.fg2,
}])
