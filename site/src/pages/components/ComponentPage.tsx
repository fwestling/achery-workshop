import { useEffect, useState } from 'react'
import { Eyebrow, Field, SegmentedControl, Select, type AccentColor, type AccentDial, type MaterialSignature } from 'achery-ui'
import { accentColorNames } from 'achery-ui/tokens'
import { SOURCE_URL } from '../../config'
import { componentDocs, renderMarkdown } from '../../content'
import { InlineMd } from '../../components/Prose'
import { StoryPreview, type PreviewSettings } from '../../components/StoryPreview'
import { parseStorySources, storyExports, storyNameFromExport, type StoryModule } from '../../stories/csf'
import { findComponent, type ComponentEntry } from '../../stories/registry'

const THEMES: { value: PreviewSettings['theme']; label: string }[] = [
  { value: 'page', label: 'Page' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const DIALS: AccentDial[] = ['underline', 'chrome', 'surface']
const MATERIALS: MaterialSignature[] = ['none', 'leather', 'wood', 'copper']

const isAccent = (v: string): v is AccentColor => (accentColorNames as readonly string[]).includes(v)
const isDial = (v: string): v is AccentDial => (DIALS as readonly string[]).includes(v)
const isMaterial = (v: string): v is MaterialSignature => (MATERIALS as readonly string[]).includes(v)

const Toolbar = ({ settings, onChange }: { settings: PreviewSettings; onChange: (s: PreviewSettings) => void }) => (
  <div className="preview-toolbar" role="group" aria-label="Preview settings">
    <div className="preview-toolbar__field">
      <span className="preview-toolbar__label" id="preview-theme">
        Theme
      </span>
      <div role="group" aria-labelledby="preview-theme">
        <SegmentedControl
          size="sm"
          options={THEMES}
          value={settings.theme}
          onChange={(theme) => theme && onChange({ ...settings, theme })}
        />
      </div>
    </div>
    <Field label="Accent">
      <Select
        value={settings.accent}
        onChange={(e) => {
          const v = e.target.value
          onChange({ ...settings, accent: v === 'page' ? 'page' : isAccent(v) ? v : settings.accent })
        }}
      >
        <option value="page">Page</option>
        {accentColorNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
    </Field>
    <Field label="Dial">
      <Select
        value={settings.dial}
        onChange={(e) => {
          const v = e.target.value
          onChange({ ...settings, dial: v === 'page' ? 'page' : isDial(v) ? v : settings.dial })
        }}
      >
        <option value="page">Page</option>
        {DIALS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>
    </Field>
    <Field label="Material">
      <Select
        value={settings.material}
        onChange={(e) => isMaterial(e.target.value) && onChange({ ...settings, material: e.target.value })}
      >
        {MATERIALS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
    </Field>
    <p className="preview-toolbar__note">Pop-ups, menus and dialogs open in the page's theme.</p>
  </div>
)

type Loaded = { module: StoryModule; raw: string }

const Stories = ({ entry }: { entry: ComponentEntry }) => {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [failed, setFailed] = useState<string | null>(null)
  const [settings, setSettings] = useState<PreviewSettings>({
    theme: 'page',
    accent: 'page',
    dial: 'page',
    material: 'none',
  })

  // Stories load in the browser only: they're interactive, and some open portals the prerender can't
  useEffect(() => {
    let live = true
    entry.load().then(
      (l) => live && setLoaded(l),
      (e: unknown) => live && setFailed(e instanceof Error ? e.message : String(e)),
    )
    return () => {
      live = false
    }
  }, [entry])

  if (failed) return <p role="alert">The examples failed to load: {failed}</p>
  if (!loaded) return <p className="stories__loading">Loading examples…</p>

  const meta = loaded.module.default
  const sources = parseStorySources(loaded.raw)
  // A module namespace lists its exports alphabetically; Storybook (and the reader) expect file order
  const order = [...sources.keys()]
  const position = (key: string) => (order.includes(key) ? order.indexOf(key) : order.length)
  const stories = storyExports(loaded.module).sort(([a], [b]) => position(a) - position(b))
  return (
    <>
      <Toolbar settings={settings} onChange={setSettings} />
      {stories.map(([key, story]) => (
        <StoryPreview
          key={key}
          id={`story-${key}`}
          name={story.name ?? storyNameFromExport(key)}
          meta={meta}
          story={story}
          source={sources.get(key)}
          settings={settings}
        />
      ))}
    </>
  )
}

export const ComponentPage = ({ slug }: { slug: string }) => {
  const entry = findComponent(slug)
  if (!entry) return null
  const api = renderMarkdown(componentDocs(entry.sections))
  return (
    <>
      <header className="page-intro">
        <Eyebrow>{entry.group}</Eyebrow>
        <h1>{entry.name}</h1>
        {entry.description && (
          <div className="page-intro__lead">
            <p>
              <InlineMd text={entry.description} />
            </p>
          </div>
        )}
        <p className="component-links">
          <a href={`${SOURCE_URL}/tree/main/${entry.sourceDir}`}>Source</a> ·{' '}
          <a href="#api">API</a>
        </p>
      </header>

      <section aria-labelledby="examples">
        <h2 id="examples">Examples</h2>
        <Stories entry={entry} />
      </section>

      <section aria-labelledby="api">
        <h2 id="api">API</h2>
        <p className="section-lead">
          From <code>COMPONENTS.md</code>.
        </p>
        <div className="doc" dangerouslySetInnerHTML={{ __html: api }} />
      </section>
    </>
  )
}
