/**
 * The user's colour-mode **preference**.
 * - `'light'` / `'dark'` — explicit override
 * - `'system'` — follow the OS `prefers-color-scheme` media query
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/** The **resolved** colour mode actually applied to the DOM — always `'light'` or `'dark'`. */
export type ResolvedTheme = 'light' | 'dark'

/**
 * Controls how loudly the accent runs across the working UI.
 * Set once on the project root via `<AcheryProvider defaultDial="chrome">`.
 *
 * - `'underline'` — accent only on links, focus rings, and the active-tab underline
 * - `'chrome'`    — accent threads the wiring: tabs, ticks, eyebrows, outline buttons (default)
 * - `'surface'`   — one signature panel floods with accent colour (`.signature-surface`)
 */
/**
 * The accent colour palette.
 * Matches the keys of `accentColors` in `src/tokens/accents.ts` — keep them in sync.
 */
export type AccentColor =
  | 'terracotta' | 'moss' | 'plum' | 'ochre' | 'rust' | 'copper'
  | 'slate' | 'verdigris' | 'mauve' | 'amber' | 'fern' | 'blush'

export type AccentDial = 'underline' | 'chrome' | 'surface'

/**
 * The hero material a project uses for its contained, occasional objects
 * (modals, dialogs, featured cards, receipts).
 *
 * - `'none'`    — no material signature; objects use plain paper/ink (default)
 * - `'leather'` — cordovan + gilt; warm, bookish
 * - `'wood'`    — walnut + pewter; honest, mid-tone
 * - `'copper'`  — oxidised copper + patina; energetic, high-contrast
 */
export type MaterialSignature = 'none' | 'leather' | 'wood' | 'copper'

/**
 * How much of the material surfaces on a `.material` object.
 *
 * - `'chrome'`  — material only as a spine/trim + metal accents; paper body (default)
 * - `'surface'` — material header band over a paper body
 * - `'full'`    — the whole object in material; reserve for rare, celebratory moments
 */
export type MaterialIntensity = 'chrome' | 'surface' | 'full'

/**
 * Declares the design direction of a consuming app, determining which
 * adaptation ladder governs its components.
 *
 * - `'web-first'`    — dense desk layout descended to phone via the disclosure ladder
 *                      (reflow → scale-step → collapse → tab → sheet → drill → defer)
 * - `'native-first'` — phone layout promoted to desk via the promotion ladder
 *                      (inverse moves + pointer-only power: hover, right-click, multi-select)
 * - `'parity'`       — feature set agreed up front; design the data model first
 * - `'native-only'`  — no web twin; Achery touch rules apply in full, no ladder needed
 *
 * Set once on `<AcheryProvider defaultSurfaceOrigin="...">`. Components and
 * docs use this to know which pattern map applies; it does not drive CSS
 * directly (that is handled by `@media (pointer: coarse/fine)` and component
 * variants).
 */
export type SurfaceOrigin = 'web-first' | 'native-first' | 'parity' | 'native-only'

/**
 * Value provided by {@link ThemeContext} and returned by {@link useTheme}.
 * Gives components read/write access to the active theme, accent, dial, and material.
 */
export interface ThemeContextValue {
  /** The user's colour-mode preference (`'light'` | `'dark'` | `'system'`). */
  mode: ThemeMode
  /** The resolved colour applied to the DOM — always `'light'` or `'dark'`. */
  theme: ResolvedTheme
  /** Set the colour-mode preference. */
  setTheme: (theme: ThemeMode) => void
  /** Toggle between `'light'` and `'dark'` (skips `'system'`). */
  toggleTheme: () => void
  /** Currently active accent colour. */
  accent: AccentColor
  /** Set the accent colour. */
  setAccent: (accent: AccentColor) => void
  /** How loudly the accent runs across the working UI. */
  dial: AccentDial
  /** Set the accent dial. */
  setDial: (dial: AccentDial) => void
  /** The hero material signature for this project. */
  material: MaterialSignature
  /** Set the material signature. */
  setMaterial: (material: MaterialSignature) => void
  /**
   * The design direction of this app — determines which adaptation ladder
   * governs component behaviour on different surfaces.
   */
  surfaceOrigin: SurfaceOrigin
}
