import { Skeleton } from '../Skeleton/Skeleton'
import * as styles from './Avatar.css'

export type AvatarTone = 'moss' | 'neutral'
export type AvatarSize = 'sm' | 'md' | 'lg'

/** Props for the {@link Avatar} component. */
export interface AvatarProps {
  /** Up to 2 characters, uppercased automatically. */
  initials: string
  /** Size variant — 24/32/40 px. @default 'md' */
  size?: AvatarSize
  /** Tone. @default 'neutral' */
  tone?: AvatarTone
  /** When true, renders a circular skeleton placeholder instead of the initials. */
  loading?: boolean
  className?: string
}

/**
 * Circular avatar displaying up to two initials.
 *
 * @example
 * ```tsx
 * <Avatar initials="FW" size="md" tone="moss" />
 * ```
 */
const avatarPx: Record<AvatarSize, string> = { sm: '24px', md: '32px', lg: '40px' }

export function Avatar({ initials, size = 'md', tone = 'neutral', loading = false, className }: AvatarProps) {
  if (loading) {
    const px = avatarPx[size]
    return (
      <Skeleton
        block
        height={px}
        className={className}
        style={{ width: px, borderRadius: '50%', flexShrink: 0 }}
      />
    )
  }
  const display = initials.slice(0, 2).toUpperCase()
  return (
    <span
      className={[styles.avatar({ size, tone }), className].filter(Boolean).join(' ')}
      aria-label={`User: ${display}`}
    >
      <span className={styles.initials}>{display}</span>
    </span>
  )
}
