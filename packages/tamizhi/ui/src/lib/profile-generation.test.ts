import { waitFor } from '@testing-library/react'
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, expect, it } from 'vitest'
import { stringify } from 'yaml'

import { generateProfiles, watchProfiles } from '../../tools/generate-profiles'

const roots: string[] = []
const watchers: Awaited<ReturnType<typeof watchProfiles>>[] = []
const config = {
  profiles: [
    {
      id: 'vezham-tamizhi',
      name: 'Tamizhi',
      persona: 'helper',
      outfit: 'rest',
      suggestions: [{ title: 'Plan my day', prompt: 'Help me plan my day.' }],
      activities: { 'skill.sales-coaching': { outfit: 'coach' } }
    }
  ]
}

const createRoot = () => {
  const root = mkdtempSync(path.join(tmpdir(), 'tamizhi-profiles-'))
  roots.push(root)
  writeFileSync(path.join(root, 'vx.tamizhi.yaml'), stringify(config))
  return root
}

afterEach(() => {
  for (const watcher of watchers.splice(0)) watcher.close()
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true })
})

it('generates typed profile data from root YAML without rewriting unchanged output', async () => {
  const root = createRoot()
  const file = await generateProfiles(root)
  const generated = readFileSync(file, 'utf8')
  expect(generated).toContain('satisfies readonly TamizhiProfile[]')
  expect(generated).toContain('"skill.sales-coaching"')
  expect(generated).toContain('"outfit": "coach"')
  expect(generated).toContain('"title": "Plan my day"')
  expect(generated).toContain('"prompt": "Help me plan my day."')
  expect(generated).not.toContain("from 'yaml'")
  const timestamp = new Date('2020-01-01T00:00:00Z')
  utimesSync(file, timestamp, timestamp)
  await generateProfiles(root)
  expect(statSync(file).mtimeMs).toBe(timestamp.getTime())
})

it('rejects invalid config before creating or replacing generated output', async () => {
  const root = createRoot()
  const configFile = path.join(root, 'vx.tamizhi.yaml')
  writeFileSync(configFile, 'profiles: invalid')
  await expect(generateProfiles(root)).rejects.toThrow(
    'Invalid Tamizhi configuration'
  )
  expect(existsSync(path.join(root, 'src/generated/profiles.ts'))).toBe(false)
  writeFileSync(configFile, stringify(config))
  const file = await generateProfiles(root)
  const original = readFileSync(file, 'utf8')
  writeFileSync(configFile, stringify({ ...config, unknown: true }))
  await expect(generateProfiles(root)).rejects.toThrow(configFile)
  expect(readFileSync(file, 'utf8')).toBe(original)
})

it('regenerates watched configuration after an editor replaces the YAML file', async () => {
  const root = createRoot()
  watchers.push(await watchProfiles(root))
  const replacement = path.join(root, 'replacement.yaml')
  writeFileSync(
    replacement,
    stringify({
      profiles: [
        { ...config.profiles[0], name: 'Updated assistant', outfit: 'money' }
      ]
    })
  )
  renameSync(replacement, path.join(root, 'vx.tamizhi.yaml'))
  await waitFor(() => {
    const generated = readFileSync(
      path.join(root, 'src/generated/profiles.ts'),
      'utf8'
    )
    expect(generated).toContain('"name": "Updated assistant"')
    expect(generated).toContain('"outfit": "money"')
  })
})

it('rejects empty suggestion prompts without replacing generated output', async () => {
  const root = createRoot()
  const file = await generateProfiles(root)
  const original = readFileSync(file, 'utf8')
  writeFileSync(
    path.join(root, 'vx.tamizhi.yaml'),
    stringify({
      profiles: [
        {
          ...config.profiles[0],
          suggestions: [{ title: 'Start', prompt: ' ' }]
        }
      ]
    })
  )
  await expect(generateProfiles(root)).rejects.toThrow(
    'Invalid Tamizhi configuration'
  )
  expect(readFileSync(file, 'utf8')).toBe(original)
})

it('accepts ten suggestions and rejects oversized or duplicate pools', async () => {
  const root = createRoot()
  const configFile = path.join(root, 'vx.tamizhi.yaml')
  const suggestions = Array.from({ length: 10 }, (_, index) => ({
    title: `Task ${index}`,
    prompt: `Prompt ${index}`
  }))
  const writePool = (items: typeof suggestions) =>
    writeFileSync(
      configFile,
      stringify({ profiles: [{ ...config.profiles[0], suggestions: items }] })
    )
  writePool(suggestions)
  const file = await generateProfiles(root)
  expect(readFileSync(file, 'utf8')).toContain('"title": "Task 9"')
  writePool([...suggestions, { title: 'Eleventh', prompt: 'Too many' }])
  await expect(generateProfiles(root)).rejects.toThrow(
    'Invalid Tamizhi configuration'
  )
  writePool([suggestions[0], suggestions[0]])
  await expect(generateProfiles(root)).rejects.toThrow(
    'Invalid Tamizhi configuration'
  )
})
