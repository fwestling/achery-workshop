import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button, Field, Input, ScreenNav, TagInput, Textarea } from 'achery-ui/native'

/** An element's opening tag, from rendered HTML (react-native-web maps accessibility props to aria-*). */
const tag = (html: string, pattern: RegExp) => pattern.exec(html)?.[0] ?? ''
const inputTag = (html: string) => tag(html, /<(?:input|textarea)[^>]*>/)

describe('Field (native) names its control', () => {
  it('names Input, Textarea and TagInput after its label', () => {
    for (const control of [<Input />, <Textarea />, <TagInput value={[]} onChange={() => {}} placeholder="Add a tag" />]) {
      expect(inputTag(renderToStaticMarkup(<Field label="Name">{control}</Field>))).toContain('aria-label="Name"')
    }
  })

  it('lets a control’s own label win', () => {
    const html = renderToStaticMarkup(<Field label="Name"><Input accessibilityLabel="Collection name" /></Field>)
    expect(inputTag(html)).toContain('aria-label="Collection name"')
  })

  it('leaves a control outside a Field as it was', () => {
    expect(inputTag(renderToStaticMarkup(<Input />))).not.toContain('aria-label')
    expect(inputTag(renderToStaticMarkup(<TagInput value={[]} onChange={() => {}} placeholder="Add a tag" />))).toContain('aria-label="Add a tag"')
  })
})

describe('ScreenNav (native)', () => {
  it('gives a symbol action a spoken name', () => {
    const html = renderToStaticMarkup(
      <ScreenNav title="Photo" onBack={() => {}} onAction={() => {}} actionLabel="⋯" actionAccessibilityLabel="More actions" />,
    )
    expect(html).toContain('aria-label="More actions"')
  })
})

describe('Button (native)', () => {
  it('announces extra state, with disabled still following the prop', () => {
    const html = renderToStaticMarkup(<Button accessibilityState={{ selected: true }} disabled>Verdigris</Button>)
    const button = tag(html, /<[^>]*role="button"[^>]*>/)
    expect(button).toContain('aria-selected="true"')
    expect(button).toContain('aria-disabled="true"')
  })
})
