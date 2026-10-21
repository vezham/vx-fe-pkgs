import { loadConfig } from './loader.cjs'

export const { definePackageConfig, getViteLibConfig, defineConfig } =
  loadConfig('../src/lib/integrations/vite-lib/index')
