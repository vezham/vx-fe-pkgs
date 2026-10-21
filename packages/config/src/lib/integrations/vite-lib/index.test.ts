import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { describe, expect, it } from 'vitest'

import { defineConfig } from './index'
import { defineConfig as defineReactConfig } from './react'

const env: ConfigEnv = { command: 'build', mode: 'production' }

describe('Vite package preset', () => {
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

      const factory = defineConfig({ root })
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

  it('preserves React package defaults and async overrides', async () => {
    const plugin = { name: 'fixture-framework' }
    const factory = defineReactConfig(async () => ({
      root: path.resolve('fixture-library'),
      plugins: [plugin],
      build: {
        lib: { entry: 'src/custom.ts', formats: ['cjs'] }
      }
    }))
    const config = await (typeof factory === 'function'
      ? factory(env)
      : factory)

    expect(config.build).toMatchObject({
      minify: false,
      lib: { entry: 'src/custom.ts', formats: ['cjs'] },
      rolldownOptions: { output: { preserveModules: true } }
    })
    expect(JSON.stringify(config.plugins)).toContain('vite:react-swc')
    expect(config.plugins).toContainEqual(plugin)
    expect(config.plugins).toContainEqual(
      expect.objectContaining({ name: 'vite:dts' })
    )

    const external = config.build?.rolldownOptions?.external
    if (typeof external !== 'function') {
      throw new Error('Expected the package dependency externalizer')
    }
    for (const id of [
      'react',
      'react/jsx-runtime',
      'react-dom/client',
      '@vezham/utils',
      'node:path'
    ]) {
      expect(external(id, undefined, false)).toBe(true)
    }
    for (const id of [
      './local',
      '../local',
      path.resolve('local.ts'),
      '\0virtual'
    ]) {
      expect(external(id, undefined, false)).toBe(false)
    }
  })
})
