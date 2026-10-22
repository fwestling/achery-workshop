# Tokens

The `achery-ui/tokens` entry point: design tokens as plain TypeScript values. **React Native safe**: no
DOM, no React.

```ts
import { palette, lightTokens, darkTokens, spacing, fontFamilies, shadows } from 'achery-ui/tokens'
```

| Module | Exports |
|---|---|
| `palette.ts` | `palette`: raw colours, mirrored from the Achery design system's `tokens.json` |
| `semantic.ts` | `lightTokens`, `darkTokens`: the theme colours components use |
| `accents.ts` | `accentColors`, `accentColorNames` |
| `spacing.ts` | `spacing` (numbers, px/dp), `spacingScale`, `px()` |
| `typography.ts` | `fontFamilies`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `googleFontsUrl` |
| `radius.ts`, `shadows.ts`, `motion.ts` | `radius`; `shadows`; `duration`, `easing`, `zIndex` |
| `chart.ts` | `chartColors`, `CHART_SERIES_MAX` |
| `badge.ts` | `badgeTones`: the Badge colours shared by web and native |

The web theme stylesheets (`src/theme/*.css.ts`) are built from these modules, so the CSS can't drift
from them.

Every value, with usage notes and contrast: [workshop.achery.dev](https://workshop.achery.dev/colour).
How to use them: [`src/docs/Tokens.mdx`](../docs/Tokens.mdx). Nothing loads the fonts for you: link
`googleFontsUrl` or self-host them.
