import react from '@vitejs/plugin-react-swc'
import { mergeConfig } from 'vite'

import { type ViteConfigOverrides } from '../vite/index'
import {
  defineConfig as defineLibraryConfig,
  definePackageConfig as definePackageLibraryConfig
} from './index'

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineLibraryConfig(async env => {
    const resolved =
      typeof overrides === 'function' ? await overrides(env) : overrides
    return mergeConfig(
      {
        plugins: [react()],
        build: {
          rolldownOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime']
          }
        }
      },
      resolved
    )
  })

export const definePackageConfig = (overrides: ViteConfigOverrides = {}) =>
  definePackageLibraryConfig(async env => {
    const resolved =
      typeof overrides === 'function' ? await overrides(env) : overrides
    return mergeConfig({ plugins: [react()] }, resolved)
  })
