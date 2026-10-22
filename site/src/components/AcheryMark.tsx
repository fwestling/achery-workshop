import type { SVGProps } from 'react'

// The Achery mark, copied from ../achery-site/apps/site/src/components/marks/AcheryMark.tsx (source:
// ../achery-site/assets/brand/achery-light.svg). Not achery-ui's `mark` glyph, which is a different drawing.
// Colours come from site.css (.achery-mark) and follow the site's theme toggle.
const MARK =
  'M 0 947.95082 L -151.18122 1035.2391 L -151.18122 1209.8009 L -75.589684 1253.4497 L -60.471747 1227.26 L -120.94535 1192.3492 L -120.94535 1087.6091 L -60.471747 1122.52 L 0 1087.6091 L 60.47175 1122.52 L 120.94535 1087.6091 L 120.94535 1192.3492 L 60.47175 1227.26 L 75.589687 1253.4497 L 151.18122 1209.8009 L 151.18122 1035.2391 L 0 947.95082 z M 0 982.8654 L 120.94535 1052.6909 L 60.47175 1087.6091 L 0 1052.6909 L -60.471747 1087.6091 L -120.94535 1052.6909 L 0 982.8654 z'

interface AcheryMarkProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  size?: number
  /** Accessible name; omit when the mark sits next to the word "Achery". */
  title?: string
}

export const AcheryMark = ({ size = 20, title, className, ...rest }: AcheryMarkProps) => (
  <svg
    viewBox="-153 947 306 306"
    width={size}
    height={size}
    className={className ? `achery-mark ${className}` : 'achery-mark'}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    {...rest}
  >
    {title && <title>{title}</title>}
    <path d={MARK} />
  </svg>
)
