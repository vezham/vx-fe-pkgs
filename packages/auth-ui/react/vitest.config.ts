import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

import { defineConfig } from '@vezham/config/vitest/react'

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  test: {
    // vx-bot/NOTE: Clipboard access and avatar image compression require real browser APIs.
    fileParallelism: false,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotDirectory: '.vitest-attachments/screenshots'
    }
  }
})
