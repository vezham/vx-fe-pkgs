import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { describe, expect, it } from 'vitest'

import { getViteCacheDir } from '../vite/index'
import { defineConfig, definePackageConfig } from './index'
import { defineConfig as defineReactConfig } from './react'

const env: ConfigEnv = { command: 'build', mode: 'production' }

const resolveConfig = async (overrides: Parameters<typeof defineConfig>[0]) => {
  const config = defineConfig(overrides)
  return typeof config === 'function' ? config(env) : await config
}

describe('Vite library preset', () => {
  it('builds source exports while keeping workspace loaders out of package entries', async () => {
    const root = mkdtempSync(path.join(tmpdir(), 'vezham-package-'))
    try {
      mkdirSync(path.join(root, 'src'))
      writeFileSync(path.join(root, 'src/index.ts'), 'export {}')
      writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify({
          name: '@vezham/fixture',
          exports: {
            '.': {
              types: './src/index.ts',
              default: './workspace/index.js'
            }
          }
        })
      )

      const factory = definePackageConfig({ root })
      const config = await (typeof factory === 'function'
        ? factory(env)
        : factory)

      expect(config.build?.lib).toMatchObject({
        entry: { index: path.join(root, 'src/index.ts') }
      })
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('adds React tooling and externals while preserving library overrides', async () => {
    const factory = defineReactConfig(async () => ({
      build: {
        lib: { entry: 'src/custom.ts', formats: ['cjs'] },
        rolldownOptions: { external: ['fixture-dependency'] }
      }
    }))
    const config = await (typeof factory === 'function'
      ? factory(env)
      : factory)

    expect(config.build).toMatchObject({
      lib: { entry: 'src/custom.ts', formats: ['cjs'] },
      rolldownOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'fixture-dependency'
        ]
      }
    })
    expect(JSON.stringify(config.plugins)).toContain('vite:react-swc')
    expect(config.plugins).toContainEqual(
      expect.objectContaining({ name: 'vite:dts' })
    )
  })

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
