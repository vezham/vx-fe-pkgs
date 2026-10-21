import { loadConfig } from '../loader.cjs'

export const { test, expect } = loadConfig(
  '../src/lib/integrations/playwright/test'
)
