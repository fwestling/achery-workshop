import raw from '../data/design-system-tokens.json'

// The Achery design system (the Claude Design artifact) is the source of truth for colours and their
// meaning; achery-ui mirrors its values. data/design-system-tokens.json is a verbatim copy of the
// artifact's project/tokens.json. The site reads only its *usage notes* from it. Every value it shows comes
// from achery-ui's token modules, and designSystem.test.ts fails when the two disagree.

type ThemedValue = string | { light: string; dark: string }

interface DsToken {
  name: string
  value: ThemedValue
  usage?: string
}

interface DsFamily {
  note?: string
  tokens: DsToken[]
}

interface DsTypeStyle {
  name: string
  fontSize: string
  lineHeight?: number
  fontWeight?: number
  letterSpacing?: string
  sample?: string
  usage?: string
}

interface DsTokens {
  color: DsFamily
  spacing: DsFamily
  radius: DsFamily
  shadow: DsFamily
  borderWidth: DsFamily
  fontSize: DsFamily
  lineHeight: DsFamily
  letterSpacing: DsFamily
  zIndex: DsFamily
  type: { groups: { name: string; family: string; styles: DsTypeStyle[] }[] }
}

export const ds = raw as DsTokens

export type DsFamilyName = Exclude<keyof DsTokens, 'type'>

/** `ink-deep` → `inkDeep`, `bg-2` → `bg2`: the design system's names as achery-ui spells them. */
export const camel = (name: string): string => name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())

/** Families whose design-system names carry a prefix achery-ui drops (`fs-xs` → `xs`), or are renamed outright. */
const RENAMES: Partial<Record<DsFamilyName, (name: string) => string>> = {
  fontSize: (n) => n.replace(/^fs-/, ''),
  lineHeight: (n) => n.replace(/^lh-/, ''),
  letterSpacing: (n) => n.replace(/^ls-/, ''),
  zIndex: (n) => n.replace(/^z-/, ''),
  radius: (n) => ({ 'r-0': 'none', 'r-1': 'hairline', 'r-2': 'sm', 'r-full': 'pill' })[n] ?? n,
  shadow: (n) => camel(n.replace(/^shadow-/, '')),
}

/** The achery-ui key for a design-system token name. */
export const uiName = (family: DsFamilyName, name: string): string => (RENAMES[family] ?? camel)(name)

const index = (family: DsFamilyName) => new Map(ds[family].tokens.map((t) => [uiName(family, t.name), t]))
const indexes = new Map<DsFamilyName, Map<string, DsToken>>()

const lookup = (family: DsFamilyName, key: string): DsToken | undefined => {
  if (!indexes.has(family)) indexes.set(family, index(family))
  return indexes.get(family)!.get(key)
}

/** The design system's usage note for an achery-ui token key, if it has one. */
export const usage = (family: DsFamilyName, key: string): string | undefined => lookup(family, key)?.usage

/** The design system's note for a whole family ("Square. Two softenings allowed…"). */
export const familyNote = (family: DsFamilyName): string | undefined => ds[family].note

export const typeStyles = ds.type.groups.flatMap((g) => g.styles.map((s) => ({ ...s, group: g.name, family: g.family })))

// ─── Colour values, for the drift check ──────────────────────────────────────

const toHex = (channels: number[]) =>
  '#' + channels.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('')

/** `oklch(44% 0.075 228)` → sRGB hex (Björn Ottosson's OKLab matrices). */
export const oklchToHex = (oklch: string): string => {
  const m = oklch.match(/^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)$/)
  if (!m) throw new Error(`Not an oklch() colour: ${oklch}`)
  const L = Number(m[1]) / 100
  const C = Number(m[2])
  const h = (Number(m[3]) * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ]
  return toHex(linear.map((x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)))
}

/** A colour token's value in one theme, aliases (`{moss}`) followed and OKLCH converted to hex. */
export const dsColour = (name: string, theme: 'light' | 'dark', depth = 0): string => {
  if (depth > 16) throw new Error(`Alias chain too deep at ${name}`)
  const token = ds.color.tokens.find((t) => t.name === name)
  if (!token) throw new Error(`No design-system colour named ${name}`)
  const value = typeof token.value === 'string' ? token.value : token.value[theme]
  const alias = value.match(/^\{(.+)\}$/)
  if (alias) return dsColour(alias[1]!, theme, depth + 1)
  return value.startsWith('oklch(') ? oklchToHex(value) : value.toLowerCase()
}

export const dsColourNames = ds.color.tokens.map((t) => t.name)

/** True when the token has separate light and dark values (a semantic token), not one raw value. */
export const isThemed = (name: string): boolean => typeof ds.color.tokens.find((t) => t.name === name)?.value === 'object'
