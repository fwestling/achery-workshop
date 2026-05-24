import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import * as styles from './Typography.css'

type PolymorphicProps<E extends ElementType> = HTMLAttributes<HTMLElement> & {
  as?: E
  children?: ReactNode
  className?: string
}

/**
 * Large decorative text set in the display (serif) typeface. Polymorphic — renders
 * as any HTML element via the `as` prop; defaults to `<p>`.
 *
 * Use for hero headings, pull quotes, or editorial callouts where the display
 * face should carry the visual weight.
 *
 * @example
 * ```tsx
 * <Display as="h1">The Alchemist's Field Guide</Display>
 * <Display as="blockquote">Patience is a precipitate.</Display>
 * ```
 */
export function Display({ as: Tag = 'p', className, children, ...props }: PolymorphicProps<ElementType>) {
  return (
    <Tag className={[styles.display, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}

/** Props for the {@link Heading} component. */
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level — renders the corresponding `<h1>`–`<h5>` element and
   * applies the matching size/weight from the type scale.
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5
  children?: ReactNode
  className?: string
}

const headingStyles = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
  5: styles.h5,
} as const

/**
 * Section heading set in the body (sans-serif) typeface at appropriate scale.
 * Uses the correct semantic HTML element (`h1`–`h5`) based on `level`.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Recipes</Heading>
 * <Heading level={3}>Mordants & Fixatives</Heading>
 * ```
 */
export function Heading({ level = 1, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  const style = headingStyles[level]
  return (
    <Tag className={[style, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}

/** Props for the {@link Body} component. */
export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Size variant.
   * - `base` — 14px, standard reading text (default)
   * - `lead` — 16px, introductory or summary paragraphs
   * - `small` — 12px, captions, helper text, footnotes
   * @default 'base'
   */
  variant?: 'base' | 'lead' | 'small'
  children?: ReactNode
  className?: string
}

const bodyStyles = {
  base: styles.body,
  lead: styles.bodyLead,
  small: styles.bodySmall,
} as const

/**
 * Body text rendered as a `<p>` element. Three size variants map to the
 * base reading scale.
 *
 * @example
 * ```tsx
 * <Body>Combine oak gall with iron sulphate in a ratio of 2:1.</Body>
 * <Body variant="lead">An introduction to the chapter.</Body>
 * <Body variant="small">Last updated 3 days ago.</Body>
 * ```
 */
export function Body({ variant = 'base', className, children, ...props }: BodyProps) {
  return (
    <p className={[bodyStyles[variant], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  )
}

/** Props for the {@link Mono} component. */
export interface MonoProps extends HTMLAttributes<HTMLElement> {
  /**
   * Size variant.
   * - `base` — 13px monospace (default)
   * - `small` — 11px monospace; use for inline code in dense layouts
   * @default 'base'
   */
  variant?: 'base' | 'small'
  /** Element to render as. @default 'span' */
  as?: ElementType
  children?: ReactNode
  className?: string
}

/**
 * Monospace text for code, measurements, IDs, and numeric values. Polymorphic
 * via `as`; defaults to `<span>` for inline use.
 *
 * @example
 * ```tsx
 * <Mono>Fe₂(SO₄)₃</Mono>
 * <Mono as="code" variant="small">recipe-042</Mono>
 * ```
 */
export function Mono({ variant = 'base', as: Tag = 'span', className, children, ...props }: MonoProps) {
  const s = variant === 'small' ? styles.monoSmall : styles.mono
  return (
    <Tag className={[s, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}
