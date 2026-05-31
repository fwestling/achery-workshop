#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const svgDir = new URL('../src/glyphs/svg', import.meta.url).pathname
const componentsDir = new URL('../src/glyphs/svg-components', import.meta.url).pathname
const indexFile = new URL('../src/glyphs/GlyphComponents.tsx', import.meta.url).pathname

const files = readdirSync(svgDir).filter(f => f.endsWith('.svg')).sort()

// Convert kebab-case filename to PascalCase component name
function toPascal(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase())
}

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

mkdirSync(componentsDir, { recursive: true })

const exports = []

for (const file of files) {
  const name = basename(file, '.svg')
  const compName = toPascal(name)
  const raw = readFileSync(join(svgDir, file), 'utf8').trim()
  const jsx = svgToJsx(raw)

  // One file per glyph for lazy loading
  const content = [
    '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
    "import type { SVGProps } from 'react'",
    'type P = SVGProps<SVGSVGElement>',
    `export default function ${compName}(props: P) { return ${jsx} }`,
  ].join('\n') + '\n'

  writeFileSync(join(componentsDir, `${compName}.tsx`), content)
  exports.push({ name, compName })
}

// GlyphComponents.tsx — intentionally empty, individual files are in svg-components/
const indexLines = [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  '// Individual glyph components live in ./svg-components/ and are loaded lazily by Glyph.tsx.',
  'export {}',
]

writeFileSync(indexFile, indexLines.join('\n') + '\n')
console.log(`Generated ${files.length} individual glyph files → src/glyphs/svg-components/`)
console.log(`Updated GlyphComponents.tsx`)
