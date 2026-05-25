import * as styles from './TypeTag.css'

export type TransactionType = 'basic' | 'internal' | 'exceptional' | 'fee'

/** Props for the {@link TypeTag} component. */
export interface TypeTagProps {
  /** Transaction type — determines colour and label. */
  type: TransactionType
  className?: string
}

const labels: Record<TransactionType, string> = {
  basic:       'basic',
  internal:    'internal',
  exceptional: 'exceptional',
  fee:         'fee',
}

/**
 * Monospace type tag for transaction classification.
 * Colour-coded by type with a muted border.
 *
 * @example
 * ```tsx
 * <TypeTag type="exceptional" />
 * <TypeTag type="fee" />
 * ```
 */
export function TypeTag({ type, className }: TypeTagProps) {
  return (
    <span className={[styles.tag({ type }), className].filter(Boolean).join(' ')}>
      {labels[type]}
    </span>
  )
}
