import { useEffect, type ComponentType } from 'react'
import { AcheryProvider } from 'achery-ui'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Principles } from './pages/Principles'
import { Accents } from './pages/foundations/Accents'
import { Charts } from './pages/foundations/Charts'
import { Colour } from './pages/foundations/Colour'
import { Glyphs } from './pages/foundations/Glyphs'
import { Materials } from './pages/foundations/Materials'
import { Motion } from './pages/foundations/Motion'
import { Space } from './pages/foundations/Space'
import { Typography } from './pages/foundations/Typography'
import { ComponentIndex } from './pages/components/ComponentIndex'
import { ComponentPage } from './pages/components/ComponentPage'
import { findPage, type PageDef, type PageId } from './pages'

const PAGE_COMPONENTS: Record<Exclude<PageId, 'component'>, ComponentType> = {
  home: Home,
  principles: Principles,
  colour: Colour,
  accents: Accents,
  typography: Typography,
  space: Space,
  motion: Motion,
  materials: Materials,
  charts: Charts,
  glyphs: Glyphs,
  components: ComponentIndex,
}

const PageBody = ({ page }: { page: PageDef | undefined }) => {
  if (!page) return <NotFound />
  if (page.id === 'component') return <ComponentPage slug={page.componentSlug ?? ''} />
  const Page = PAGE_COMPONENTS[page.id]
  return <Page />
}

const NotFound = () => (
  <article className="doc">
    <h1>Page not found</h1>
    <p>
      That page doesn't exist. <a href="/">Back to the start</a>.
    </p>
  </article>
)

// main.tsx renders afresh over the prerendered page, which undoes the browser's jump to a #fragment on load.
// Jump again once the fresh render is in. (From ../achery-site/apps/site/src/App.tsx.)
const useJumpToHash = () =>
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

export const App = ({ path }: { path: string }) => {
  useJumpToHash()
  const page = findPage(path)
  return (
    // The workshop wears Achery's own accent until the visitor picks another (stored by AcheryProvider)
    <AcheryProvider defaultAccent="terracotta">
      <Layout path={page?.path ?? path}>
        <PageBody page={page} />
      </Layout>
    </AcheryProvider>
  )
}
