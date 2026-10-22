import { Button, Display, Eyebrow } from 'achery-ui'
import { description, version } from '../../../package.json'
import { NPM_URL, SOURCE_URL } from '../config'
import { docs, renderMarkdown } from '../content'

const gettingStarted = renderMarkdown(docs.gettingStarted)

export const Home = () => (
  <>
    {/* The page's h1 is the Getting Started heading below; the site name here is display type, not a heading */}
    <section className="hero">
      <Eyebrow>achery-ui · v{version}</Eyebrow>
      <Display className="hero__title">Achery Workshop</Display>
      <p className="lead">{description}</p>
      <div className="cta-row">
        <Button href="/components" variant="accent" glyph="grid">
          Browse components
        </Button>
        <Button href={NPM_URL} variant="secondary" glyph="box">
          npm package
        </Button>
        <Button href={SOURCE_URL} variant="ghost" glyph="book">
          Source on GitHub
        </Button>
      </div>
    </section>
    {/* src/docs/GettingStarted.mdx, rendered from the repo's own markdown */}
    <article className="doc" dangerouslySetInnerHTML={{ __html: gettingStarted }} />
  </>
)
