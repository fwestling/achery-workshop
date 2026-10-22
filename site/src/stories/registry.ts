import type { StoryMeta, StoryModule } from './csf'

// One component page per story module. Metas load eagerly (titles and descriptions are needed for the
// nav and the prerender); a page's stories and raw text load when it's opened.

const metas = import.meta.glob<StoryMeta>('../../../src/**/*.stories.tsx', { eager: true, import: 'default' })
const modules = import.meta.glob<StoryModule>('../../../src/**/*.stories.tsx')
const raws = import.meta.glob<string>('../../../src/**/*.stories.tsx', { query: '?raw', import: 'default' })

/** Story modules that aren't a component: the foundation pages cover them. */
const NOT_COMPONENTS = [/^Tokens\//, /^Primitives\/GlyphGallery$/]

/** Pages whose name or COMPONENTS.md sections differ from the story title's last segment. */
const OVERRIDES: Record<string, { name?: string; sections?: string[] }> = {
  SingleCombobox: { name: 'Combobox', sections: ['Combobox', 'SingleCombobox'] },
  Input: { name: 'Form inputs', sections: ['Form inputs'] },
}

/** The three globs share their keys; a missing one means the globs disagree, which is a bug worth a loud failure. */
const loader = <T,>(globbed: Record<string, () => Promise<T>>, path: string): (() => Promise<T>) => {
  const load = globbed[path]
  if (!load) throw new Error(`No story module loader for ${path}`)
  return load
}

export interface ComponentEntry {
  /** Display name: "Button", "Form inputs" */
  name: string
  slug: string
  /** Story group: "Primitives", "Overlays"… */
  group: string
  /** The meta's docs description (markdown), if it has one */
  description?: string
  /** COMPONENTS.md headings documenting it */
  sections: string[]
  /** Its folder in the repo, e.g. `src/components/Button` */
  sourceDir: string
  load: () => Promise<{ module: StoryModule; raw: string }>
}

export const slugify = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

export const COMPONENTS: ComponentEntry[] = Object.entries(metas)
  .filter(([, meta]) => !NOT_COMPONENTS.some((re) => re.test(meta.title)))
  .map(([path, meta]) => {
    const [group = 'Components', titleName = meta.title] = meta.title.split('/')
    const override = OVERRIDES[titleName] ?? {}
    const name = override.name ?? titleName
    const description = meta.parameters?.docs?.description?.component
    const loadModule = loader(modules, path)
    const loadRaw = loader(raws, path)
    return {
      name,
      slug: slugify(name),
      group,
      ...(description ? { description } : {}),
      sections: override.sections ?? [titleName],
      sourceDir: path.replace(/^(\.\.\/)+/, '').replace(/\/[^/]+$/, ''),
      load: async () => ({ module: await loadModule(), raw: await loadRaw() }),
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export const findComponent = (slug: string): ComponentEntry | undefined => COMPONENTS.find((c) => c.slug === slug)
