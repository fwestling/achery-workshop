// WCAG 2.x contrast, for the ratios the foundation pages print beside each colour.

const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)

/** Relative luminance of a `#rrggbb` colour. */
export const luminance = (hex: string): number => {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) throw new Error(`Expected #rrggbb, got ${hex}`)
  const [r, g, b] = [m[1]!, m[2]!, m[3]!].map((h) => channel(parseInt(h, 16) / 255)) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast ratio between two `#rrggbb` colours, 1–21. */
export const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** What a pair is good for. Text needs 4.5:1 (3:1 at 24px+ or bold 19px+); marks and edges need 3:1. */
export type Rating = 'AAA' | 'AA' | 'Large text' | 'Non-text' | 'Decorative'

export const rateText = (ratio: number): Rating =>
  ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'Large text' : 'Decorative'

export const rateNonText = (ratio: number): Rating => (ratio >= 3 ? 'Non-text' : 'Decorative')

/** `4.4999` → `4.49`: truncated, never rounded up past a threshold it doesn't meet. */
export const formatRatio = (ratio: number): string => `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`
