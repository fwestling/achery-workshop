import type { SVGProps, FC } from 'react'
import type { GlyphName } from '../types/components'
import * as styles from './Glyph.css'
import * as GlyphComponents from './GlyphComponents'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

const glyphMap: Record<GlyphName, SvgComponent> = {
  'arrow-right': GlyphComponents.ArrowRight,
  'arrow-up': GlyphComponents.ArrowUp,
  'asterism': GlyphComponents.Asterism,
  'book': GlyphComponents.Book,
  'circle': GlyphComponents.Circle,
  'compass': GlyphComponents.Compass,
  'cross': GlyphComponents.Cross,
  'eye': GlyphComponents.Eye,
  'feather': GlyphComponents.Feather,
  'fern': GlyphComponents.Fern,
  'flask': GlyphComponents.Flask,
  'flourish': GlyphComponents.Flourish,
  'hand': GlyphComponents.Hand,
  'hex': GlyphComponents.Hex,
  'key': GlyphComponents.Key,
  'leaf': GlyphComponents.Leaf,
  'mark': GlyphComponents.Mark,
  'mercury': GlyphComponents.Mercury,
  'minus': GlyphComponents.Minus,
  'moon': GlyphComponents.Moon,
  'plus': GlyphComponents.Plus,
  'salt': GlyphComponents.Salt,
  'scroll': GlyphComponents.Scroll,
  'sigil': GlyphComponents.Sigil,
  'sprig': GlyphComponents.Sprig,
  'square': GlyphComponents.Square,
  'star': GlyphComponents.Star,
  'sulfur': GlyphComponents.Sulfur,
  'sun': GlyphComponents.Sun,
  'tick': GlyphComponents.Tick,
  'triangle': GlyphComponents.Triangle,
  'triangle-down': GlyphComponents.TriangleDown,
  'wordmark': GlyphComponents.Wordmark,
}

/** Props for the {@link Glyph} component. */
export interface GlyphProps extends SVGProps<SVGSVGElement> {
  /**
   * Name of the glyph to render. One of the 33 icons in the Achery glyph set.
   *
   * **Geometric:** `circle`, `square`, `triangle`, `triangle-down`, `hex`, `minus`, `plus`, `cross`, `tick`, `arrow-right`, `arrow-up`
   *
   * **Botanical / alchemical:** `fern`, `sprig`, `leaf`, `feather`, `flourish`, `asterism`, `sigil`, `salt`, `sulfur`, `mercury`
   *
   * **Editorial / tools:** `book`, `scroll`, `feather`, `key`, `flask`, `compass`, `eye`, `hand`, `star`, `moon`, `sun`
   *
   * **Brand:** `mark`, `wordmark`
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
 *
 * @example
 * ```tsx
 * // Decorative
 * <Glyph name="fern" size={24} />
 *
 * // Semantic (in an icon-only button)
 * <button aria-label="Close"><Glyph name="cross" size={16} /></button>
 * ```
 */
export function Glyph({ name, size = 16, title, className, style, ...props }: GlyphProps) {
  const SvgComponent = glyphMap[name]

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
