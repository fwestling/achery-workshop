import type { ReactNode } from 'react'
import { Card } from '../Card/Card'
import { Eyebrow } from '../Eyebrow/Eyebrow'
import { Badge } from '../Badge/Badge'
import { Sparkline } from '../Sparkline/Sparkline'
import type { SparklineTone } from '../Sparkline/Sparkline'
import type { BadgeTone } from '../../types'
import * as styles from './KpiTile.css'

const deltaToneToBadge: Record<SparklineTone, BadgeTone> = {
  positive: 'saved',
  negative: 'stopped',
  neutral:  'neutral',
}

/** Props for the {@link KpiTile} component. */
export interface KpiTileProps {
  /** Eyebrow label above the value (e.g. "Total Income"). */
  label: string
  /** Pre-formatted value string (e.g. "$4,200"). */
  value: string
  /** Delta label (e.g. "+$340 vs last month"). */
  delta?: string
  /** Tone for the delta badge and sparkline. @default 'neutral' */
  deltaTone?: SparklineTone
  /** Data points passed to the internal Sparkline. */
  sparkData?: number[]
  /** Makes the tile a clickable button. */
  onClick?: () => void
  className?: string
}

/**
 * KPI summary tile with eyebrow label, large value, optional delta badge,
 * and optional sparkline.
 *
 * @example
 * ```tsx
 * <KpiTile
 *   label="Total Income"
 *   value="$4,200"
 *   delta="+$340 vs last month"
 *   deltaTone="positive"
 *   sparkData={[3200, 3500, 3800, 4200]}
 *   onClick={() => navigate('/income')}
 * />
 * ```
 */
export function KpiTile({
  label,
  value,
  delta,
  deltaTone = 'neutral',
  sparkData,
  onClick,
  className,
}: KpiTileProps) {
  const inner: ReactNode = (
    <Card variant="stamp" padding="md" {...(className !== undefined ? { className } : {})}>
      <div className={styles.inner}>
        <Eyebrow>{label}</Eyebrow>
        <span className={styles.value}>{value}</span>
        {delta && (
          <Badge tone={deltaToneToBadge[deltaTone]} dot>
            {delta}
          </Badge>
        )}
        {sparkData && sparkData.length >= 2 && (
          <Sparkline data={sparkData} tone={deltaTone} width={80} height={24} />
        )}
      </div>
    </Card>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles.wrapper}>
        {inner}
      </button>
    )
  }

  return inner
}
