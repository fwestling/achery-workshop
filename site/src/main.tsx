import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto-slab/400.css'
import '@fontsource/roboto-slab/700.css'
import '@fontsource/roboto-slab/900.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import './site.css'
import { RouterProvider } from '@tanstack/react-router'
import { createAppRouter } from './router'

// achery-ui's styles come with its source (vanilla-extract compiles each .css.ts it imports), so there's no
// achery-ui/style.css import here as there is in a consumer app.
//
// Pages are prerendered for crawlers, link previews and no-JS readers. The client renders afresh rather
// than hydrating: the theme comes from the visitor's stored or system preference, which the build can't
// know. From then on the router moves between pages without reloading.
const router = createAppRouter()
const root = document.getElementById('root')!
root.replaceChildren()
createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
