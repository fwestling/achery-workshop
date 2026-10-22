import { formatRatio, type Rating } from '../foundations/contrast'

/** A flat chip of colour. Decorative: the hex beside it carries the value. */
export const Chip = ({ colour, size = 'md' }: { colour: string; size?: 'sm' | 'md' | 'lg' }) => (
  <span className={`chip chip--${size}`} style={{ background: colour }} aria-hidden="true" />
)

const RATING_LABEL: Record<Rating, string> = {
  AAA: 'AAA',
  AA: 'AA',
  'Large text': 'AA large',
  'Non-text': '3:1',
  Decorative: 'Below 3:1',
}

/** A ratio and what it passes. Wording, not colour alone, carries the result. */
export const RatioTag = ({ ratio, rating, against }: { ratio: number; rating: Rating; against: string }) => (
  <span className={`ratio ratio--${rating === 'Decorative' ? 'low' : rating === 'Large text' ? 'mid' : 'ok'}`}>
    <span className="ratio__value">{formatRatio(ratio)}</span> <span className="ratio__against">{against}</span>{' '}
    <span className="ratio__rating">{RATING_LABEL[rating]}</span>
  </span>
)
