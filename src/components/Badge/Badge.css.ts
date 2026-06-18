import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'
import { palette } from '../../tokens/palette'

const toneColors = {
  saved:    palette.moss,
  drafting: palette.ochre,
  stopped:  palette.rust,
  archived: palette.plum,
  neutral:  vars.color.fg2,
  success:  palette.success,
  warn:     palette.ochre,
  danger:   palette.rust,
  info:     palette.plumMid,
}

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: vars.font.body,
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: vars.radius.none,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  variants: {
    tone: {
      saved: {},
      drafting: {},
      stopped: {},
      archived: {},
      neutral: {},
      success: {},
      warn: {},
      danger: {},
      info: {},
    },
    variant: {
      outline: {
        background: 'transparent',
      },
      solid: {
        color: vars.color.bg,
      },
      pill: {
        borderRadius: vars.radius.pill,
        background: 'transparent',
      },
    },
  },
  compoundVariants: [
    { variants: { tone: 'saved', variant: 'outline' }, style: { color: toneColors.saved, border: `1px solid ${toneColors.saved}` } },
    { variants: { tone: 'saved', variant: 'solid' }, style: { background: toneColors.saved, border: `1px solid ${toneColors.saved}` } },
    { variants: { tone: 'saved', variant: 'pill' }, style: { color: toneColors.saved, border: `1px solid ${toneColors.saved}` } },

    { variants: { tone: 'drafting', variant: 'outline' }, style: { color: toneColors.drafting, border: `1px solid ${toneColors.drafting}` } },
    { variants: { tone: 'drafting', variant: 'solid' }, style: { background: toneColors.drafting, border: `1px solid ${toneColors.drafting}` } },
    { variants: { tone: 'drafting', variant: 'pill' }, style: { color: toneColors.drafting, border: `1px solid ${toneColors.drafting}` } },

    { variants: { tone: 'stopped', variant: 'outline' }, style: { color: toneColors.stopped, border: `1px solid ${toneColors.stopped}` } },
    { variants: { tone: 'stopped', variant: 'solid' }, style: { background: toneColors.stopped, border: `1px solid ${toneColors.stopped}` } },
    { variants: { tone: 'stopped', variant: 'pill' }, style: { color: toneColors.stopped, border: `1px solid ${toneColors.stopped}` } },

    { variants: { tone: 'archived', variant: 'outline' }, style: { color: toneColors.archived, border: `1px solid ${toneColors.archived}` } },
    { variants: { tone: 'archived', variant: 'solid' }, style: { background: toneColors.archived, border: `1px solid ${toneColors.archived}` } },
    { variants: { tone: 'archived', variant: 'pill' }, style: { color: toneColors.archived, border: `1px solid ${toneColors.archived}` } },

    { variants: { tone: 'neutral', variant: 'outline' }, style: { color: vars.color.fg2, border: `1px solid ${vars.color.border2}` } },
    { variants: { tone: 'neutral', variant: 'solid' }, style: { background: vars.color.fg2, border: `1px solid ${vars.color.fg2}` } },
    { variants: { tone: 'neutral', variant: 'pill' }, style: { color: vars.color.fg2, border: `1px solid ${vars.color.border2}` } },

    { variants: { tone: 'success', variant: 'outline' }, style: { color: toneColors.success, border: `1px solid ${toneColors.success}` } },
    { variants: { tone: 'success', variant: 'solid' }, style: { background: toneColors.success, border: `1px solid ${toneColors.success}` } },
    { variants: { tone: 'success', variant: 'pill' }, style: { color: toneColors.success, border: `1px solid ${toneColors.success}` } },

    { variants: { tone: 'warn', variant: 'outline' }, style: { color: toneColors.warn, border: `1px solid ${toneColors.warn}` } },
    { variants: { tone: 'warn', variant: 'solid' }, style: { background: toneColors.warn, border: `1px solid ${toneColors.warn}` } },
    { variants: { tone: 'warn', variant: 'pill' }, style: { color: toneColors.warn, border: `1px solid ${toneColors.warn}` } },

    { variants: { tone: 'danger', variant: 'outline' }, style: { color: toneColors.danger, border: `1px solid ${toneColors.danger}` } },
    { variants: { tone: 'danger', variant: 'solid' }, style: { background: toneColors.danger, border: `1px solid ${toneColors.danger}` } },
    { variants: { tone: 'danger', variant: 'pill' }, style: { color: toneColors.danger, border: `1px solid ${toneColors.danger}` } },

    { variants: { tone: 'info', variant: 'outline' }, style: { color: toneColors.info, border: `1px solid ${toneColors.info}` } },
    { variants: { tone: 'info', variant: 'solid' }, style: { background: toneColors.info, border: `1px solid ${toneColors.info}` } },
    { variants: { tone: 'info', variant: 'pill' }, style: { color: toneColors.info, border: `1px solid ${toneColors.info}` } },
  ],
  defaultVariants: {
    tone: 'neutral',
    variant: 'outline',
  },
})

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'currentColor',
  flexShrink: 0,
})
