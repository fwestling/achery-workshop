import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

export const tableWrapper = style({
  width: '100%',
  border: `1px solid ${vars.color.border}`,
})

export const tableScroll = style({
  overflowX: 'auto',
  borderBottom: `1px solid ${vars.color.borderMute}`,
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontVariantNumeric: 'tabular-nums',
})

export const thead = style({
  background: vars.color.bg2,
  borderBottom: `1px solid ${vars.color.border}`,
  position: 'sticky',
  top: 0,
  zIndex: 1,
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
    '&:last-child': {
      borderBottom: 'none',
    },
    '&[data-selected="true"]': {
      background: vars.color.bg2,
      boxShadow: `inset 3px 0 0 ${vars.color.accent}`,
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

export const toolbar = style({
  padding: `${vars.space.sp4} ${vars.space.sp6}`,
  borderBottom: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp4,
})

export const emptyState = style({
  textAlign: 'center',
  padding: `${vars.space.sp10} ${vars.space.sp8}`,
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg3,
})

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.sp5,
  padding: `${vars.space.sp4} ${vars.space.sp6}`,
  borderTop: `1px solid ${vars.color.borderMute}`,
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg3,
})

export const paginationControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp2,
  flex: 1,
  justifyContent: 'center',
})

export const pageButton = style({
  fontFamily: vars.font.body,
  fontSize: '13px',
  color: vars.color.fg2,
  background: 'none',
  border: 'none',
  borderRadius: '3px',
  padding: `2px 6px`,
  cursor: 'pointer',
  minWidth: '28px',
  textAlign: 'center',
  lineHeight: 1,
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surface,
      color: vars.color.fg,
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'default',
    },
  },
})

export const pageNavButton = style([pageButton, {
  fontSize: '16px',
  minWidth: '28px',
  color: vars.color.fg3,
}])

export const pageButtonActive = style([pageButton, {
  background: vars.color.surface,
  color: vars.color.accent,
  fontWeight: 600,
}])

export const paginationEllipsis = style({
  fontFamily: vars.font.body,
  fontSize: '12px',
  color: vars.color.fg3,
  padding: `2px 2px`,
  userSelect: 'none',
})

export const pageSizeSelect = style({
  fontFamily: vars.font.body,
  fontSize: '12px',
  color: vars.color.fg2,
  background: vars.color.bg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: '3px',
  padding: `2px ${vars.space.sp3}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      borderColor: vars.color.fg3,
    },
  },
})
