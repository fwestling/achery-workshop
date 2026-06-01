#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const svgDir = new URL('../src/glyphs/svg', import.meta.url).pathname
const componentsDir = new URL('../src/glyphs/svg-components', import.meta.url).pathname
const nativeComponentsDir = new URL('../src/glyphs/svg-components-native', import.meta.url).pathname
const indexFile = new URL('../src/glyphs/GlyphComponents.tsx', import.meta.url).pathname

const files = readdirSync(svgDir).filter(f => f.endsWith('.svg')).sort()

// Convert kebab-case filename to PascalCase component name
function toPascal(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())
}

// ─── Web generation ───────────────────────────────────────────────────────────

// Convert SVG attributes to JSX (stroke-width → strokeWidth etc.)
function svgToJsx(svg) {
  return svg
    .replace(/\bclass=/g, 'className=')
    .replace(/([a-z])-([a-z])/g, (_, a, b) => a + b.toUpperCase()) // kebab attrs → camelCase
    .replace(/<svg([^>]*)>/, '<svg$1 {...props}>')  // spread props onto root svg
    .replace(/stroke-linecap=/g, 'strokeLinecap=')  // fix any missed
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/xmlns="[^"]*"\s*/g, '')  // remove xmlns (not needed in JSX)
}

// ─── Native generation ────────────────────────────────────────────────────────

// Element names to capitalise for react-native-svg
const RN_ELEMENTS = ['path', 'line', 'circle', 'rect', 'polyline', 'polygon', 'ellipse']

// Extract a named attribute value from an element tag string (returns null if absent)
function getAttr(tag, attr) {
  const m = tag.match(new RegExp(`\\b${attr}="([^"]*)"`, 'i'))
  return m ? m[1] : null
}

// Inject an attribute into a tag string only if the tag doesn't already define it
function injectAttr(tag, attr, value) {
  if (new RegExp(`\\b${attr}=`).test(tag)) return tag // already present — don't override
  // Insert before the closing > or />
  return tag.replace(/(\s*\/?>)$/, ` ${attr}="${value}"$1`)
}

// Convert kebab-case attribute names within a tag string
function camelCaseAttrs(tag) {
  return tag
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/font-family=/g, 'fontFamily=')
    .replace(/font-weight=/g, 'fontWeight=')
    .replace(/font-size=/g, 'fontSize=')
}

// Replace currentColor with the {color} prop reference
function replaceCurrentColor(tag) {
  return tag
    .replace(/stroke="currentColor"/g, 'stroke={color}')
    .replace(/fill="currentColor"/g, 'fill={color}')
}

function svgToNative(raw) {
  // Extract viewBox
  const viewBoxMatch = raw.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  // Extract root-level presentation attributes from <svg ...>
  const svgTagMatch = raw.match(/<svg([^>]*)>/)
  const svgAttrs = svgTagMatch ? svgTagMatch[1] : ''
  const rootStroke = getAttr(svgAttrs, 'stroke')       // e.g. "currentColor" or null
  const rootFill = getAttr(svgAttrs, 'fill')           // e.g. "none" or "currentColor"
  const rootStrokeWidth = getAttr(svgAttrs, 'stroke-width')
  const rootStrokeLinecap = getAttr(svgAttrs, 'stroke-linecap')
  const rootStrokeLinejoin = getAttr(svgAttrs, 'stroke-linejoin')

  // Extract inner content (between <svg...> and </svg>)
  const inner = raw
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()

  // Collect which RN-SVG imports are actually needed
  const usedElements = new Set()

  // Process each child element tag
  // Match opening tags (self-closing or with content), e.g. <path ...> or <path .../>
  // Also match closing tags like </path> — we preserve them as-is with capitalised name
  let jsx = inner.replace(/<(\/?)([a-z]+)([^>]*)>/g, (match, slash, tagName, attrs) => {
    const lower = tagName.toLowerCase()

    if (!RN_ELEMENTS.includes(lower)) {
      // Unknown element (shouldn't happen after skip check, but be safe)
      return match
    }

    const capitalised = lower.charAt(0).toUpperCase() + lower.slice(1)
    usedElements.add(capitalised)

    if (slash) {
      // Closing tag — just capitalise
      return `</${capitalised}>`
    }

    // Opening tag — inject missing root attrs, camelCase, replace currentColor
    let t = attrs

    // Inject root presentation attrs onto child only if not already specified
    if (rootStroke !== null) {
      const injectVal = rootStroke === 'currentColor' ? '{color}' : `"${rootStroke}"`
      // Only inject if child doesn't already have stroke=
      if (!/\bstroke=/.test(t)) {
        t = t + ` stroke=${injectVal}`
      }
    }
    if (rootFill !== null && !/\bfill=/.test(t)) {
      const injectVal = rootFill === 'currentColor' ? '{color}' : `"${rootFill}"`
      t = t + ` fill=${injectVal}`
    }
    if (rootStrokeWidth && !/\bstroke-width=/.test(t) && !/\bstrokeWidth=/.test(t)) {
      t = t + ` strokeWidth="${rootStrokeWidth}"`
    }
    if (rootStrokeLinecap && !/\bstroke-linecap=/.test(t) && !/\bstrokeLinecap=/.test(t)) {
      t = t + ` strokeLinecap="${rootStrokeLinecap}"`
    }
    if (rootStrokeLinejoin && !/\bstroke-linejoin=/.test(t) && !/\bstrokeLinejoin=/.test(t)) {
      t = t + ` strokeLinejoin="${rootStrokeLinejoin}"`
    }

    // camelCase remaining kebab attrs
    t = camelCaseAttrs(t)

    // Replace currentColor references
    t = replaceCurrentColor(t)

    return `<${capitalised}${t}>`
  })

  // Also handle already-self-closing tags like <line ... />  (the regex above catches /> via attrs)
  // The regex captures everything up to > so /> ending is in attrs — normalise it
  jsx = jsx.replace(/(\s*)\/>/g, ' />')

  const imports = ['Svg', ...Array.from(usedElements).sort()].join(', ')

  return { viewBox, jsx, imports }
}

