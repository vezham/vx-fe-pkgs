import { cpSync, existsSync, globSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'

import {
  type ViteConfig,
  type ViteConfigOverrides,
  getViteConfig
} from '../vite/index'

const getPackageEntries = (projectRoot: string) => {
  const manifest = path.join(projectRoot, 'package.json')
  if (!existsSync(manifest)) return undefined
  const pkg = JSON.parse(readFileSync(manifest, 'utf8')) as {
    exports?: Record<string, string | Record<string, string>>
    bin?: Record<string, string>
  }
  const patterns = Object.values(pkg.exports ?? {})
    .map(value =>
      typeof value === 'string' ? value : (value['@vx/fe-kit'] ?? value.types)
    )
    .filter((value): value is string => Boolean(value?.startsWith('./src/')))
  const files = patterns.flatMap(pattern =>
    globSync(pattern, { cwd: projectRoot })
  )
  for (const output of Object.values(pkg.bin ?? {})) {
    files.push(output.replace('./dist/', 'src/').replace(/\.js$/, '.ts'))
  }
  return Object.fromEntries(
    files.map(file => [
      file
        .replace(/^\.?\/src\//, '')
        .replace(/^src\//, '')
        .replace(/\.tsx?$/, ''),
      path.resolve(projectRoot, file)
    ])
  )
}

export const definePackageConfig = (overrides: ViteConfigOverrides = {}) =>
  defineConfig(async env => {
    const config =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const root = path.resolve(config.root ?? process.cwd())
    const entries = getPackageEntries(root)
    return mergeConfig(
      {
        plugins: [
          {
            name: 'vezham:package-assets',
            closeBundle() {
              for (const file of globSync('src/**/*.{html,css}', {
                cwd: root
              })) {
                cpSync(
                  path.join(root, file),
                  path.join(root, file.replace(/^src\//, 'dist/')),
                  { recursive: true }
                )
              }
            }
          }
        ],
        build: {
          minify: false,
          lib: {
            entry: entries,
            fileName: (_format: string, name: string) => `${name}.js`
          },
          rolldownOptions: {
            external: (id: string) =>
              !id.startsWith('.') &&
              !path.isAbsolute(id) &&
              !id.startsWith('\0'),
            output: {
              preserveModules: true,
              preserveModulesRoot: path.join(root, 'src'),
              entryFileNames: '[name].js'
            }
          }
        }
      },
      config
    ) as ViteConfig
  })

export const getViteLibConfig = (projectRoot = process.cwd()): ViteConfig => ({
  ...getViteConfig(projectRoot),
  plugins: [
    dts({
      entryRoot: path.join(projectRoot, 'src'),
      tsconfigPath: path.join(projectRoot, 'tsconfig.lib.json')
    })
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      entry: path.join(projectRoot, 'src/index.ts'),
      fileName: 'index',
      formats: ['es']
    }
  }
})

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineViteConfig(async env => {
    const resolved =
      typeof overrides === 'function' ? await overrides(env) : overrides
    const defaults = getViteLibConfig(
      path.resolve(resolved.root ?? process.cwd())
    )
    if (
      resolved.build?.lib &&
      resolved.build.lib.formats &&
      defaults.build?.lib
    ) {
      // vx-bot/NOTE: Vite concatenates arrays; explicit formats must replace the ESM default.
      delete defaults.build.lib.formats
    }
    return mergeConfig(defaults, resolved) as ViteConfig
  })
