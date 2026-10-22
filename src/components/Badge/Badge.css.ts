import { recipe } from '@vanilla-extract/recipes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { vars } from '../../theme/vars.css'
import { badgeTones, badgeToneNames, type BadgeToneName } from '../../tokens/badge'

// Tone colours live on each theme root as custom properties (from the shared badgeTones table), so a
// badge takes the colours of its nearest [data-achery-root][data-theme], nested previews included.
// The label is always fg2 (outline, pill) or the tone's onFill (solid); the tone itself is the edge.
const prop = (tone: BadgeToneName, part: 'edge' | 'fill' | 'onFill') => `--achery-badge-${tone}-${part}`

for (const theme of ['light', 'dark'] as const) {
  globalStyle(`[data-achery-root][data-theme="${theme}"]`, {
    vars: Object.fromEntries(
      badgeToneNames.flatMap((tone) => {
        const c = badgeTones[theme][tone]
        return [
          [prop(tone, 'edge'), c.edge],
          [prop(tone, 'fill'), c.fill],
          [prop(tone, 'onFill'), c.onFill],
        ]
      }),
    ),
  })
}

const edge = createVar()
const fill = createVar()
const onFill = createVar()
/** The dot: the tone on outline and pill badges, the label colour on a solid fill */
const dotColour = createVar()

const toneVars = (tone: BadgeToneName) => ({
  vars: {
    [edge]: `var(${prop(tone, 'edge')})`,
    [fill]: `var(${prop(tone, 'fill')})`,
    [onFill]: `var(${prop(tone, 'onFill')})`,
  },
})

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
    border: `1px solid ${edge}`,
  },
  variants: {
    tone: {
      saved: toneVars('saved'),
      drafting: toneVars('drafting'),
      stopped: toneVars('stopped'),
      archived: toneVars('archived'),
      neutral: toneVars('neutral'),
      success: toneVars('success'),
      warn: toneVars('warn'),
      danger: toneVars('danger'),
      info: toneVars('info'),
    },
    variant: {
      outline: {
        background: 'transparent',
        color: vars.color.fg2,
        vars: { [dotColour]: edge },
      },
      solid: {
        background: fill,
        borderColor: fill,
        color: onFill,
        vars: { [dotColour]: onFill },
      },
      pill: {
        borderRadius: vars.radius.pill,
        background: 'transparent',
        color: vars.color.fg2,
        vars: { [dotColour]: edge },
      },
    },
  },
  defaultVariants: {
    tone: 'neutral',
    variant: 'outline',
  },
})

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: dotColour,
  flexShrink: 0,
})
