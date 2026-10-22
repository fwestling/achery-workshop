import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from './vars.css'
import { lightScales } from './scales'
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
  // Spacing, radius, shadow and motion, from the token modules (scales.ts)
  ...lightScales,
})
