import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Glyph } from '../../glyphs/Glyph.js'
import type { GlyphName } from '../../types/components.js'
import * as styles from './Button.css.js'

type ButtonVariants = NonNullable<RecipeVariants<typeof styles.button>>

/** Props for the {@link Button} component. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style of the button.
   * - `primary` — high-emphasis, filled in foreground ink with stamp shadow
   * - `secondary` — medium-emphasis, surface fill (default)
   * - `accent` — accent-colour fill; use for the single primary CTA per view
   * - `ghost` — minimal, border only; use for toolbar/icon actions
   * - `danger` — destructive actions; uses danger semantic colour
   * @default 'secondary'
   */
  variant?: ButtonVariants['variant']
  /**
   * Size of the button.
   * - `sm` — 11px text, compact padding; use in toolbars, table rows
   * - `md` — 12px text, standard padding (default)
   * - `lg` — 13px text, generous padding; use for primary CTAs
   * @default 'md'
   */
  size?: ButtonVariants['size']
  /** Name of a {@link Glyph} to render alongside the label. */
  glyph?: GlyphName
  /**
   * Which side the glyph appears on.
   * @default 'start'
   */
  glyphPosition?: 'start' | 'end'
  /**
   * Keyboard shortcut hint rendered as a subtle badge at the button's trailing edge.
   * Display only — does not wire up any keyboard listener.
   * @example kbd="⌘K"
   */
  kbd?: string
  children?: ReactNode
  className?: string
}

/**
 * The primary interactive element. Supports five variants, three sizes, optional
 * glyphs, and keyboard shortcut hints.
 *
 * @example
 * ```tsx
 * <Button variant="accent" glyph="plus">New entry</Button>
 * <Button variant="ghost" size="sm" glyph="cross" aria-label="Close" />
 * <Button variant="primary" kbd="⌘S">Save</Button>
 * ```
 */
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
