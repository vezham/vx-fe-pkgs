import { defineConfig } from '@vezham/config/vitest/react'

import { tamizhiProfilesPlugin } from './tools/generate-profiles'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [tamizhiProfilesPlugin(import.meta.dirname)]
})
