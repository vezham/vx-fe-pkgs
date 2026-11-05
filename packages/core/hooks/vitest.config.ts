import { defineConfig } from '@vezham/config/vitest/react'

export default defineConfig({
  test: { setupFiles: [import.meta.dirname + '/test-setup.ts'] },
  root: import.meta.dirname
})
