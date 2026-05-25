import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'

const toneBorders: Record<string, string> = {
  moss:    '#4a5a32',
  rust:    '#8a3a22',
  ochre:   '#b8924a',
  plum:    '#5d4a6a',
  copper:  '#b8742a',
  neutral: vars.color.border,
}

export const pill = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: vars.radius.none,
    background: vars.color.bg,
    border: `1px solid ${vars.color.border}`,
    padding: '0 8px 0 0',
    overflow: 'hidden',
    fontFamily: vars.font.body,
    color: vars.color.fg,
    textDecoration: 'none',
    cursor: 'default',
    transition: `background ${vars.duration.fast} ${vars.ease.out}`,
    outline: 'none',
  },
  variants: {
    tone: {
      moss:    { borderColor: toneBorders.moss },
      rust:    { borderColor: toneBorders.rust },
      ochre:   { borderColor: toneBorders.ochre },
      plum:    { borderColor: toneBorders.plum },
      copper:  { borderColor: toneBorders.copper },
      neutral: { borderColor: toneBorders.neutral },
    },
    size: {
      sm: { height: '22px' },
      md: { height: '28px' },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:hover': { background: vars.color.bgSunken },
          '&:focus-visible': {
            outline: `2px solid ${vars.color.accent}`,
            outlineOffset: '1px',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    tone: 'neutral',
    size: 'md',
    interactive: false,
  },
})

export const label = style({
  fontFamily: vars.font.body,
  color: 'inherit',
  lineHeight: 1,
})

export const labelSm = style([label, {
  fontSize: '11px',
}])

export const labelMd = style([label, {
  fontSize: '13px',
}])
