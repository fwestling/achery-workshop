import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import * as styles from './Typography.css.js'

type PolymorphicProps<E extends ElementType> = HTMLAttributes<HTMLElement> & {
  as?: E
  children?: ReactNode
  className?: string
}

export function Display({ as: Tag = 'p', className, children, ...props }: PolymorphicProps<ElementType>) {
  return (
    <Tag className={[styles.display, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
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

export function Heading({ level = 1, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  const style = headingStyles[level]
  return (
    <Tag className={[style, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'base' | 'lead' | 'small'
  children?: ReactNode
  className?: string
}

const bodyStyles = {
  base: styles.body,
  lead: styles.bodyLead,
  small: styles.bodySmall,
} as const

export function Body({ variant = 'base', className, children, ...props }: BodyProps) {
  return (
    <p className={[bodyStyles[variant], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  )
}

export interface MonoProps extends HTMLAttributes<HTMLElement> {
  variant?: 'base' | 'small'
  as?: ElementType
  children?: ReactNode
  className?: string
}

export function Mono({ variant = 'base', as: Tag = 'span', className, children, ...props }: MonoProps) {
  const s = variant === 'small' ? styles.monoSmall : styles.mono
  return (
    <Tag className={[s, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}