// ─── Run generation ───────────────────────────────────────────────────────────

mkdirSync(componentsDir, { recursive: true })
mkdirSync(nativeComponentsDir, { recursive: true })

const exports = []
const nativeExports = []
let nativeSkipped = 0

for (const file of files) {
  const name = basename(file, '.svg')
  const compName = toPascal(name)
  const raw = readFileSync(join(svgDir, file), 'utf8').trim()

  // ── Web component ──
  const jsx = svgToJsx(raw)
  const webContent = [
    '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
    "import type { SVGProps } from 'react'",
    'type P = SVGProps<SVGSVGElement>',
    `export default function ${compName}(props: P) { return ${jsx} }`,
  ].join('\n') + '\n'
  writeFileSync(join(componentsDir, `${compName}.tsx`), webContent)
  exports.push({ name, compName })

  // ── Native component ──
  // Skip any SVG using <g> or <text> (brand/wordmark glyphs)
  if (raw.includes('<g') || raw.includes('<text')) {
    console.log(`  ⚠ Skipping native for ${file} (uses <g> or <text>)`)
    nativeSkipped++
    continue
  }

  const { viewBox, jsx: nativeJsx, imports } = svgToNative(raw)
  const nativeContent = [
    '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
    `import { ${imports} } from 'react-native-svg'`,
    'import type { ViewStyle } from \'react-native\'',
    'interface Props { size?: number; color?: string; style?: ViewStyle }',
    `export default function G${compName}({ size = 24, color = '#000000', style }: Props) {`,
    `  return (`,
    `    <Svg width={size} height={size} viewBox="${viewBox}" style={style}>`,
    `      ${nativeJsx.trim().replace(/\n/g, '\n      ')}`,
    `    </Svg>`,
    `  )`,
    `}`,
  ].join('\n') + '\n'
  writeFileSync(join(nativeComponentsDir, `${compName}.tsx`), nativeContent)
  nativeExports.push(compName)
}

// GlyphComponents.tsx — intentionally empty, individual files are in svg-components/
const indexLines = [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  '// Individual glyph components live in ./svg-components/ and are loaded lazily by Glyph.tsx.',
  'export {}',
]
writeFileSync(indexFile, indexLines.join('\n') + '\n')

// Native barrel index — named re-exports for static Metro resolution
const nativeIndexLines = [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  ...nativeExports.map(compName => `export { default as ${compName} } from './${compName}'`),
]
writeFileSync(join(nativeComponentsDir, 'index.ts'), nativeIndexLines.join('\n') + '\n')

// Native lookup — static switch so Metro can resolve each path individually
// without bundling all 396 at module load time (unlike import *)
const lookupLines = [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  "import type { ViewStyle } from 'react-native'",
  'type GlyphFC = React.ComponentType<{ size?: number; color?: string; style?: ViewStyle }>',
  'export function lookupNativeGlyph(name: string): GlyphFC | null {',
  '  switch (name) {',
  ...nativeExports.map(compName =>
    `    case '${compName}': return require('./${compName}').default`
  ),
  '    default: return null',
  '  }',
  '}',
]
writeFileSync(join(nativeComponentsDir, 'lookup.ts'), lookupLines.join('\n') + '\n')

console.log(`✓ Generated ${exports.length} web glyph components → src/glyphs/svg-components/`)
console.log(`✓ Generated ${nativeExports.length} native glyph components → src/glyphs/svg-components-native/`)
if (nativeSkipped > 0) console.log(`  (${nativeSkipped} skipped for native: use <g> or <text>)`)
console.log(`✓ Updated GlyphComponents.tsx and svg-components-native/index.ts`)
