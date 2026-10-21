import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { describe, expect, it } from 'vitest'

import { getViteCacheDir } from '../vite'
import { defineConfig } from './base'

const env: ConfigEnv = { command: 'build', mode: 'production' }

const resolveConfig = async (overrides: Parameters<typeof defineConfig>[0]) => {
  const config = defineConfig(overrides)
  return typeof config === 'function' ? config(env) : await config
}

describe('Vite library defaults', () => {
  it('uses the package root for cache, entry, and declaration generation', async () => {
    const root = path.resolve('fixture-library')
    const config = await resolveConfig({ root })

    expect(config.root).toBe(root)
    expect(config.cacheDir).toBe(getViteCacheDir(root))
    expect(config.build).toMatchObject({
      outDir: './dist',
      emptyOutDir: true,
      lib: {
        entry: path.join(root, 'src/index.ts'),
        fileName: 'index',
        formats: ['es']
      }
    })
    expect(config.plugins).toContainEqual(
      expect.objectContaining({ name: 'vite:dts' })
    )
  })

  it('preserves async library overrides and framework plugins', async () => {
    const plugin = { name: 'fixture-framework' }
    const config = await resolveConfig(async () => ({
      plugins: [plugin],
      build: {
        outDir: 'custom-dist',
        lib: { entry: 'src/custom.ts', fileName: 'custom', formats: ['cjs'] },
        rolldownOptions: { external: ['react'] }
      }
    }))

    expect(config.plugins).toContainEqual(plugin)
    expect(config.build).toMatchObject({
      outDir: 'custom-dist',
      lib: { entry: 'src/custom.ts', fileName: 'custom', formats: ['cjs'] },
      rolldownOptions: { external: ['react'] }
    })
  })
})
