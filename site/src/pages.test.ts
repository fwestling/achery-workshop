import { describe, expect, it } from 'vitest'
import { findPage, normalisePath, PAGES } from './pages'

describe('normalisePath', () => {
  it('maps prerendered file paths and trailing slashes to page paths', () => {
    expect(normalisePath('/')).toBe('/')
    expect(normalisePath('/index.html')).toBe('/')
    expect(normalisePath('/tokens/')).toBe('/tokens')
    expect(normalisePath('/tokens/index.html')).toBe('/tokens')
  })
})

describe('PAGES', () => {
  it('has unique paths, each findable', () => {
    const paths = PAGES.map((p) => p.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const page of PAGES) expect(findPage(page.path)).toBe(page)
  })

  it('returns nothing for unknown paths', () => {
    expect(findPage('/nope')).toBeUndefined()
  })
})
