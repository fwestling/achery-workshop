import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

const toneColors: Record<string, { bg: string; fg: string }> = {
  moss:    { bg: '#4a5a32', fg: vars.color.bg },
  rust:    { bg: '#8a3a22', fg: vars.color.bg },
  ochre:   { bg: '#b8924a', fg: vars.color.bg },
  plum:    { bg: '#5d4a6a', fg: vars.color.bg },
  copper:  { bg: '#b8742a', fg: vars.color.bg },
  neutral: { bg: vars.color.bg2, fg: vars.color.fg },
}

export const stamp = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.radius.none,
    flexShrink: 0,
    userSelect: 'none',
  },
  variants: {
    tone: {
      moss:    { background: toneColors.moss.bg,    color: toneColors.moss.fg },
      rust:    { background: toneColors.rust.bg,    color: toneColors.rust.fg },
      ochre:   { background: toneColors.ochre.bg,   color: toneColors.ochre.fg },
      plum:    { background: toneColors.plum.bg,    color: toneColors.plum.fg },
      copper:  { background: toneColors.copper.bg,  color: toneColors.copper.fg },
      neutral: { background: toneColors.neutral.bg, color: toneColors.neutral.fg },
    },
    size: {
      14: { width: '14px', height: '14px' },
      20: { width: '20px', height: '20px' },
      28: { width: '28px', height: '28px' },
      36: { width: '36px', height: '36px' },
      48: { width: '48px', height: '48px' },
    },
  },
  defaultVariants: {
    tone: 'neutral',
    size: 28,
  },
})

export const letter = style({
  fontFamily: vars.font.display,
  fontWeight: 900,
  lineHeight: 1,
  color: 'inherit',
})
