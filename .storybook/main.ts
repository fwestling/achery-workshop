import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import remarkGfm from 'remark-gfm'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  // Web stories only. src/native has stories too, for React Native components; the documentation site
  // renders those through react-native-web, which this Storybook isn't set up for.
  stories: [
    '../src/**/*.mdx',
    '../src/components/**/*.stories.@(ts|tsx)',
    '../src/glyphs/**/*.stories.@(ts|tsx)',
    '../src/tokens/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      plugins: [
        vanillaExtractPlugin(),
        svgr({
          svgrOptions: {
            titleProp: true,
            typescript: false,
          },
        }),
      ],
    })
  },
}

export default config
