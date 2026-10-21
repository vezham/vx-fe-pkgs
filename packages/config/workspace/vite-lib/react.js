import { loadConfig } from '../loader.cjs'

export const { defineConfig, definePackageConfig } = loadConfig(
  '../src/lib/integrations/vite-lib/react'
)
