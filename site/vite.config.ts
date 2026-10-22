import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

const src = (path: string) => fileURLToPath(new URL(`../src/${path}`, import.meta.url))

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    // The site renders achery-ui from source, not dist/, so a docs change ships with the code it describes.
    // Exact matches, so `achery-ui/tokens` isn't caught by the `achery-ui` rule.
    alias: [
      { find: /^achery-ui$/, replacement: src('index.ts') },
      { find: /^achery-ui\/tokens$/, replacement: src('tokens/index.ts') },
    ],
    // ../src resolves react from the root package, the site from its own; both must be one instance
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5190,
    fs: {
      // ../src and the root docs live outside the site folder
      allow: ['..'],
    },
  },
  ssr: {
    // Bundle the library source so the prerender runs in plain Node
    noExternal: ['achery-ui'],
  },
})
