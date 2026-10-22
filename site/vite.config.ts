import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { storyIndexPlugin } from './plugins/storyIndex'

const src = (path: string) => fileURLToPath(new URL(`../src/${path}`, import.meta.url))
const site = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    storyIndexPlugin({ repoRoot: fileURLToPath(new URL('..', import.meta.url)), dir: src('native') }),
  ],
  resolve: {
    // The site renders achery-ui from source, not dist/, so a docs change ships with the code it describes.
    // Exact matches, so `achery-ui/tokens` isn't caught by the `achery-ui` rule.
    alias: [
      { find: /^achery-ui$/, replacement: src('index.ts') },
      { find: /^achery-ui\/tokens$/, replacement: src('tokens/index.ts') },
      { find: /^achery-ui\/native$/, replacement: src('native/index.ts') },
      // Native components render in the browser through react-native-web
      { find: /^react-native$/, replacement: 'react-native-web' },
      // react-native-svg and react-native-safe-area-context import this for their native view specs
      {
        find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
        replacement: site('native/codegenNativeComponent.ts'),
      },
      // …except the native glyph loader, which require()s .svg files for Metro (see src/native/nativeGlyphs.tsx)
      { find: /^(\.\.\/)+glyphs\/nativeLookup$/, replacement: site('native/nativeGlyphs.tsx') },
    ],
    // react-native-web's convention: a `.web` file wins over its native sibling (react-native-svg ships both)
    extensions: ['.web.tsx', '.web.ts', '.web.mjs', '.web.js', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    // Resolved from the site, whoever imports them: ../src would otherwise find the root package's copies
    // (or, for react-native-web, nothing), and React must be one instance
    dedupe: ['react', 'react-dom', 'react-native-web', 'react-native-svg', 'react-native-safe-area-context'],
  },
  define: {
    // React Native libraries read this global; Metro defines it, Vite doesn't
    __DEV__: JSON.stringify(mode !== 'production'),
  },
  server: {
    port: 5190,
    fs: {
      // ../src and the root docs live outside the site folder
      allow: ['..'],
    },
  },
  ssr: {
    // Bundle the library source so the prerender runs in plain Node, and the React Native packages so the
    // react-native → react-native-web alias reaches their imports too
    noExternal: ['achery-ui', 'react-native-web', 'react-native-svg', 'react-native-safe-area-context'],
    // Vite's documented SSR default, set explicitly: under Vitest the React Native packages otherwise resolved
    // to their CommonJS `main`, whose require('react-native') the alias can't reach
    resolve: { mainFields: ['module', 'jsnext:main', 'jsnext'] },
  },
}))
