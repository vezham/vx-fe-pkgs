import { cpSync, existsSync, globSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { mergeConfig } from 'vite'

import type { ViteConfig, ViteConfigOverrides } from '../vite/index'
import { defineConfig as defineLibraryConfig } from './base'

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

export const defineConfig = (overrides: ViteConfigOverrides = {}) =>
  defineLibraryConfig(async env => {
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
