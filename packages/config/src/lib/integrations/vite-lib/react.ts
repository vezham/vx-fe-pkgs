import react from '@vitejs/plugin-react-swc'
import { mergeConfig } from 'vite'

import type { ViteConfigOverrides } from '../vite'
import { defineConfig as defineLibraryConfig } from './index'

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineLibraryConfig(async env => {
    const resolved =
      typeof overrides === 'function' ? await overrides(env) : overrides
    return mergeConfig({ plugins: [react()] }, resolved)
  })
