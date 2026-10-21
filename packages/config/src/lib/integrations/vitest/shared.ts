import path from 'node:path'
import { mergeConfig } from 'vite'

import {
  type ViteConfigOverrides,
  defineConfig as defineViteConfig
} from '../vite/index'

export const defineTestConfig = (
  feature: 'react' | 'next' | 'docs',
  overrides: ViteConfigOverrides = {}
) =>
  defineViteConfig(async env => {
    const config =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const setupFiles = [
      path.join(
        import.meta.dirname,
        'setup/react' + (import.meta.url.endsWith('.ts') ? '.ts' : '.js')
      )
    ]
    if (feature === 'next')
      setupFiles.push(
        path.join(
          import.meta.dirname,
          'setup/next' + (import.meta.url.endsWith('.ts') ? '.ts' : '.js')
        )
      )
    const plugins = []
    if (feature === 'docs') {
      const { docsTestPlugins } = await import('./frameworks/docs-plugins')
      plugins.push(...docsTestPlugins())
    }
    return mergeConfig(
      {
        plugins,
        test: { environment: 'jsdom', setupFiles, fileParallelism: false }
      },
      config
    )
  })
