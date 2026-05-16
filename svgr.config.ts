import type { Config } from '@svgr/core'

const config: Config = {
  titleProp: true,
  svgo: true,
  typescript: false,
  svgoConfig: {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
    ],
  },
}

export default config
