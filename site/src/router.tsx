import { useEffect } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
  Outlet,
  useRouter,
  useRouterState,
  type RouteComponent,
  type RouterHistory,
} from '@tanstack/react-router'
import { AcheryProvider } from 'achery-ui'
import { Layout } from './components/Layout'
import { findPage, normalisePath, PAGES, type PageId } from './pages'
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
import { NativeIndex } from './pages/components/NativeIndex'
import { findComponent } from './stories/registry'

// The shell (app bar and sidebar) is the root route; each page renders in its <Outlet />, so moving
// between pages swaps only the content: no reload, and the sidebar keeps its place.

const NOT_FOUND_TITLE = 'Page not found — Achery Workshop'

const NotFound = () => (
  <article className="doc">
    <h1>Page not found</h1>
    <p>
      That page doesn't exist. <a href="/">Back to the start</a>.
    </p>
  </article>
)

/** The prerendered page sets <title> and the description; client-side navigation keeps them in step. */
const useDocumentHead = (path: string) =>
  useEffect(() => {
    const page = findPage(path)
    document.title = page?.title ?? NOT_FOUND_TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', page?.description ?? '')
  }, [path])

/**
 * Links that aren't router <Link>s (rendered markdown, cards, Buttons with href) navigate through the
 * router too, when they point at a page of this site. Anything else (other sites, new tabs, modified
 * clicks, hash jumps within the page) is left to the browser.
 */
const useRoutedLinks = () => {
  const router = useRouter()
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = e.target instanceof Element ? e.target.closest('a') : null
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.hash) return
      if (!findPage(url.pathname)) return
      e.preventDefault()
      const hash = url.hash.slice(1)
      void router.navigate({ to: normalisePath(url.pathname), ...(hash ? { hash } : {}) })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])
}

const Shell = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const path = normalisePath(pathname)
  useDocumentHead(path)
  useRoutedLinks()
  return (
    // The workshop wears Achery's own accent until the visitor picks another (stored by AcheryProvider)
    <AcheryProvider defaultAccent="terracotta">
      <Layout path={path}>
        <Outlet />
      </Layout>
    </AcheryProvider>
  )
}

const rootRoute = createRootRoute({ component: Shell, notFoundComponent: NotFound })

const PAGE_COMPONENTS: Record<Exclude<PageId, 'component'>, RouteComponent> = {
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
  native: NativeIndex,
}

const pageRoutes = PAGES.flatMap((page) =>
  page.id === 'component'
    ? []
    : [createRoute({ getParentRoute: () => rootRoute, path: page.path, component: PAGE_COMPONENTS[page.id] })],
)

/** /components/<slug> and /native/<slug>: one route each, the page found in the story registry */
const componentRoute = (prefix: 'components' | 'native') => {
  const route = createRoute({
    getParentRoute: () => rootRoute,
    path: `/${prefix}/$slug`,
    beforeLoad: ({ params }) => {
      if (!findComponent(`/${prefix}/${params.slug}`)) throw notFound()
    },
    component: () => {
      const { slug } = route.useParams()
      return <ComponentPage path={`/${prefix}/${slug}`} />
    },
  })
  return route
}

const routeTree = rootRoute.addChildren([...pageRoutes, componentRoute('components'), componentRoute('native')])

/** Browser history by default; the prerender passes a memory history at the page's path. */
export const createAppRouter = (history?: RouterHistory) =>
  createRouter({
    routeTree,
    ...(history ? { history, isServer: true } : {}),
    // A new page starts at the top; back and forward return to where you were
    scrollRestoration: true,
  })
