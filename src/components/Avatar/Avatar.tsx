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
export function Avatar({ initials, size = 'md', tone = 'neutral', className }: AvatarProps) {
  const display = initials.slice(0, 2).toUpperCase()
  return (
    <span
      className={[styles.avatar({ size, tone }), className].filter(Boolean).join(' ')}
      aria-label={`User: ${display}`}
    >
      {display}
    </span>
  )
}
