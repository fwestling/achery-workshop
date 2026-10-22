import { renderToString } from 'react-dom/server'
import { App } from './App'

export { PAGES } from './pages'
export { SITE_URL } from './config'

export const render = (path: string): string => renderToString(<App path={path} />)
