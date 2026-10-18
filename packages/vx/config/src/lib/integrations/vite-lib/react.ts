import react from '@vitejs/plugin-react-swc'
import { mergeConfig } from 'vite'

import { type ViteConfigOverrides } from '../vite/index.ts'
import { defineConfig as defineLibraryConfig } from './index.ts'

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
