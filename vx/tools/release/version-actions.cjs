const { join } = require('node:path')

const { parseDocument } = require('yaml')
const jsRelease = require('@nx/js/src/release/version-actions')

const JsVersionActions = jsRelease.default ?? jsRelease

class VxVersionActions extends JsVersionActions {
  async updateProjectDependencies(
    tree,
    projectGraph,
    dependenciesToUpdate,
    resolveVersionForDependency
  ) {
    const workspacePath = 'pnpm-workspace.yaml'
    const original = tree.read(workspacePath, 'utf-8')
    if (
      !original ||
      !this.finalConfigForProject.preserveLocalDependencyProtocols
    ) {
      return super.updateProjectDependencies(
        tree,
        projectGraph,
        dependenciesToUpdate,
        resolveVersionForDependency
      )
    }

    const document = parseDocument(original)
    if (document.errors.length) throw document.errors[0]
    const config = document.toJS() ?? {}
    const catalogs = [
      [['catalog'], config.catalog],
      ...Object.entries(config.catalogs ?? {}).map(([name, catalog]) => [
        ['catalogs', name],
        catalog
      ])
    ]
    const workspaceEntries = catalogs.flatMap(([path, catalog]) =>
      Object.entries(catalog ?? {})
        .filter(
          ([, version]) =>
            typeof version === 'string' && version.startsWith('workspace:')
        )
        .map(([name, version]) => ({ path: [...path, name], version }))
    )

    // vx-bot/NOTE: Nx updates catalogs before checking preserveLocalDependencyProtocols, which makes lockfile generation fetch unpublished versions.
    const logMessages = await super.updateProjectDependencies(
      tree,
      projectGraph,
      dependenciesToUpdate,
      resolveVersionForDependency
    )
    const updated = parseDocument(tree.read(workspacePath, 'utf-8'))
    if (updated.errors.length) throw updated.errors[0]
    let restored = 0
    for (const { path, version } of workspaceEntries) {
      if (updated.getIn(path) !== version) {
        updated.setIn(path, version)
        restored++
      }
    }
    if (restored) {
      tree.write(workspacePath, updated.toString())
      logMessages.push(
        `Preserved ${restored} workspace catalog entries in ${workspacePath}`
      )
    }
    return logMessages
  }

  async updateProjectVersion(tree, newVersion) {
    const logMessages = await super.updateProjectVersion(tree, newVersion)
    const vxConfigPath = join(this.projectGraphNode.data.root, 'vx.app.yaml')

    if (!tree.exists(vxConfigPath)) {
      return logMessages
    }

    const document = parseDocument(tree.read(vxConfigPath, 'utf-8'))
    if (document.errors.length) throw document.errors[0]
    document.setIn(['core', 'version'], newVersion)
    tree.write(vxConfigPath, document.toString())

    return [
      ...logMessages,
      `✍️  New version ${newVersion} written to Vx app config: ${vxConfigPath}`
    ]
  }
}

module.exports = VxVersionActions
module.exports.afterAllProjectsVersioned = jsRelease.afterAllProjectsVersioned
