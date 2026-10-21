import { loadConfig } from './loader.cjs'

export const {
  loadVxAppConfig,
  getMetadataFiles,
  generateMetadata,
  watchMetadata
} = loadConfig('../src/lib/metadata/index')
