import { lazy, Suspense } from 'react'
import type { SVGProps } from 'react'
import type { GlyphName } from '../types/components'
import * as styles from './Glyph.css'

const toComponentName = (name: GlyphName): string =>
  name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')

// Cache lazy components so re-renders don't create new lazy() calls
const lazyCache = new Map<string, React.LazyExoticComponent<React.FC<SVGProps<SVGSVGElement>>>>()

const getLazy = (name: GlyphName) => {
  const compName = toComponentName(name)
  if (!lazyCache.has(compName)) {
    lazyCache.set(
      compName,
      lazy(() =>
        import(`./svg-components/${compName}.tsx`).then(m => ({ default: m.default }))
      ),
    )
  }
  return lazyCache.get(compName)!
}

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

const Placeholder = ({ size, className, style }: { size: number; className?: string | undefined; style?: React.CSSProperties | undefined }) => (
  <span
    className={[styles.glyph, className].filter(Boolean).join(' ')}
    style={{ width: size, height: size, display: 'inline-block', ...style }}
    aria-hidden="true"
  />
)

/**
 * Renders a single SVG glyph from the Achery icon set. Each glyph is loaded
 * lazily via dynamic import — only the requested glyph's module is fetched,
 * keeping the initial bundle small. Inherits `currentColor`.
 *
 * For decorative use, omit `title` (the glyph is `aria-hidden` by default).
 * For semantic use (icon-only button labels etc.), provide a `title`.
 */
export const Glyph = ({ name, size = 16, title, className, style, ...props }: GlyphProps) => {
  const SvgComponent = getLazy(name)

  return (
    <Suspense fallback={<Placeholder size={size} className={className} style={style} />}>
      <SvgComponent
        width={size}
        height={size}
        aria-hidden={title ? undefined : true}
        aria-label={title}
        className={[styles.glyph, className].filter(Boolean).join(' ')}
        style={style}
        {...props}
      />
    </Suspense>
  )
}
