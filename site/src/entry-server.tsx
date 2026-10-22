import { renderToString } from 'react-dom/server'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { createAppRouter } from './router'

export { PAGES } from './pages'
export { SITE_URL } from './config'

/** One page's HTML: the router at that path, loaded, rendered once. */
export const render = async (path: string): Promise<string> => {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [path] }))
  await router.load()
  return renderToString(<RouterProvider router={router} />)
}
