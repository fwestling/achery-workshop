#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'

const svgDir = new URL('../src/glyphs/svg', import.meta.url).pathname
const outFile = new URL('../src/glyphs/GlyphComponents.tsx', import.meta.url).pathname

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

const lines = [
  '// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-glyphs.mjs',
  "import type { SVGProps } from 'react'",
  '',
  'type P = SVGProps<SVGSVGElement>',
  '',
]

const exports = []

for (const file of files) {
  const name = basename(file, '.svg')
  const compName = toPascal(name)
  const raw = readFileSync(join(svgDir, file), 'utf8').trim()
  const jsx = svgToJsx(raw)
  lines.push(`export function ${compName}(props: P) { return ${jsx} }`)
  exports.push({ name, compName })
}

writeFileSync(outFile, lines.join('\n') + '\n')
console.log(`Generated ${files.length} glyph components → src/glyphs/GlyphComponents.tsx`)
