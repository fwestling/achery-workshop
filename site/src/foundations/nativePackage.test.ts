import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// achery-ui/native ships as source, so every file it imports has to be in package.json "files".
// 0.29.0 shipped a TagInput that imported src/tags, which wasn't, and the native entry failed to load.
const root = resolve(__dirname, '../../..')
const shipped: string[] = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).files

const isShipped = (path: string) =>
  !/\.stories\.tsx?$/.test(path) && shipped.some((entry) => path === entry || path.startsWith(`${entry}/`))

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(name) && !/\.(stories|test)\.tsx?$/.test(name) ? [path] : []
  })

const resolveImport = (from: string, spec: string) => {
  const base = resolve(dirname(from), spec)
  const found = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'].map((ext) => base + ext).find((p) => existsSync(p) && statSync(p).isFile())
  return found ? relative(root, found) : null
}

const relativeImports = (file: string) =>
  [...readFileSync(file, 'utf8').matchAll(/(?:from|import)\s+'(\.{1,2}\/[^']+)'/g)].map((m) => m[1] as string)

describe('achery-ui/native package contents', () => {
  const files = sourceFiles(join(root, 'src/native'))

  it('finds the native sources', () => {
    expect(files.length).toBeGreaterThan(20)
  })

  it('publishes every file the native sources import', () => {
    const missing = files.flatMap((file) =>
      relativeImports(file)
        .map((spec) => ({ from: relative(root, file), spec, to: resolveImport(file, spec) }))
        .filter(({ to }) => to === null || !isShipped(to)),
    )
    expect(missing).toEqual([])
  })
})
