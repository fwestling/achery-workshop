import { Component, useMemo, useState, type ComponentType, type ErrorInfo, type ReactNode } from 'react'
import { Button, useTheme, type AccentColor, type AccentDial, type MaterialSignature } from 'achery-ui'
import { composeStory, type StoryAnnotations, type StoryMeta, type StorySource } from '../stories/csf'
import { InlineMd } from './Prose'
import { ThemeScope } from './ThemeScope'

/** What wraps each native story: NativeFrame, loaded only on native pages so react-native-web stays off the rest */
export type NativeFrameComponent = ComponentType<{
  theme: 'light' | 'dark'
  accent: AccentColor
  dial: AccentDial
  material: MaterialSignature
  children: ReactNode
}>

export interface PreviewSettings {
  /** `page` follows the site's own theme */
  theme: 'page' | 'light' | 'dark'
  accent: AccentColor | 'page'
  dial: AccentDial | 'page'
  material: MaterialSignature
}

// One story that throws shouldn't take the rest of the page with it. Error boundaries have no hook form,
// so this is the one class component in the site.
class StoryBoundary extends Component<{ name: string; children: ReactNode }, { error: Error | null }> {
  override state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Story "${this.props.name}" failed to render`, error, info.componentStack)
  }

  override render() {
    return this.state.error ? (
      <p className="story__error" role="alert">
        This example failed to render: {this.state.error.message}
      </p>
    ) : (
      this.props.children
    )
  }
}

/** Stories that open a dialog as they mount would cover the page; they wait for a click instead. */
const opensOnMount = (code: string) => /\bdefaultOpen\b/.test(code)

interface StoryPreviewProps {
  id: string
  name: string
  meta: StoryMeta
  story: StoryAnnotations
  source: StorySource | undefined
  settings: PreviewSettings
  /** Native pages pass their frame; web stories render bare */
  NativeFrame?: NativeFrameComponent
}

export const StoryPreview = ({ id, name, meta, story, source, settings, NativeFrame }: StoryPreviewProps) => {
  const page = useTheme()
  const Story = useMemo(() => composeStory(meta, story), [meta, story])
  const [shown, setShown] = useState(() => !opensOnMount(source?.code ?? ''))
  const parameters = { ...meta.parameters, ...story.parameters }
  const material = parameters.globals?.material
  const scopeMaterial = settings.material !== 'none' ? settings.material : isMaterial(material) ? material : 'none'

  return (
    <section className="story" aria-labelledby={id}>
      <h3 id={id} className="story__name">
        {name}
      </h3>
      {source?.description && <InlineMd className="story__description" text={source.description} />}
      <ThemeScope
        {...(settings.theme !== 'page' ? { theme: settings.theme } : {})}
        {...(settings.accent !== 'page' ? { accent: settings.accent } : {})}
        {...(settings.dial !== 'page' ? { dial: settings.dial } : {})}
        material={scopeMaterial}
        className={`story__frame story__frame--${parameters.layout ?? 'padded'}`}
      >
        {shown ? (
          <StoryBoundary name={name}>
            {NativeFrame ? (
              <NativeFrame
                theme={settings.theme === 'page' ? page.theme : settings.theme}
                accent={settings.accent === 'page' ? page.accent : settings.accent}
                dial={settings.dial === 'page' ? page.dial : settings.dial}
                material={scopeMaterial}
              >
                <Story />
              </NativeFrame>
            ) : (
              <Story />
            )}
          </StoryBoundary>
        ) : (
          <div className="story__deferred">
            <p>This example opens a dialog as soon as it appears.</p>
            <Button size="sm" variant="secondary" onClick={() => setShown(true)}>
              Show example
            </Button>
          </div>
        )}
      </ThemeScope>
      {source && (
        <details className="story__code">
          <summary>Code</summary>
          <pre>
            <code>{source.code}</code>
          </pre>
        </details>
      )}
    </section>
  )
}

const MATERIALS: readonly string[] = ['none', 'leather', 'wood', 'copper']
const isMaterial = (value: unknown): value is MaterialSignature => typeof value === 'string' && MATERIALS.includes(value)
