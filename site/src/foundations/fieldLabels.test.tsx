import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Field, Input, Select, Textarea } from 'achery-ui'

/** The `for` of the field's label and the `id` of the first control, from rendered HTML. */
const association = (html: string) => {
  const labelFor = /<label[^>]*\bfor="([^"]+)"/.exec(html)?.[1]
  const controlId = /<(?:input|select|textarea)[^>]*\bid="([^"]+)"/.exec(html)?.[1]
  return { labelFor, controlId }
}

describe('Field labels name their control', () => {
  it('points the label at a control that has no id of its own', () => {
    for (const control of [<Input />, <Select><option>a</option></Select>, <Textarea />]) {
      const { labelFor, controlId } = association(renderToStaticMarkup(<Field label="Name">{control}</Field>))
      expect(labelFor).toBeDefined()
      expect(controlId).toBe(labelFor)
    }
  })

  it('points the label at a control’s own explicit id', () => {
    // Regression: the control kept its explicit id (as documented) but the label
    // still pointed at the generated one, leaving the control unnamed.
    const { labelFor, controlId } = association(renderToStaticMarkup(<Field label="Root"><Input id="add-root-field" /></Field>))
    expect(controlId).toBe('add-root-field')
    expect(labelFor).toBe('add-root-field')
  })

  it('describes the control with the hint, under an explicit id too', () => {
    const html = renderToStaticMarkup(<Field label="Root" hint="Leave blank for a draft"><Input id="add-root-field" /></Field>)
    const describedBy = /<input[^>]*\baria-describedby="([^"]+)"/.exec(html)?.[1]
    expect(describedBy).toBeDefined()
    expect(html).toContain(`id="${describedBy}"`)
  })
})
