import type { SVGProps, FC } from 'react'
import type { GlyphName } from '../types/components'
import * as styles from './Glyph.css'
import * as GlyphComponents from './GlyphComponents'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

// `import *` means all 397 glyphs are bundled together — consumers can't
// tree-shake individual glyphs. Acceptable at current scale (~103KB gzipped).
// If bundle size becomes a concern, split GlyphComponents into one file per
// glyph and replace this with per-glyph dynamic imports (React.lazy).
const toComponentName = (name: GlyphName): string =>
  name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')

const lookup = (name: GlyphName): SvgComponent | undefined =>
  (GlyphComponents as Record<string, SvgComponent>)[toComponentName(name)]

/** Props for the {@link Glyph} component. */
export interface GlyphProps extends SVGProps<SVGSVGElement> {
  /**
   * Name of the glyph to render. One of the 394 icons + 3 brand marks in the Achery glyph set.
   * Use `searchGlyphs()` to find glyphs by keyword, or browse categories via `GlyphCategories`.
   *
   * **Brand:** `mark`, `wordmark`, `sigil`
   */
  name: GlyphName
  /**
   * Size in pixels — applied to both `width` and `height`.
   * @default 16
   */
  size?: number
  /**
   * Accessible label for the glyph. When provided, sets `aria-label` and
   * removes `aria-hidden`. Omit for decorative use.
   */
  title?: string
  className?: string
}

/**
 * Renders a single SVG glyph from the Achery icon set. Each glyph is inlined
 * as a React component — tree-shakeable, inherits `currentColor`.
 *
 * For decorative use, omit `title` (the glyph is `aria-hidden` by default).
 * For semantic use (icon-only button labels etc.), provide a `title`.
 */
export function Glyph({ name, size = 16, title, className, style, ...props }: GlyphProps) {
  const SvgComponent = lookup(name)

  if (!SvgComponent) {
    return (
      <span
        className={[styles.glyph, className].filter(Boolean).join(' ')}
        style={{ width: size, height: size, display: 'inline-block', ...style }}
        aria-hidden="true"
      />
    )
  }

  return (
    <SvgComponent
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={[styles.glyph, className].filter(Boolean).join(' ')}
      style={style}
      {...props}
    />
  )
}
