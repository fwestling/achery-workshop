import type { Meta, StoryObj } from '@storybook/react'
import { Display, Heading, Body, Mono } from './Typography'

const meta = {
  title: 'Primitives/Typography',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: 'Four components covering the full type scale. `Display` uses IM Fell English (serif) for editorial headings. `Heading` renders the correct `<h1>`–`<h5>` element at the matching size. `Body` handles paragraph text in three sizes. `Mono` renders Space Mono for code, measurements, and IDs.',
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Display>Display — Shop sign</Display>
      <Heading level={1}>Heading 1 — Page title</Heading>
      <Heading level={2}>Heading 2 — Section heading</Heading>
      <Heading level={3}>Heading 3 — Subsection</Heading>
      <Heading level={4}>Heading 4 — Card heading</Heading>
      <Heading level={5}>Heading 5 — Eyebrow label</Heading>
      <Body variant="lead">Lead paragraph — A deck or introduction line at 16px.</Body>
      <Body>Body — Default paragraph text at 14px. The workshop doesn't bounce.</Body>
      <Body variant="small">Small body — Secondary descriptive text.</Body>
      <Mono>Mono — Tabular data, code, timestamps, keybinds</Mono>
      <Mono variant="small">Mono small — Footnotes, version strings, metadata</Mono>
    </div>
  ),
}

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {([1, 2, 3, 4, 5] as const).map(level => (
        <Heading key={level} level={level}>Heading {level}</Heading>
      ))}
    </div>
  ),
}

export const InlineElements: Story = {
  name: 'Inline elements — links, code, selection',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
      <Body>
        Bare links inherit the page fg with an accent underline:{' '}
        <a href="#">iron-gall ink</a> and <a href="#">oak gall tannin</a>.
        On hover the fg flips to accent and the underline to fg.
      </Body>
      <Body>
        Inline <code>code</code> sits on a sunken background with a muted border.
        Keyboard shortcut: <kbd>⌘K</kbd>.
      </Body>
      <Body>
        Select this text to check the{' '}
        <span style={{ background: 'var(--achery-color-selectionBg)', color: 'var(--achery-color-selectionFg)', padding: '0 2px' }}>
          selection colour
        </span>{' '}
        — ochre bg, ink fg in light mode.
      </Body>
    </div>
  ),
}
