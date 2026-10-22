import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from './vars.css'
import { fontFamilies } from '../tokens/typography'
import { chartColors } from '../tokens/chart'
import { palette } from '../tokens/palette'
import { lightTokens } from '../tokens/semantic'

// Colours come from the token modules (shared with achery-ui/native), so the two never drift
const t = lightTokens
const chart = chartColors.light

createGlobalTheme('[data-achery-root][data-theme="light"]', vars, {
  color: {
    bg: t.bg,
    bg2: t.bg2,
    bgSunken: t.bgSunken,
    surface: t.surface,
    surface2: t.surface2,
    fg: t.fg,
    fg2: t.fg2,
    fg3: t.fg3,
    fgMute: t.fgMute,
    border: t.border,
    border2: t.border2,
    borderMute: t.borderMute,
    rule: t.rule,
    accent: t.accent,
    accentFg: t.accentFg,
    accent2: t.accent2,
    accent3: t.accent3,
    success: t.success,
    warn: t.warn,
    danger: t.danger,
    info: t.info,
    selectionBg: t.selectionBg,
    selectionFg: t.selectionFg,
    // Material fallbacks — leather is the default signature; overridden by data-material (material.css.ts)
    material: t.materialLeather,
    materialFg: t.materialLeatherFg,
    materialBtnFg: palette.ink,
    metal: t.gold,
    metalDeep: t.goldDeep,
  },
  chart: {
    series1: chart.series[0], series2: chart.series[1], series3: chart.series[2], series4: chart.series[3], series5: chart.series[4], series6: chart.series[5],
    ordinal1: chart.ordinal[0], ordinal2: chart.ordinal[1], ordinal3: chart.ordinal[2], ordinal4: chart.ordinal[3], ordinal5: chart.ordinal[4],
  },
  font: {
    display: fontFamilies.display,
    body: fontFamilies.body,
    mono: fontFamilies.mono,
  },
  space: {
    sp1: '2px',
    sp2: '4px',
    sp3: '6px',
    sp4: '8px',
    sp5: '12px',
    sp6: '16px',
    sp7: '20px',
    sp8: '24px',
    sp9: '32px',
    sp10: '40px',
    sp11: '56px',
    sp12: '80px',
  },
  radius: {
    none: '0',
    hairline: '1px',
    sm: '2px',
    pill: '999px',
  },
  shadow: {
    stamp: '2px 2px 0 0 #1f1d18',
    stampLg: '4px 4px 0 0 #1f1d18',
    press: 'inset 0 1px 0 rgba(20,19,15,0.18)',
    soft: '0 1px 0 rgba(20,19,15,0.12), 0 0 0 1px rgba(20,19,15,0.04)',
  },
  duration: {
    fast: '120ms',
    base: '180ms',
    slow: '320ms',
  },
  ease: {
    out: 'cubic-bezier(.2,.7,.2,1)',
    snap: 'cubic-bezier(.5,1.6,.4,1)',
  },
})
