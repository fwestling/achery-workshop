// The accent dial's custom properties (set per setting in dial.css.ts), and how components read them.
// A plain module rather than part of dial.css.ts: vanilla-extract's .css.ts files can only export values.

/** The custom properties components read; see Eyebrow, Checkbox, Button (secondary) and Tabs. */
export const dialVars = {
  /** `display` of the accent rule before an eyebrow: `none` under underline (so it takes no gap either) */
  eyebrowMark: '--achery-dial-eyebrow-mark',
  /** A checked or indeterminate checkbox's fill, and the tick drawn on it */
  tickFill: '--achery-dial-tick-fill',
  tickMark: '--achery-dial-tick-mark',
  /** The border of an outline (secondary) button */
  outlineBorder: '--achery-dial-outline-border',
  /** The active tab's underline: accent under every setting */
  tabIndicator: '--achery-dial-tab-indicator',
} as const

/** `var(--achery-dial-…, fallback)`: a component's reading of the dial, with the chrome look as fallback */
export const dialVar = (name: keyof typeof dialVars, fallback: string): string => `var(${dialVars[name]}, ${fallback})`
