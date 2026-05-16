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

export interface GlyphProps extends SVGProps<SVGSVGElement> {
  name: GlyphName
  size?: number
  title?: string
  className?: string
}

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
