import { type ViteConfigOverrides } from '../../vite'
import { defineTestConfig } from '../shared'

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineTestConfig('next', overrides)
