#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const svgDir = new URL('../src/glyphs/svg', import.meta.url).pathname
const componentsDir = new URL('../src/glyphs/svg-components', import.meta.url).pathname
const indexFile = new URL('../src/glyphs/GlyphComponents.tsx', import.meta.url).pathname
const nativeLookupFile = new URL('../src/glyphs/nativeLookup.ts', import.meta.url).pathname

const files = readdirSync(svgDir).filter(f => f.endsWith('.svg')).sort()

// Convert kebab-case filename to PascalCase component name
function toPascal(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())
}

// ─── Web generation ───────────────────────────────────────────────────────────

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

// ─── Run generation ───────────────────────────────────────────────────────────

mkdirSync(componentsDir, { recursive: true })

const glyphNames = []

for (const file of files) {
  const name = basename(file, '.svg')
  const compName = toPascal(name)
  const raw = readFileSync(join(svgDir, file), 'utf8').trim()

  // Web component
  const jsx = svgToJsx(raw)
  const webContent = [
    '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
    "import type { SVGProps } from 'react'",
    'type P = SVGProps<SVGSVGElement>',
    `export default function ${compName}(props: P) { return ${jsx} }`,
  ].join('\n') + '\n'
  writeFileSync(join(componentsDir, `${compName}.tsx`), webContent)
  glyphNames.push({ name, compName })
}

// GlyphComponents.tsx — intentionally empty, individual files are in svg-components/
writeFileSync(indexFile, [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  '// Individual glyph components live in ./svg-components/ and are loaded lazily by Glyph.tsx.',
  'export {}',
].join('\n') + '\n')

// Native lookup — static switch pointing at raw .svg files.
// react-native-svg-transformer (configured in the consumer's metro.config.js)
// transforms each .svg into a react-native-svg component at bundle time.
// Metro can statically analyse these require() calls because the path prefix is constant.
writeFileSync(nativeLookupFile, [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  "import type { ViewStyle } from 'react-native'",
  'type GlyphFC = React.ComponentType<{ width?: number; height?: number; color?: string; style?: ViewStyle }>',
  'export function lookupNativeGlyph(name: string): GlyphFC | null {',
  '  switch (name) {',
  ...glyphNames.map(({ compName, name }) =>
    `    case '${compName}': return require('./svg/${name}.svg').default`
  ),
  '    default: return null',
  '  }',
  '}',
].join('\n') + '\n')

console.log(`✓ Generated ${glyphNames.length} web glyph components → src/glyphs/svg-components/`)
console.log(`✓ Updated GlyphComponents.tsx`)
console.log(`✓ Updated src/glyphs/nativeLookup.ts (${glyphNames.length} entries → raw .svg files)`)
