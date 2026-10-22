import { PageIntro } from '../../components/Prose'
import { nativeComponentDocs, nativeOverviewDocs, renderMarkdown } from '../../content'
import { firstSentence } from '../../pages'
import { NATIVE_COMPONENTS } from '../../stories/registry'

// COMPONENTS.md's React Native section: intro, setup, accessibility, theme provider
const overview = renderMarkdown(nativeOverviewDocs())

export const NativeIndex = () => (
  <>
    <PageIntro title="React Native">
      <p>
        <code>achery-ui/native</code> is the same design system for React Native: the same tokens and theme
        axes, with components built on React Native primitives. The examples on these pages render through
        react-native-web, so they show layout, colour and behaviour; on a device, text uses the system font.
      </p>
    </PageIntro>

    <section aria-labelledby="native-components">
      <h2 id="native-components">Components</h2>
      <ul className="component-grid">
        {NATIVE_COMPONENTS.map((c) => (
          <li key={c.slug}>
            <a className="component-card" href={c.path}>
              <span className="component-card__name">{c.name}</span>
              <span className="component-card__summary">
                {firstSentence(c.description ?? nativeComponentDocs(c.docKey))}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>

    <div className="doc" dangerouslySetInnerHTML={{ __html: overview }} />
  </>
)
