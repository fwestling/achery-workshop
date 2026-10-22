import { duration, easing } from '../tokens/motion'
import { radius } from '../tokens/radius'
import { shadows } from '../tokens/shadows'
import { darkTokens, lightTokens } from '../tokens/semantic'
import { spacing } from '../tokens/spacing'

// The non-colour parts of each theme, built from the token modules so the CSS can't drift from them.
// (A plain module, not .css.ts: light.css.ts and dark.css.ts spread it into createGlobalTheme.)

const px = (n: number) => `${n}px`

const space = {
  sp1: px(spacing.sp1),
  sp2: px(spacing.sp2),
  sp3: px(spacing.sp3),
  sp4: px(spacing.sp4),
  sp5: px(spacing.sp5),
  sp6: px(spacing.sp6),
  sp7: px(spacing.sp7),
  sp8: px(spacing.sp8),
  sp9: px(spacing.sp9),
  sp10: px(spacing.sp10),
  sp11: px(spacing.sp11),
  sp12: px(spacing.sp12),
}

const shared = {
  space,
  radius: { ...radius },
  duration: { ...duration },
  ease: { out: easing.out, snap: easing.snap },
}

/** The stamp shadow is offset in the theme's border colour: ink on paper, cream on lamp black. */
export const lightScales = {
  ...shared,
  shadow: {
    stamp: `${shadows.stamp} ${lightTokens.border}`,
    stampLg: `${shadows.stampLg} ${lightTokens.border}`,
    press: shadows.pressLight,
    soft: shadows.softLight,
  },
}

export const darkScales = {
  ...shared,
  shadow: {
    stamp: `${shadows.stamp} ${darkTokens.border}`,
    stampLg: `${shadows.stampLg} ${darkTokens.border}`,
    press: shadows.pressDark,
    soft: shadows.softDark,
  },
}
