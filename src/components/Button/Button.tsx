import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { Glyph } from '../../glyphs/Glyph'
import type { GlyphName } from '../../types/components'
import * as styles from './Button.css'

type ButtonVariants = NonNullable<RecipeVariants<typeof styles.button>>

/** Visual options shared by every element styled as a button. */
export interface ButtonStyleOptions {
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
}

/**
 * Class names for an element styled as a {@link Button}. Use it for elements the Button can't render
 * itself, such as a router's `<Link>`. Glyphs, `kbd` and `loading` are not applied.
 *
 * @example
 * ```tsx
 * <Link to="/lists" className={buttonClassName({ variant: 'accent' })}>My lists</Link>
 * ```
 */
export const buttonClassName = ({ variant = 'secondary', size = 'md' }: ButtonStyleOptions = {}): string =>
  styles.button({ variant, size })

interface ButtonContentProps extends ButtonStyleOptions {
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

/** Props for the {@link Button} component rendering a `<button>`. */
export interface ButtonProps extends ButtonContentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined
}

/** Props for the {@link Button} component rendering a link (`<a>`): pass `href`. */
export interface ButtonLinkProps extends ButtonContentProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

/**
 * The primary interactive element. Supports five variants, three sizes, optional
 * glyphs, and keyboard shortcut hints. Pass `href` to render a link that looks like a button.
 *
 * @example
 * ```tsx
 * <Button variant="accent" glyph="plus">New entry</Button>
 * <Button variant="ghost" size="sm" glyph="cross" aria-label="Close" />
 * <Button variant="primary" kbd="⌘S">Save</Button>
 * <Button variant="accent" size="lg" href="/signup">Start a list</Button>
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
  ...elementProps
}: ButtonProps | ButtonLinkProps) {
  const glyphSize = size === 'sm' ? 12 : 14
  const classes = [buttonClassName({ variant, size }), className].filter(Boolean).join(' ')

  const content = loading ? (
    <>
      <span className={styles.spinner} aria-hidden="true">
        <Glyph name="spinner" size={glyphSize} />
      </span>
      {loadingLabel}
    </>
  ) : (
    <>
      {glyph && glyphPosition === 'start' && <Glyph name={glyph} size={glyphSize} aria-hidden="true" />}
      {children}
      {glyph && glyphPosition === 'end' && <Glyph name={glyph} size={glyphSize} aria-hidden="true" />}
      {kbd && <span className={styles.kbdHint}>{kbd}</span>}
    </>
  )

  if (isLinkProps(elementProps)) {
    // Links can't be disabled; while loading, the styles' aria-disabled rule blocks pointer events
    return (
      <a
        {...elementProps}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={loading || elementProps['aria-disabled'] || undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      {...elementProps}
      className={classes}
      disabled={loading || elementProps.disabled}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  )
}

type ElementProps =
  | Omit<ButtonProps, keyof ButtonContentProps>
  | Omit<ButtonLinkProps, keyof ButtonContentProps>

const isLinkProps = (props: ElementProps): props is Omit<ButtonLinkProps, keyof ButtonContentProps> =>
  props.href !== undefined
