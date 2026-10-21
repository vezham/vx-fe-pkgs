import { loadConfig } from './loader.cjs'

export const { defineConfig, validateFramework, defineFrameworkTestConfig } =
  loadConfig('../src/lib/integrations/vitest')
