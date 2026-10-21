import path from 'node:path'
import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'

import {
  type ViteConfig,
  type ViteConfigOverrides,
  getViteConfig
} from '../vite/index'

export const getViteLibConfig = (projectRoot = process.cwd()): ViteConfig => ({
  ...getViteConfig(projectRoot),
  plugins: [
    dts({
      entryRoot: path.join(projectRoot, 'src'),
      tsconfigPath: path.join(projectRoot, 'tsconfig.lib.json')
    })
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      entry: path.join(projectRoot, 'src/index.ts'),
      fileName: 'index',
      formats: ['es']
    }
  }
})

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineViteConfig(async env => {
    const resolved =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const defaults = getViteLibConfig(
      path.resolve(resolved.root ?? process.cwd())
    )
    if (
      resolved.build?.lib &&
      resolved.build.lib.formats &&
      defaults.build?.lib
    ) {
      // vx-bot/NOTE: Vite concatenates arrays; explicit formats must replace the ESM default.
      delete defaults.build.lib.formats
    }
    return mergeConfig(defaults, resolved) as ViteConfig
  })
