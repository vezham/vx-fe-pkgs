import { loadConfig } from '../loader.cjs'

export const {
  docsMdx,
  docsMdxMacroImportAlias,
  defineConfig,
  resolveDocsConfig,
  loadVxDocsConfig,
  generateDocs,
  generateDocsOgImages,
  getDocsStaticPaths,
  getDocsPrerenderPages,
  getPrerenderPages
} = loadConfig('../src/lib/presets/docs')
