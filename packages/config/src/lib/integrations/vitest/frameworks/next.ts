import { type ViteConfigOverrides } from '../../vite/index'
import { defineTestConfig } from '../shared'

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineTestConfig('next', overrides)
