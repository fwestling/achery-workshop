import nativeIndex from 'virtual:native-story-index'
import type { StoryMeta, StoryModule } from './csf'

// One component page per story module. Metas load eagerly (titles and descriptions are needed for the
// nav and the prerender); a page's stories and raw text load when it's opened.
//
// Web stories live beside their components in src/components and src/glyphs. Native stories live in
// src/native/components and render through react-native-web (see vite.config.ts). The token stories are
// covered by the foundation pages. (import.meta.glob needs its patterns written out literally.)

const webMetas = import.meta.glob<StoryMeta>(
  ['../../../src/**/*.stories.tsx', '!../../../src/native/**', '!../../../src/tokens/**'],
  { eager: true, import: 'default' },
)
const webModules = import.meta.glob<StoryModule>([
  '../../../src/**/*.stories.tsx',
  '!../../../src/native/**',
  '!../../../src/tokens/**',
])
const webRaws = import.meta.glob<string>(
  ['../../../src/**/*.stories.tsx', '!../../../src/native/**', '!../../../src/tokens/**'],
  { query: '?raw', import: 'default' },
)

// Native titles and descriptions come from a build-time index rather than importing the stories, which
// would put react-native-web on every page (plugins/storyIndex.ts)
const nativeMetas: Record<string, Pick<StoryMeta, 'title' | 'parameters'>> = Object.fromEntries(
  nativeIndex.map(({ file, title, description }) => [
    `../../../${file}`,
    description ? { title, parameters: { docs: { description: { component: description } } } } : { title },
  ]),
)
const nativeModules = import.meta.glob<StoryModule>('../../../src/native/**/*.stories.tsx')
const nativeRaws = import.meta.glob<string>('../../../src/native/**/*.stories.tsx', {
  query: '?raw',
  import: 'default',
})

/** Story modules that aren't a component page: the Glyphs foundation page covers the gallery. */
const NOT_COMPONENTS = [/^Primitives\/GlyphGallery$/]

/**
 * Pages whose name or documentation differ from the story title's last segment. `sections` are
 * COMPONENTS.md headings (web); `docKey` is the backticked name its React Native table row starts with.
 */
const OVERRIDES: Record<string, { name?: string; sections?: string[]; docKey?: string }> = {
  'Components/SingleCombobox': { name: 'Combobox', sections: ['Combobox', 'SingleCombobox'] },
  'Primitives/Input': { name: 'Form inputs', sections: ['Form inputs'] },
  'Native/FormInputs': { name: 'Form inputs', docKey: 'Field' },
  'Native/ConfirmDialog': { docKey: 'ConfirmDialogProvider' },
  'Native/Toast': { docKey: 'ToastProvider' },
}

export type Platform = 'web' | 'native'

export interface ComponentEntry {
  platform: Platform
  /** Display name: "Button", "Form inputs" */
  name: string
  slug: string
  /** Page path: /components/<slug> or /native/<slug> */
  path: string
  /** Story group: "Primitives", "Overlays"… ("Native" for every native page) */
  group: string
  /** The meta's docs description (markdown), if it has one */
  description?: string
  /** Web: the COMPONENTS.md headings documenting it */
  sections: string[]
  /** Native: the backticked name its COMPONENTS.md table row and section start with */
  docKey: string
  /** Its folder in the repo, e.g. `src/components/Button` */
  sourceDir: string
  load: () => Promise<{ module: StoryModule; raw: string }>
}

export const slugify = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

/** The globs share their keys; a missing one means they disagree, which is a bug worth a loud failure. */
const loader = <T,>(globbed: Record<string, () => Promise<T>>, path: string): (() => Promise<T>) => {
  const load = globbed[path]
  if (!load) throw new Error(`No story module loader for ${path}`)
  return load
}

const entries = (
  platform: Platform,
  metas: Record<string, Pick<StoryMeta, 'title' | 'parameters'>>,
  modules: Record<string, () => Promise<StoryModule>>,
  raws: Record<string, () => Promise<string>>,
): ComponentEntry[] =>
  Object.entries(metas)
    .filter(([, meta]) => !NOT_COMPONENTS.some((re) => re.test(meta.title)))
    .map(([path, meta]) => {
      const [group = 'Components', titleName = meta.title] = meta.title.split('/')
      const override = OVERRIDES[meta.title] ?? {}
      const name = override.name ?? titleName
      const slug = slugify(name)
      const description = meta.parameters?.docs?.description?.component
      const loadModule = loader(modules, path)
      const loadRaw = loader(raws, path)
      return {
        platform,
        name,
        slug,
        path: `/${platform === 'web' ? 'components' : 'native'}/${slug}`,
        group,
        ...(description ? { description } : {}),
        sections: override.sections ?? [titleName],
        docKey: override.docKey ?? titleName,
        sourceDir: path.replace(/^(\.\.\/)+/, '').replace(/\/[^/]+$/, ''),
        load: async () => ({ module: await loadModule(), raw: await loadRaw() }),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

export const COMPONENTS = entries('web', webMetas, webModules, webRaws)
export const NATIVE_COMPONENTS = entries('native', nativeMetas, nativeModules, nativeRaws)

export const findComponent = (path: string): ComponentEntry | undefined =>
  [...COMPONENTS, ...NATIVE_COMPONENTS].find((c) => c.path === path)
