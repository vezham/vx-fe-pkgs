import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { nitro } from 'nitro/vite'

import { defineConfig } from '@vezham/config/presets/app'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tanstackStart(),
    tailwindcss(),
    react(),
    nxReadySignal()
  ]
})
