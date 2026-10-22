import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// The site's Vite config, so tests resolve achery-ui to ../src (not the workspace package's built dist/)
// and compile its vanilla-extract styles the same way the site does
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      name: 'site',
      environment: 'node',
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
)
