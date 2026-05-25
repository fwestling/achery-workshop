import { Badge } from '../Badge/Badge'
import type { BadgeTone } from '../../types'

export type SubscriptionState = 'stable' | 'drift-up' | 'drift-down' | 'new-price' | 'renewing'

/** Props for the {@link StatePill} component. */
export interface StatePillProps {
  /** Subscription lifecycle state. */
  state: SubscriptionState
  className?: string
}

const stateMap: Record<SubscriptionState, { tone: BadgeTone; label: string }> = {
  'stable':     { tone: 'neutral',  label: 'Stable' },
  'drift-up':   { tone: 'stopped',  label: 'Drift up' },
  'drift-down': { tone: 'saved',    label: 'Drift down' },
  'new-price':  { tone: 'drafting', label: 'New price' },
  'renewing':   { tone: 'drafting', label: 'Renewing soon' },
}

/**
 * Subscription state indicator pill. Wraps {@link Badge} with predefined
 * tone and label for each subscription lifecycle state.
 *
 * @example
 * ```tsx
 * <StatePill state="drift-up" />
 * <StatePill state="stable" />
 * ```
 */
export function StatePill({ state, className }: StatePillProps) {
  const { tone, label } = stateMap[state]
  return (
    <Badge tone={tone} dot {...(className !== undefined ? { className } : {})}>
      {label}
    </Badge>
  )
}
