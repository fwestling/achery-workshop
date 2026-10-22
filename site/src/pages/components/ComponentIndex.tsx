import { PageIntro } from '../../components/Prose'
import { componentDocs } from '../../content'
import { firstSentence } from '../../pages'
import { COMPONENTS } from '../../stories/registry'

const GROUPS = [...new Set(COMPONENTS.map((c) => c.group))].sort()

export const ComponentIndex = () => (
  <>
    <PageIntro title="Components">
      <p>
        Every web component in <code>achery-ui</code>, with its Storybook examples rendered live: switch
        the theme, accent, dial and material on each page. The API under each comes from{' '}
        <code>COMPONENTS.md</code>.
      </p>
    </PageIntro>
    {GROUPS.map((group) => (
      <section key={group} aria-labelledby={`group-${group}`}>
        <h2 id={`group-${group}`}>{group}</h2>
        <ul className="component-grid">
          {COMPONENTS.filter((c) => c.group === group).map((c) => (
            <li key={c.slug}>
              <a className="component-card" href={`/components/${c.slug}`}>
                <span className="component-card__name">{c.name}</span>
                <span className="component-card__summary">
                  {firstSentence(c.description ?? componentDocs(c.sections))}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </>
)
