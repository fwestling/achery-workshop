import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

// The site's Vite config, so tests resolve achery-ui to ../src (not the workspace package's built dist/)
// and compile its vanilla-extract styles the same way the site does
export default defineConfig((env) =>
  mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        name: 'site',
        environment: 'node',
        include: ['src/**/*.test.{ts,tsx}', 'plugins/**/*.test.ts'],
      // As ssr.noExternal does for the prerender: run these through Vite, so the react-native →
      // react-native-web alias reaches their own imports instead of Node loading React Native's Flow source
      server: { deps: { inline: ['react-native-web', 'react-native-svg', 'react-native-safe-area-context'] } },
      },
    }),
  ),
)
