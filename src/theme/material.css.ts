/**
 * Material system — optional, contained, classy.
 *
 * Materials are NOT a second theme. The working page is always paper / ink /
 * accent. A material appears ONLY inside a bounded, low-frequency object —
 * a modal, a dialog, a single featured card, a receipt — where a richer
 * surface reads as occasion. Scarcity is the whole effect.
 *
 * USAGE
 *   1. Bind a signature on any ancestor (usually the project root):
 *        <div data-achery-root data-material="leather">
 *      …or leave unset for the default leather fallback values baked into the
 *      theme contract (see light.css.ts / dark.css.ts).
 *
 *   2. Put `.material` + ONE intensity on the contained object:
 *        <div class="material m-chrome">…</div>   subtle   (default)
 *        <div class="material m-surface">…</div>  middle   (dialog default)
 *        <div class="material m-full">…</div>     full     (the big moment)
 *
 * Material is strictly opt-in: the page, rows, and frame never reference
 * --material, so it physically cannot leak onto a working surface.
 */

import { globalStyle } from '@vanilla-extract/css'
import { vars } from './vars.css'

// ---------------------------------------------------------------------------
// Signature presets — override the CSS vars when data-material is set
// ---------------------------------------------------------------------------

globalStyle('[data-achery-root][data-material="leather"]', {
  vars: {
    [vars.color.material]: '#6b3a26',
    [vars.color.materialFg]: '#fbf8f0',
    [vars.color.materialBtnFg]: '#1f1d18',
    [vars.color.metal]: '#c69a4a',
    [vars.color.metalDeep]: '#9a7430',
  },
})

globalStyle('[data-achery-root][data-material="wood"]', {
  vars: {
    [vars.color.material]: '#7a5a3a',
    [vars.color.materialFg]: '#fbf8f0',
    [vars.color.materialBtnFg]: '#1f1d18',
    [vars.color.metal]: '#c8c0b6',
    [vars.color.metalDeep]: '#6e6a62',
  },
})

globalStyle('[data-achery-root][data-material="copper"]', {
  vars: {
    [vars.color.material]: '#b8742a',
    [vars.color.materialFg]: '#1f1d18',
    [vars.color.materialBtnFg]: '#fbf8f0',
    [vars.color.metal]: '#5a7a6a',
    [vars.color.metalDeep]: '#46604f',
  },
})

// Dark-mode gilt adjustment — keep metals legible on dark paper bodies
globalStyle(':root[data-theme="dark"] [data-material="leather"], [data-achery-root][data-theme="dark"] [data-material="leather"]', {
  vars: {
    [vars.color.metalDeep]: '#e0bc70',
  },
})

globalStyle(':root[data-theme="dark"] [data-material="wood"], [data-achery-root][data-theme="dark"] [data-material="wood"]', {
  vars: {
    [vars.color.metalDeep]: '#c8c0b6',
  },
})

globalStyle(':root[data-theme="dark"] [data-material="copper"], [data-achery-root][data-theme="dark"] [data-material="copper"]', {
  vars: {
    [vars.color.metalDeep]: '#5a7a6a',
  },
})

// ---------------------------------------------------------------------------
// Base .material object — paper surface, picks up vars from ancestor
// ---------------------------------------------------------------------------

globalStyle('.material', {
  position: 'relative',
  background: vars.color.surface,
  color: vars.color.fg,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.stampLg,
  fontFamily: vars.font.body,
})

globalStyle('.material .material__bar', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp5,
  padding: `${vars.space.sp5} ${vars.space.sp6}`,
  position: 'relative',
})

globalStyle('.material .material__bar .material__mark', {
  width: '11px',
  height: '11px',
  background: vars.color.material,
  transform: 'rotate(45deg)',
  flex: 'none',
})

globalStyle('.material .material__title', {
  fontFamily: vars.font.display,
  fontWeight: '700',
  fontSize: vars.font.display,  // overridden inline by consumers
  letterSpacing: '-0.02em',
})

globalStyle('.material .material__close', {
  marginLeft: 'auto',
  fontFamily: vars.font.mono,
  opacity: '0.62',
})

globalStyle('.material .material__body', {
  padding: vars.space.sp6,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sp5,
  position: 'relative',
})

globalStyle('.material .material__eyebrow', {
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: vars.color.metalDeep,
})

globalStyle('.material .material__row', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  padding: `${vars.space.sp3} 0`,
  borderBottom: `1px solid ${vars.color.borderMute}`,
  fontVariantNumeric: 'tabular-nums',
})

globalStyle('.material .material__row:last-child', {
  borderBottom: '0',
})

globalStyle('.material .material__row .material__val', {
  color: vars.color.metalDeep,
})

globalStyle('.material .material__foot', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sp5,
  padding: `${vars.space.sp5} ${vars.space.sp6}`,
  position: 'relative',
})

globalStyle('.material .material__btn', {
  fontSize: '11px',
  fontWeight: '600',
  padding: `${vars.space.sp4} ${vars.space.sp6}`,
  background: vars.color.material,
  color: vars.color.materialFg,
  border: `1px solid ${vars.color.material}`,
  cursor: 'pointer',
  borderRadius: '0',
})

globalStyle('.material .material__btn--ghost', {
  background: 'transparent',
  color: vars.color.fg,
  borderColor: vars.color.border,
})

// ---------------------------------------------------------------------------
// m-chrome — subtle: paper object, material only as spine + metal trim
// ---------------------------------------------------------------------------

globalStyle('.material.m-chrome', {
  borderLeft: `3px solid ${vars.color.material}`,
})

globalStyle('.material.m-chrome > .material__bar', {
  borderBottom: `1px solid ${vars.color.borderMute}`,
})

globalStyle('.material.m-chrome > .material__foot', {
  borderTop: `1px solid ${vars.color.borderMute}`,
})

// ---------------------------------------------------------------------------
// m-surface — middle: material header band over a paper body
// ---------------------------------------------------------------------------

globalStyle('.material.m-surface > .material__bar', {
  background: vars.color.material,
  color: vars.color.materialFg,
  borderBottom: `1px solid ${vars.color.border}`,
})

globalStyle('.material.m-surface > .material__bar .material__mark', {
  background: vars.color.metal,
})

globalStyle('.material.m-surface > .material__foot', {
  borderTop: `1px solid ${vars.color.borderMute}`,
})

// ---------------------------------------------------------------------------
// m-full — the whole object in material; reserve for the rare big moment
// ---------------------------------------------------------------------------

globalStyle('.material.m-full', {
  background: vars.color.material,
  color: vars.color.materialFg,
})

globalStyle('.material.m-full > .material__bar', {
  borderBottom: `1px solid ${vars.color.metal}`,
})

globalStyle('.material.m-full > .material__bar .material__mark', {
  background: vars.color.metal,
})

globalStyle('.material.m-full .material__eyebrow', {
  color: vars.color.metal,
})

globalStyle('.material.m-full .material__row', {
  borderBottomColor: vars.color.metal,
  opacity: '0.7',
})

globalStyle('.material.m-full .material__row .material__val', {
  color: vars.color.metal,
  opacity: '1',
})

globalStyle('.material.m-full > .material__foot', {
  borderTop: `1px solid ${vars.color.metal}`,
})

globalStyle('.material.m-full .material__btn', {
  background: vars.color.metal,
  color: vars.color.materialBtnFg,
  borderColor: vars.color.metal,
})

globalStyle('.material.m-full .material__btn--ghost', {
  background: 'transparent',
  color: vars.color.materialFg,
  borderColor: vars.color.metal,
})
