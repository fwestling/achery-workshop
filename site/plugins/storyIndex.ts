import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'
import type { Plugin } from 'vite'

// `virtual:native-story-index`: each native story file's title and description, read from its source at
// build time. The nav and the native index need them on every page, but importing the stories for them
// would put react-native-web and every native component in the main bundle. The stories themselves still
// load when their page opens. storyIndex.test.ts checks this against the real metas.

export interface StoryIndexEntry {
  /** Path from the repo root, e.g. `src/native/components/Button.stories.tsx` */
  file: string
  title: string
  description?: string
}

const VIRTUAL_ID = 'virtual:native-story-index'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

/** A string literal, a no-substitution template, or `'a' + 'b'` of those; anything else isn't static. */
const staticString = (node: ts.Expression): string | undefined => {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isParenthesizedExpression(node)) return staticString(node.expression)
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = staticString(node.left)
    const right = staticString(node.right)
    return left !== undefined && right !== undefined ? left + right : undefined
  }
  return undefined
}

const property = (obj: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined => {
  for (const p of obj.properties) {
    if (ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === name) {
      return p.initializer
    }
  }
  return undefined
}

const objectAt = (obj: ts.ObjectLiteralExpression | undefined, path: string[]): ts.ObjectLiteralExpression | undefined =>
  path.reduce<ts.ObjectLiteralExpression | undefined>((o, key) => {
    const value = o && property(o, key)
    return value && ts.isObjectLiteralExpression(value) ? value : undefined
  }, obj)

/** The object literal of `const meta = {…}` (with or without `satisfies`/`as`), the module's default export. */
const metaObject = (source: ts.SourceFile): ts.ObjectLiteralExpression | undefined => {
  let defaultName: string | undefined
  for (const s of source.statements) {
    if (ts.isExportAssignment(s) && !s.isExportEquals && ts.isIdentifier(s.expression)) defaultName = s.expression.text
  }
  for (const s of source.statements) {
    if (!ts.isVariableStatement(s)) continue
    for (const d of s.declarationList.declarations) {
      if (!ts.isIdentifier(d.name) || d.name.text !== defaultName || !d.initializer) continue
      let init: ts.Expression = d.initializer
      while (ts.isSatisfiesExpression(init) || ts.isAsExpression(init) || ts.isParenthesizedExpression(init)) {
        init = init.expression
      }
      if (ts.isObjectLiteralExpression(init)) return init
    }
  }
  return undefined
}

export const readStoryMeta = (file: string, text: string): StoryIndexEntry => {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const meta = metaObject(source)
  const titleExpr = meta && property(meta, 'title')
  const title = titleExpr && staticString(titleExpr)
  if (!title) throw new Error(`${file}: the default-exported meta needs a static \`title\``)
  const docs = objectAt(meta, ['parameters', 'docs', 'description'])
  const descExpr = docs && property(docs, 'component')
  const description = descExpr && staticString(descExpr)
  if (descExpr && description === undefined) throw new Error(`${file}: the description must be a static string`)
  return description ? { file, title, description } : { file, title }
}

const storyFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? storyFiles(join(dir, e.name)) : e.name.endsWith('.stories.tsx') ? [join(dir, e.name)] : [],
  )

/** Reads every story file under `dir`, with paths relative to `repoRoot`. */
export const buildStoryIndex = (repoRoot: string, dir: string): StoryIndexEntry[] =>
  storyFiles(dir)
    .sort()
    .map((path) => readStoryMeta(relative(repoRoot, path), readFileSync(path, 'utf8')))

export const storyIndexPlugin = ({ repoRoot, dir }: { repoRoot: string; dir: string }): Plugin => ({
  name: 'achery-native-story-index',
  resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
  load(id) {
    if (id !== RESOLVED_ID) return undefined
    const files = storyFiles(dir)
    for (const f of files) this.addWatchFile(f)
    return `export default ${JSON.stringify(buildStoryIndex(repoRoot, dir))}`
  },
})
