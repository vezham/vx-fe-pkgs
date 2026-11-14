import assert from 'node:assert/strict'
import { test } from 'node:test'
import { FsTree } from 'nx/src/generators/tree'
import { parse, stringify } from 'yaml'

import VxVersionActions from './version-actions.cjs'

const nextVersion = '27.0.0-alpha.2'

const fixture = async ({
  catalogName,
  protocol = 'workspace:*',
  preserve = true
} = {}) => {
  const tree = new FsTree(process.cwd(), false)
  const catalog = {
    '@vezham/devtools': protocol,
    '@vezham/env': '27.0.0-alpha.1'
  }
  tree.write(
    'pnpm-workspace.yaml',
    '# vx-bot/NOTE: Keep local release dependencies in the workspace.\n' +
      stringify({
        packages: ['packages/*'],
        ...(catalogName
          ? { catalogs: { [catalogName]: catalog } }
          : { catalog })
      })
  )
  const nodes = Object.fromEntries(
    ['consumer', 'devtools', 'env'].map(name => [
      name,
      {
        name,
        type: 'lib',
        data: {
          root: `packages/${name}`,
          metadata: { js: { packageName: `@vezham/${name}` } }
        }
      }
    ])
  )
  const reference = catalogName ? `catalog:${catalogName}` : 'catalog:'
  tree.write(
    'packages/consumer/package.json',
    JSON.stringify({
      name: '@vezham/consumer',
      version: '27.0.0-alpha.1',
      dependencies: { '@vezham/devtools': reference, '@vezham/env': reference },
      peerDependencies: { '@vezham/devtools': reference }
    })
  )
  const actions = new VxVersionActions({}, nodes.consumer, {
    manifestRootsToUpdate: [],
    preserveLocalDependencyProtocols: preserve,
    preserveMatchingDependencyRanges: true
  })
  await actions.init(tree)
  const graph = { nodes, dependencies: {} }
  const update = () =>
    actions.updateProjectDependencies(tree, graph, {
      devtools: nextVersion,
      env: nextVersion
    })
  const readCatalog = () => {
    const config = parse(tree.read('pnpm-workspace.yaml', 'utf-8'))
    return catalogName ? config.catalogs[catalogName] : config.catalog
  }
  return { tree, actions, update, readCatalog, reference }
}

for (const catalogName of [undefined, 'internal', 'default']) {
  for (const protocol of ['workspace:*', 'workspace:^', 'workspace:~']) {
    test(`preserves ${protocol} in ${catalogName ?? 'the default'} catalog while bumping registry versions`, async () => {
      const { tree, update, readCatalog, reference } = await fixture({
        catalogName,
        protocol
      })
      await update()
      assert.deepEqual(readCatalog(), {
        '@vezham/devtools': protocol,
        '@vezham/env': nextVersion
      })
      const manifest = JSON.parse(
        tree.read('packages/consumer/package.json', 'utf-8')
      )
      assert.equal(manifest.dependencies['@vezham/devtools'], reference)
      assert.equal(manifest.peerDependencies['@vezham/devtools'], reference)
      assert.match(tree.read('pnpm-workspace.yaml', 'utf-8'), /# vx-bot\/NOTE:/)
      const afterFirstUpdate = tree.read('pnpm-workspace.yaml', 'utf-8')
      await update()
      assert.equal(tree.read('pnpm-workspace.yaml', 'utf-8'), afterFirstUpdate)
    })
  }
}

test('honors explicitly disabled workspace protocol preservation', async () => {
  const { update, readCatalog } = await fixture({ preserve: false })
  await update()
  assert.equal(readCatalog()['@vezham/devtools'], nextVersion)
})

test('updates direct workspace dependencies using the existing Nx behavior', async () => {
  const { tree, update } = await fixture()
  tree.write(
    'packages/consumer/package.json',
    JSON.stringify({ dependencies: { '@vezham/devtools': 'workspace:*' } })
  )
  tree.delete('pnpm-workspace.yaml')
  await update()
  assert.equal(
    JSON.parse(tree.read('packages/consumer/package.json', 'utf-8'))
      .dependencies['@vezham/devtools'],
    'workspace:*'
  )
})

test('keeps package and Vx app versions synchronized', async () => {
  const { tree, actions } = await fixture()
  tree.write(
    'packages/consumer/vx.app.yaml',
    'core:\n  version: 27.0.0-alpha.1\n'
  )
  await actions.updateProjectVersion(tree, nextVersion)
  assert.equal(
    JSON.parse(tree.read('packages/consumer/package.json', 'utf-8')).version,
    nextVersion
  )
  assert.equal(
    parse(tree.read('packages/consumer/vx.app.yaml', 'utf-8')).core.version,
    nextVersion
  )
})
