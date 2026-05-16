import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Glyph } from '../../glyphs/Glyph.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Button.css.js'

type ButtonVariants = NonNullable<RecipeVariants<typeof styles.button>>

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  glyph?: GlyphName
  glyphPosition?: 'start' | 'end'
  kbd?: string
  children?: ReactNode
  className?: string
}

export function Button({
  variant = 'secondary',
  size = 'md',
  glyph,
  glyphPosition = 'start',
  kbd,
  children,
  className,
  ...props
}: ButtonProps) {
  const glyphSize = size === 'sm' ? 12 : 14

  return (
    <button
      className={[styles.button({ variant, size }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {glyph && glyphPosition === 'start' && (
        <Glyph name={glyph} size={glyphSize} aria-hidden="true" />
      )}
      {children}
      {glyph && glyphPosition === 'end' && (
        <Glyph name={glyph} size={glyphSize} aria-hidden="true" />
      )}
      {kbd && <span className={styles.kbdHint}>{kbd}</span>}
    </button>
  )
}
