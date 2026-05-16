import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    svgr({
      svgrOptions: {
        titleProp: true,
        svgo: true,
        typescript: false,
        svgoConfig: {
          plugins: [
            { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          ],
        },
      },
    }),
  ],
})
