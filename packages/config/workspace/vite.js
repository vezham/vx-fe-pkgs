import { loadConfig } from './loader.cjs'

export const {
  getProjectPackageName,
  getViteCacheDir,
  getViteConfig,
  createViteConfig,
  defineConfig
} = loadConfig('../src/lib/integrations/vite')
