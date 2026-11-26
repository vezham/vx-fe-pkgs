import { createProjectGraphAsync } from '@nx/devkit'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

import { generateMetadata } from '@vezham/config/metadata'

export const generateReleaseMetadata = async (
  names: string[]
): Promise<void> => {
  const graph = await createProjectGraphAsync()
  for (const name of names) {
    const projectRoot = graph.nodes[name].data.root
    if (!existsSync(path.join(projectRoot, 'vx.app.yaml'))) continue
    const files = generateMetadata({ projectRoot })
    const trackedFiles = execFileSync(
      'git',
      ['ls-files', '-z', '--', ...files],
      {
        encoding: 'utf8'
      }
    )
      .split('\0')
      .filter(Boolean)
    // vx-bot/NOTE: Include tracked metadata in Nx's release commit without adding ignored local files.
    if (trackedFiles.length) {
      execFileSync('git', ['add', '--update', '--', ...trackedFiles], {
        stdio: 'inherit'
      })
    }
  }
}
