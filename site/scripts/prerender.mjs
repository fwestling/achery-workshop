// Writes one static HTML file per page: dist/index.html, dist/<page>/index.html, …
// Runs after the client build (dist/) and the SSR build of src/entry-server.tsx (dist-ssr/).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, PAGES, SITE_URL } = await import(join(ssrDir, 'entry-server.js'))
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const head = (page) =>
  [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<link rel="canonical" href="${SITE_URL}${page.path}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Achery Workshop" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${SITE_URL}${page.path}" />`,
  ].join('\n    ')

const write = (path, html) => {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, html)
}

// Draft markers must never reach the public site. Production builds (SITE_STRICT=1, set in the Dockerfile) fail;
// local builds warn so the site can still be previewed while copy is unfinished.
const drafts = []

for (const page of PAGES) {
  const html = template.replace('<!--page-head-->', head(page)).replace('<!--page-html-->', render(page.path))
  const count = html.match(/\[PLACEHOLDER/g)?.length ?? 0
  if (count) drafts.push(`${page.path}: ${count} placeholder(s)`)
  const out = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.slice(1), 'index.html')
  write(out, html)
  console.log(`prerendered ${page.path}`)
}

const notFound = { path: '/404', title: 'Page not found — Achery Workshop', description: "That page doesn't exist." }
write(join(dist, '404.html'), template.replace('<!--page-head-->', head(notFound)).replace('<!--page-html-->', render('/404')))

rmSync(ssrDir, { recursive: true, force: true })

if (drafts.length) {
  const message = `Unfinished copy:\n  ${drafts.join('\n  ')}`
  if (process.env.SITE_STRICT === '1') {
    console.error(message)
    process.exit(1)
  }
  console.warn(`\nWARNING — ${message}\n`)
}
