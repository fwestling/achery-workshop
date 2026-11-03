import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProgressBar } from 'achery-ui/native'

/** The progressbar element's opening tag, from rendered HTML. */
const bar = (html: string) => /<[^>]*role="progressbar"[^>]*>/.exec(html)?.[0] ?? ''

describe('ProgressBar (native)', () => {
  it('announces a determinate value, clamped to 0–100', () => {
    const tag = bar(renderToStaticMarkup(<ProgressBar value={140} accessibilityLabel="Upload" />))
    expect(tag).toContain('aria-valuenow="100"')
    expect(tag).toContain('aria-label="Upload"')
    expect(tag).not.toContain('aria-busy')
  })

  it('announces indeterminate as busy, with no value', () => {
    const tag = bar(renderToStaticMarkup(<ProgressBar indeterminate accessibilityLabel="Uploading" />))
    expect(tag).toContain('aria-busy="true"')
    expect(tag).toContain('aria-label="Uploading"')
    expect(tag).not.toContain('aria-valuenow')
  })
})
