import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const forbiddenImports = [
  'react',
  'solid-js',
  '@tanstack/react-query',
  '@tanstack/solid-query'
]

const sourceFiles = (dir: string): string[] => {
  return readdirSync(dir).flatMap(entry => {
    const path = join(dir, entry)
    const stat = statSync(path)

    if (stat.isDirectory()) return sourceFiles(path)
    if (/\.(ts|tsx)$/.test(path)) return [path]
    return []
  })
}

describe('core query boundary', () => {
  it('does not expose the aggregate plugins subpath', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      exports: Record<string, unknown>
    }
    const viteConfig = readFileSync('vite.config.ts', 'utf8')

    expect(packageJson.exports['./plugins']).toBeUndefined()
    expect(viteConfig).not.toContain('plugins: "src/plugins.ts"')
  })

  it('does not import framework runtimes', () => {
    const files = sourceFiles('src')
    const offenders = files.flatMap(file => {
      const text = readFileSync(file, 'utf8')
      return forbiddenImports
        .filter(specifier =>
          new RegExp(`\\bfrom\\s+(['"])${specifier}(?:/[^'"]*)?\\1`).test(text)
        )
        .map(specifier => `${file}: ${specifier}`)
    })

    expect(offenders).toEqual([])
  })
})
