import { defineConfig, devices } from '@playwright/test'

const backend = process.env['TAMIZHI_BACKEND_DIR']
if (!backend)
  throw new Error('Set TAMIZHI_BACKEND_DIR to the Go backend checkout')
export default defineConfig({
  testDir: '.',
  testMatch: 'browser.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  outputDir: '../../../../dist/tamizhi-browser-results',
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4399',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: [
        '--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required'
      ]
    }
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'node packages/tamizhi/ui/e2e/provider-fixture.mjs',
      cwd: '../../../../',
      url: 'http://127.0.0.1:4397/healthz',
      reuseExistingServer: false,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 }
    },
    {
      command: 'pnpm nx run tamizhi-core-go:browser-fixture',
      cwd: backend,
      url: 'http://127.0.0.1:4398/healthz',
      reuseExistingServer: false,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 },
      timeout: 120_000
    },
    {
      command: 'pnpm nx run tamizhi:dev --host=127.0.0.1 --port=4399',
      cwd: '../../../../',
      url: 'http://127.0.0.1:4399/chat/new',
      env: {
        PORT: '4399',
        HOST_NAME: '127.0.0.1',
        V_TAMIZHI_API_URL: 'http://127.0.0.1:4398/api/tamizhi'
      },
      reuseExistingServer: false,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 },
      timeout: 120_000
    }
  ]
})
