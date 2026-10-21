import { definePackageConfig } from '@vezham/config/vite-lib'

export default definePackageConfig({
  root: import.meta.dirname,
  plugins: [
    {
      name: 'vezham:consumer-env',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('/lib/vite/env.ts')) return
        return code.replaceAll('import.meta.env', '__VEZHAM_CONSUMER_ENV__')
      },
      renderChunk(code) {
        return code.replaceAll('__VEZHAM_CONSUMER_ENV__', 'import.meta.env')
      }
    }
  ]
})
