/// <reference types='vitest' />
import react from '@vitejs/plugin-react'

import { defineConfig } from '@vezham/config/vitest'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()]
})
