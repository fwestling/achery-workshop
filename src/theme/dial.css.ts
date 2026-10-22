/**
 * Accent dial — controls how loudly the accent runs across the working UI.
 *
 * Set once on the project root via `data-dial` (AcheryProvider's `defaultDial`, default `chrome`):
 *   <div data-achery-root data-dial="chrome">
 *
 * The dial only dresses the *interaction layer*. The page itself — paper bg, ink hairlines, square
 * corners — is never touched. It puts the accent on marks, never on text: accent-coloured text falls under
 * 4.5:1 for several accents (terracotta, copper, ochre on paper; most hues on dark cards).
 *
 *   underline  baseline: accent on links, focus rings and the active-tab underline only; ticks are ink
 *   chrome     the accent threads the wiring: ticks, an accent rule before each eyebrow, outline-button borders
 *   surface    as chrome, and the one `.signature-surface` panel per view floods with accent
 *
 * Each setting assigns every variable below, so a nested root with its own `data-dial` never inherits its
 * parent's. Components read them with the chrome look as the fallback (a root without `data-dial`).
 */

import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'
import { dialVars } from './dial'

const quiet = {
  [dialVars.eyebrowMark]: 'none',
  [dialVars.tickFill]: vars.color.fg,
  [dialVars.tickMark]: vars.color.bg,
  [dialVars.outlineBorder]: vars.color.border,
  [dialVars.tabIndicator]: vars.color.accent,
}

const wired = {
  [dialVars.eyebrowMark]: 'inline-block',
  [dialVars.tickFill]: vars.color.accent,
  [dialVars.tickMark]: vars.color.accentFg,
  [dialVars.outlineBorder]: vars.color.accent,
  [dialVars.tabIndicator]: vars.color.accent,
}

globalStyle('[data-achery-root][data-dial="underline"]', { vars: quiet })
globalStyle('[data-achery-root][data-dial="chrome"]', { vars: wired })
globalStyle('[data-achery-root][data-dial="surface"]', { vars: wired })

// ---------------------------------------------------------------------------
// .signature-surface — the ONE panel per view that may flood with accent.
// Neutral under underline/chrome; fills under surface.
// ---------------------------------------------------------------------------

globalStyle('[data-achery-root] .signature-surface', {
  background: vars.color.surface,
  color: vars.color.fg,
  borderColor: vars.color.border,
})

globalStyle('[data-achery-root][data-dial="surface"] .signature-surface', {
  background: vars.color.accent,
  color: vars.color.accentFg,
  borderColor: vars.color.accent,
})
