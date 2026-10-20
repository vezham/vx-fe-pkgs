import react from '@vitejs/plugin-react-swc'

import { defineConfig } from '@vx/config/vite'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()]
})
