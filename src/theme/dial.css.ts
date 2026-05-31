/**
 * Accent dial — controls how loudly the accent runs across the working UI.
 *
 * Set once on the project root via `data-dial`:
 *   <div data-achery-root data-dial="chrome">
 *
 * The dial only dresses the *interaction layer* (tabs, ticks, eyebrows, focus,
 * the primary button). The page itself — paper bg, ink hairlines, square
 * corners — is never touched.
 *
 *   underline  baseline: accent on links, focus rings, and active-tab underline only
 *   chrome     accent threads the wiring: tabs, ticks, eyebrows, outline buttons
 *   surface    one `.signature-surface` panel floods with accent colour
 *
 * If `data-dial` is absent the browser falls back to the component defaults,
 * which behave like `chrome`.
 */

import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'

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

// ---------------------------------------------------------------------------
// underline — accent only on links, focus rings, and the active-tab underline.
// Components default to this baseline behaviour with no extra rules needed.
// We still emit explicit rules so consumers can target [data-dial="underline"].
// ---------------------------------------------------------------------------

// (No overrides required — this is the browser/component baseline.)

// ---------------------------------------------------------------------------
// chrome — accent threads the wiring.
// Applied via component CSS that checks [data-dial="chrome"] ancestors.
// The rules below set the CSS custom property that components read.
// ---------------------------------------------------------------------------

globalStyle('[data-achery-root][data-dial="chrome"]', {
  vars: {
    '--achery-dial-eyebrow-color': vars.color.accent,
    '--achery-dial-tab-indicator': vars.color.accent,
    '--achery-dial-tick-color': vars.color.accent,
  },
})

// ---------------------------------------------------------------------------
// surface — same as chrome, plus signature-surface floods (handled above).
// ---------------------------------------------------------------------------

globalStyle('[data-achery-root][data-dial="surface"]', {
  vars: {
    '--achery-dial-eyebrow-color': vars.color.accent,
    '--achery-dial-tab-indicator': vars.color.accent,
    '--achery-dial-tick-color': vars.color.accent,
  },
})
