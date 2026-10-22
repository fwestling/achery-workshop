import { palette } from './palette'
import { darkTokens, lightTokens } from './semantic'

/**
 * Badge tones, shared by the web and native Badge (and the native StatusDot) so the two can't drift.
 *
 * The label is never in the tone colour: outline and pill badges set it in `fg2`, which reads at 6.4:1 or
 * better on every ground in both themes. The tone is carried by the border and dot (`edge`). A solid badge
 * fills with `fill` and sets its label in `onFill`, chosen per theme to reach 4.5:1 for the 10px label.
 * (No step of ochre reaches 4.5:1 as text on light paper, and moss and plum have none that do on dark
 * cards, so coloured labels couldn't pass everywhere.)
 */
export type BadgeToneName = 'neutral' | 'saved' | 'drafting' | 'stopped' | 'archived' | 'success' | 'warn' | 'danger' | 'info'

export interface BadgeToneColours {
  /** Border and dot */
  edge: string
  /** Solid badge background */
  fill: string
  /** Solid badge label */
  onFill: string
}

type ToneTable = Record<BadgeToneName, BadgeToneColours>

const tone = (edge: string, onFill: string, fill: string = edge): BadgeToneColours => ({ edge, fill, onFill })

const light: ToneTable = {
  neutral: tone(lightTokens.border2, lightTokens.bg, lightTokens.fg2),
  saved: tone(palette.moss, palette.paper),
  drafting: tone(palette.ochre, palette.ink),
  stopped: tone(lightTokens.danger, palette.paper),
  archived: tone(palette.plum, palette.paper),
  success: tone(palette.success, palette.ink),
  warn: tone(palette.ochre, palette.ink),
  danger: tone(lightTokens.danger, palette.paper),
  info: tone(palette.plumMid, palette.paper),
}

const dark: ToneTable = {
  neutral: tone(darkTokens.border2, darkTokens.bg, darkTokens.fg2),
  saved: tone(palette.mossLight, palette.inkDeep),
  drafting: tone(palette.ochre, palette.inkDeep),
  stopped: tone(darkTokens.danger, palette.inkDeep),
  archived: tone(palette.plumLight, palette.inkDeep),
  success: tone(palette.success, palette.inkDeep),
  warn: tone(palette.ochre, palette.inkDeep),
  danger: tone(darkTokens.danger, palette.inkDeep),
  info: tone(palette.plumLight, palette.inkDeep),
}

export const badgeTones: Record<'light' | 'dark', ToneTable> = { light, dark }

export const badgeToneNames = Object.keys(light) as BadgeToneName[]
