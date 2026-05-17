import type { SVGProps, FC } from 'react'
import type { GlyphName } from '../types/components.js'
import * as styles from './Glyph.css.js'

import ArrowRight from './svg/arrow-right.svg?react'
import ArrowUp from './svg/arrow-up.svg?react'
import Asterism from './svg/asterism.svg?react'
import Book from './svg/book.svg?react'
import Circle from './svg/circle.svg?react'
import Compass from './svg/compass.svg?react'
import Cross from './svg/cross.svg?react'
import Eye from './svg/eye.svg?react'
import Feather from './svg/feather.svg?react'
import Fern from './svg/fern.svg?react'
import Flask from './svg/flask.svg?react'
import Flourish from './svg/flourish.svg?react'
import Hand from './svg/hand.svg?react'
import Hex from './svg/hex.svg?react'
import Key from './svg/key.svg?react'
import Leaf from './svg/leaf.svg?react'
import Mark from './svg/mark.svg?react'
import Mercury from './svg/mercury.svg?react'
import Minus from './svg/minus.svg?react'
import Moon from './svg/moon.svg?react'
import Plus from './svg/plus.svg?react'
import Salt from './svg/salt.svg?react'
import Scroll from './svg/scroll.svg?react'
import Sigil from './svg/sigil.svg?react'
import Sprig from './svg/sprig.svg?react'
import Square from './svg/square.svg?react'
import Star from './svg/star.svg?react'
import Sulfur from './svg/sulfur.svg?react'
import Sun from './svg/sun.svg?react'
import Tick from './svg/tick.svg?react'
import Triangle from './svg/triangle.svg?react'
import TriangleDown from './svg/triangle-down.svg?react'
import Wordmark from './svg/wordmark.svg?react'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

const glyphMap: Record<GlyphName, SvgComponent> = {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'asterism': Asterism,
  'book': Book,
  'circle': Circle,
  'compass': Compass,
  'cross': Cross,
  'eye': Eye,
  'feather': Feather,
  'fern': Fern,
  'flask': Flask,
  'flourish': Flourish,
  'hand': Hand,
  'hex': Hex,
  'key': Key,
  'leaf': Leaf,
  'mark': Mark,
  'mercury': Mercury,
  'minus': Minus,
  'moon': Moon,
  'plus': Plus,
  'salt': Salt,
  'scroll': Scroll,
  'sigil': Sigil,
  'sprig': Sprig,
  'square': Square,
  'star': Star,
  'sulfur': Sulfur,
  'sun': Sun,
  'tick': Tick,
  'triangle': Triangle,
  'triangle-down': TriangleDown,
  'wordmark': Wordmark,
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
 * Renders a single SVG glyph from the Achery icon set. Each glyph is a
 * standalone React component imported as a `?react` SVG — tree-shakeable,
 * inherits `currentColor` from the surrounding text.
 *
 * For decorative use, omit `title` (the glyph is `aria-hidden` by default).
 * For semantic use (icon-only button labels etc.), provide a `title`.
 *
 * @example
 * ```tsx
 * // Decorative
 * <Glyph name="fern" size={24} aria-hidden="true" />
 *
 * // Semantic (in an icon-only button)
 * <button aria-label="Close"><Glyph name="cross" size={16} /></button>
 *
 * // Inherits text colour
 * <span style={{ color: 'var(--color-accent)' }}>
 *   <Glyph name="star" size={20} />
 * </span>
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
