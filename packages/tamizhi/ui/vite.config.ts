import { cpSync, mkdirSync } from 'node:fs'
import path from 'node:path'

import { defineConfig } from '@vezham/config/vite-lib/react'

export default defineConfig({
  root: import.meta.dirname,
  base: './',
  build: { lib: { entry: path.join(import.meta.dirname, 'src/index.ts') } },
  plugins: [
    {
      name: 'tamizhi:avatar-licenses',
      closeBundle() {
        for (const file of [
          'momo-LICENSE.md',
          'README.md',
          'vendor/meshoptimizer-LICENSE.md'
        ]) {
          const relative = `lib/vendor/momo/${file}`
          const target = path.join(import.meta.dirname, 'dist', relative)
          mkdirSync(path.dirname(target), { recursive: true })
          cpSync(path.join(import.meta.dirname, 'src', relative), target)
        }
      }
    }
  ]
})
