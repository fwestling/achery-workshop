import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'
import { dialVar } from '../../theme/dial'

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.sp3,
  fontFamily: vars.font.body,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: vars.color.fg2,
  selectors: {
    // The accent dial's mark: a short accent rule before the label under chrome and surface. The text
    // itself stays fg2: accent-coloured 11px text would miss 4.5:1 for several accents.
    '&::before': {
      content: '""',
      display: dialVar('eyebrowMark', 'inline-block'),
      width: '10px',
      height: '2px',
      background: vars.color.accent,
      flexShrink: 0,
    },
  },
})

export const count = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.font.mono,
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: 0,
  textTransform: 'none',
  color: vars.color.fg3,
  background: vars.color.bg2,
  border: `1px solid ${vars.color.borderMute}`,
  borderRadius: vars.radius.pill,
  minWidth: '18px',
  height: '16px',
  padding: '0 5px',
  lineHeight: 1,
})
