import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../types/components'
import * as styles from './Button.css'

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
  /**
   * When true, replaces the button content with a spinning `spinner` glyph and an optional
   * `loadingLabel`, and sets `disabled` to prevent double-submission. The button keeps
   * its current dimensions so the layout does not shift.
   */
  loading?: boolean
  /**
   * Label shown alongside the spinner when `loading` is true.
   * @default 'Loading…'
   */
  loadingLabel?: string
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
  loading = false,
  loadingLabel = 'Loading…',
  children,
  className,
  ...props
}: ButtonProps) {
  const glyphSize = size === 'sm' ? 12 : 14

  return (
    <button
      className={[styles.button({ variant, size }), className].filter(Boolean).join(' ')}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true">
            <Glyph name="spinner" size={glyphSize} />
          </span>
          {loadingLabel}
        </>
      ) : (
        <>
          {glyph && glyphPosition === 'start' && (
            <Glyph name={glyph} size={glyphSize} aria-hidden="true" />
          )}
          {children}
          {glyph && glyphPosition === 'end' && (
            <Glyph name={glyph} size={glyphSize} aria-hidden="true" />
          )}
          {kbd && <span className={styles.kbdHint}>{kbd}</span>}
        </>
      )}
    </button>
  )
}
