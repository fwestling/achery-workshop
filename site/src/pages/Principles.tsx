import { PageIntro } from '../components/Prose'
import { docs, renderMarkdown } from '../content'

// Sections of src/docs/Styleguide.mdx, rendered as-is
const body = renderMarkdown(docs.principles)

export const Principles = () => (
  <>
    <PageIntro title="Principles">
      <p>Why Achery looks the way it does, and how its copy is written.</p>
    </PageIntro>
    <article className="doc" dangerouslySetInnerHTML={{ __html: body }} />
  </>
)
