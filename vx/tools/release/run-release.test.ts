import assert from 'node:assert/strict'
import { test } from 'node:test'

import { type ReleaseOptions, runRelease } from './run-release'

const options: ReleaseOptions = {
  version: '',
  dryRun: false,
  verbose: false,
  firstRelease: false
}

const fixture = () => {
  const calls: Array<{ operation: string; options: unknown }> = []
  const api = {
    generateMetadata: async (names: string[]) => {
      calls.push({ operation: 'metadata', options: names })
    },
    getPublishProjects: async (names: string[]) => names,
    version: async (value: unknown) => {
      calls.push({ operation: 'version', options: value })
      return {
        workspaceVersion: '0.0.2',
        projectsVersionData: {
          react: {
            currentVersion: '0.0.1',
            newVersion: '0.0.2',
            dependentProjects: []
          }
        }
      }
    },
    changelog: async (value: unknown) => {
      calls.push({ operation: 'changelog', options: value })
    },
    publish: async (value: unknown) => {
      calls.push({ operation: 'publish', options: value })
      return { react: { code: 0 } }
    }
  }
  return { calls, api }
}

test('releases in order and lets conventional commits select the version', async () => {
  const { api, calls } = fixture()
  assert.equal(await runRelease(options, api), 0)
  assert.deepEqual(
    calls.map(call => call.operation),
    ['version', 'metadata', 'changelog', 'publish']
  )
  assert.equal(
    (calls[0].options as { specifier?: string }).specifier,
    undefined
  )
})

test('dry run and first release flags reach every operation', async () => {
  const { api, calls } = fixture()
  await runRelease(
    { ...options, version: '0.0.1', firstRelease: true, dryRun: true },
    api
  )
  for (const call of calls) {
    assert.equal((call.options as ReleaseOptions).dryRun, true)
    assert.equal((call.options as ReleaseOptions).firstRelease, true)
  }
  assert.equal((calls[0].options as { specifier: string }).specifier, '0.0.1')
})

for (const version of ['', 'patch', '0.0.2']) {
  test(`reports the resolved version for ${version || 'automatic'} selection`, async () => {
    const { api } = fixture()
    const reported: string[] = []
    assert.equal(
      await runRelease(
        { ...options, version },
        { ...api, reportVersion: resolved => reported.push(resolved) }
      ),
      0
    )
    assert.deepEqual(reported, ['0.0.2'])
  })
}

test('dry runs report the preview version', async () => {
  const { api } = fixture()
  const reported: string[] = []
  await runRelease(
    { ...options, dryRun: true },
    { ...api, reportVersion: version => reported.push(version) }
  )
  assert.deepEqual(reported, ['0.0.2'])
})

test('a bootstrap without an explicit version fails before changing anything', async () => {
  const { api, calls } = fixture()
  await assert.rejects(
    runRelease({ ...options, firstRelease: true }, api),
    /requires an explicit version/
  )
  assert.equal(calls.length, 0)
})

test('dry runs do not generate or stage metadata', async () => {
  const { api, calls } = fixture()
  await runRelease({ ...options, dryRun: true }, api)
  assert.deepEqual(
    calls.map(call => call.operation),
    ['version', 'changelog', 'publish']
  )
})

test('a failed version operation prevents changelog and publishing', async () => {
  const { api, calls } = fixture()
  api.version = async () => {
    throw new Error('version failed')
  }
  await assert.rejects(runRelease(options, api), /version failed/)
  assert.equal(calls.length, 0)
})

test('a failed changelog prevents publishing', async () => {
  const { api, calls } = fixture()
  api.changelog = async () => {
    throw new Error('changelog failed')
  }
  await assert.rejects(runRelease(options, api), /changelog failed/)
  assert.deepEqual(
    calls.map(call => call.operation),
    ['version', 'metadata']
  )
})

test('a failed package publish returns a failure exit code', async () => {
  const { api } = fixture()
  api.publish = async () => ({ react: { code: 1 } })
  assert.equal(await runRelease(options, api), 1)
})

test('metadata runs only for projects with a new version', async () => {
  const { api, calls } = fixture()
  const version = api.version
  api.version = async value => {
    const result = await version(value)
    return {
      ...result,
      projectsVersionData: {
        ...result.projectsVersionData,
        unchanged: {
          currentVersion: '0.0.1',
          newVersion: null,
          dependentProjects: []
        }
      }
    }
  }
  await runRelease(options, api)
  assert.deepEqual(calls.find(call => call.operation === 'metadata')?.options, [
    'react'
  ])
})

test('metadata failure prevents the release commit and publishing', async () => {
  const { api, calls } = fixture()
  api.generateMetadata = async () => {
    throw new Error('metadata failed')
  }
  await assert.rejects(runRelease(options, api), /metadata failed/)
  assert.deepEqual(
    calls.map(call => call.operation),
    ['version']
  )
})

test('no changes skips changelog and publishing', async () => {
  const { api, calls } = fixture()
  const unchanged = {
    ...api,
    reportVersion: (version: string) => {
      calls.push({ operation: 'report', options: version })
    },
    version: async () => ({
      workspaceVersion: null,
      projectsVersionData: {
        react: {
          currentVersion: '0.0.1',
          newVersion: null,
          dependentProjects: []
        }
      }
    })
  }
  assert.equal(await runRelease(options, unchanged), 0)
  assert.equal(calls.length, 0)
})

test('publishing uses only eligible projects', async () => {
  const { api, calls } = fixture()
  api.getPublishProjects = async () => ['react']
  await runRelease(options, api)
  assert.deepEqual((calls.at(-1)?.options as { projects: string[] }).projects, [
    'react'
  ])
})

test('no eligible publish projects skips publishing after version and changelog', async () => {
  const { api, calls } = fixture()
  api.getPublishProjects = async () => []
  assert.equal(await runRelease(options, api), 0)
  assert.deepEqual(
    calls.map(call => call.operation),
    ['version', 'metadata', 'changelog']
  )
})
