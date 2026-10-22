import { createElement, type ComponentType, type ReactElement, type ReactNode } from 'react'

// The component pages render achery-ui's own Storybook stories (src/**/*.stories.tsx), so the examples on
// the site are the ones developers already maintain. This is a small renderer for the part of CSF3 those
// stories use: args, render, decorators and a few parameters. It keeps Storybook's runtime out of the
// public site. csf.test.ts fails if a story starts using anything this doesn't support (play, loaders…).

export type Args = Record<string, unknown>

export interface StoryContext {
  args: Args
  parameters: StoryParameters
}

type RenderFn = (args: Args, context: StoryContext) => ReactNode
type Decorator = (Story: ComponentType, context: StoryContext) => ReactElement

export interface StoryParameters {
  layout?: 'centered' | 'fullscreen' | 'padded'
  docs?: { description?: { component?: string; story?: string } }
  /** Not a Storybook option; a few stories set it to ask for a material. The site honours it. */
  globals?: { material?: string }
}

export interface StoryMeta {
  title: string
  component?: ComponentType<Args>
  args?: Args
  render?: RenderFn
  decorators?: Decorator[]
  parameters?: StoryParameters
}

export interface StoryAnnotations {
  name?: string
  args?: Args
  render?: RenderFn
  decorators?: Decorator[]
  parameters?: StoryParameters
}

/** A story written as a plain function (the older CSF form, used by Menu): it is the render. */
type StoryFn = (args: Args, context: StoryContext) => ReactNode

/** A `.stories.tsx` module: the meta as its default export, every named export a story (CSF). */
export interface StoryModule {
  default: StoryMeta
  // StoryMeta is in the union only because TypeScript checks `default` against the index signature too
  [exportName: string]: StoryAnnotations | StoryFn | StoryMeta
}

/**
 * The module's stories, in file order, function stories turned into `{ render }`. A function's own
 * `.name` is its export name, minified in production, so it's never taken as the story's name.
 */
export const storyExports = (module: StoryModule): [string, StoryAnnotations][] =>
  Object.entries(module)
    .filter(([key]) => key !== 'default')
    .map(([key, story]) => [key, typeof story === 'function' ? { render: story } : story])

/** `AllTones` → `All tones`, `WithURLParam` → `With URL param`: sentence case, acronyms kept. */
export const storyNameFromExport = (key: string): string => {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ')
  return words
    .map((w, i) => (i === 0 ? w : /^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase()))
    .join(' ')
}

/**
 * One story as a React component: args merged (meta, then story), rendered by the story's `render`, the
 * meta's, or the meta's component, then wrapped in its decorators: the story's innermost, as Storybook
 * does. Built once per story, so re-renders don't remount it.
 */
export const composeStory = (meta: StoryMeta, story: StoryAnnotations): ComponentType => {
  const args: Args = { ...meta.args, ...story.args }
  const parameters: StoryParameters = { ...meta.parameters, ...story.parameters }
  const context: StoryContext = { args, parameters }
  const render: RenderFn | undefined = story.render ?? meta.render
  const component = meta.component

  let Body: ComponentType
  if (render) Body = () => render(args, context)
  else if (component) Body = () => createElement(component, args)
  else throw new Error(`A story in "${meta.title}" has no render, and its meta no component`)

  return [...(story.decorators ?? []), ...(meta.decorators ?? [])].reduce<ComponentType>((Inner, decorate) => {
    const Decorated = () => decorate(Inner, context)
    return Decorated
  }, Body)
}

// ─── Reading the story file's text ───────────────────────────────────────────

export interface StorySource {
  /** The JSDoc comment above the export, which Storybook shows as the story's description */
  description?: string
  /** The export as written */
  code: string
}

const EXPORT = /^export const (\w+)\b/gm

/** Each story export's source and description, from the raw `.stories.tsx` text. */
export const parseStorySources = (raw: string): Map<string, StorySource> => {
  const starts = [...raw.matchAll(EXPORT)].map((m) => ({ key: m[1]!, index: m.index! }))
  const end = raw.search(/^export default\b/m)
  const sources = new Map<string, StorySource>()
  starts.forEach(({ key, index }, i) => {
    const nextExport = starts[i + 1]?.index ?? raw.length
    // The next export's JSDoc belongs to it, not to this story's code
    const between = raw.slice(index, nextExport).trimEnd()
    const next = between.endsWith('*/') ? index + between.lastIndexOf('/**') : nextExport
    const stop = end > index && end < next ? end : next
    const code = raw.slice(index, stop).trim()
    const before = raw.slice(0, index).trimEnd()
    const doc = before.endsWith('*/') ? before.slice(before.lastIndexOf('/**')) : ''
    const description = doc
      ? doc
          .replace(/^\/\*\*|\*\/$/g, '')
          .split('\n')
          .map((l) => l.replace(/^\s*\*\s?/, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()
      : ''
    sources.set(key, description ? { description, code } : { code })
  })
  return sources
}
