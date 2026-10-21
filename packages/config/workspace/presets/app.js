import { loadConfig } from '../loader.cjs'

export const { defineConfig, getPrerenderPages } = loadConfig(
  '../src/lib/presets/app/index'
)
