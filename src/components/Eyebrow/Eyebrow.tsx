import type { ReactNode, HTMLAttributes } from 'react'
import * as styles from './Eyebrow.css.js'

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  count?: number
  after?: ReactNode
  className?: string
}

export function Eyebrow({ children, count, after, className, ...props }: EyebrowProps) {
  return (
    <span className={[styles.eyebrow, className].filter(Boolean).join(' ')} {...props}>
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
      {after}
    </span>
  )
}
