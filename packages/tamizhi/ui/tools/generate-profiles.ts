import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin } from 'vite'
import { parse } from 'yaml'

import type * as Contracts from '@vezham/tamizhi-contracts'

const packageRoot = path.resolve(import.meta.dirname, '..')
const require = createRequire(import.meta.url)

export const generateProfiles = async (root = packageRoot) => {
  const configFile = path.join(root, 'vx.tamizhi.yaml')
  const outputFile = path.join(root, 'src/generated/profiles.ts')
  // vx-bot/NOTE: Load built contracts only when generating; Nx reads Vite config before dependency builds.
  const { tamizhiConfigSchema } =
    require('@vezham/tamizhi-contracts') as typeof Contracts
  let config
  try {
    config = tamizhiConfigSchema.parse(parse(readFileSync(configFile, 'utf8')))
  } catch (cause) {
    throw new Error(`Invalid Tamizhi configuration: ${configFile}`, { cause })
  }
  const content = `// vx-bot/NOTE: Generated from vx.tamizhi.yaml. DO NOT EDIT.
import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

export const TAMIZHI_PROFILES: readonly TamizhiProfile[] = ${JSON.stringify(config.profiles, null, 2)} satisfies readonly TamizhiProfile[]
`
  if (!existsSync(outputFile) || readFileSync(outputFile, 'utf8') !== content) {
    mkdirSync(path.dirname(outputFile), { recursive: true })
    writeFileSync(outputFile, content)
  }
  return outputFile
}

export const watchProfiles = async (root = packageRoot) => {
  await generateProfiles(root)
  const configFile = path.join(root, 'vx.tamizhi.yaml')
  let previous = readFileSync(configFile, 'utf8')
  // vx-bot/NOTE: Poll one small config file so atomic saves and native watcher limits are handled consistently.
  const timer = setInterval(() => {
    if (!existsSync(configFile)) return
    const current = readFileSync(configFile, 'utf8')
    if (current === previous) return
    previous = current
    void generateProfiles(root).catch(error => console.error(error))
  }, 250)
  return { close: () => clearInterval(timer) }
}

export const tamizhiProfilesPlugin = (root = packageRoot): Plugin => {
  const configFile = path.resolve(root, 'vx.tamizhi.yaml')
  return {
    name: 'tamizhi:profiles',
    enforce: 'pre',
    async buildStart() {
      await generateProfiles(root)
      this.addWatchFile(configFile)
    },
    async watchChange(id) {
      if (path.resolve(id) === configFile) await generateProfiles(root)
    }
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  if (process.argv.includes('--watch')) {
    await watchProfiles()
    console.log('Watching vx.tamizhi.yaml for profile changes')
  } else {
    console.log(`Generated ${await generateProfiles()}`)
  }
}
