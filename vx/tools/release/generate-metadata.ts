import { createProjectGraphAsync } from '@nx/devkit'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

export const generateReleaseMetadata = async (
  names: string[]
): Promise<void> => {
  const graph = await createProjectGraphAsync()
  for (const name of names) {
    const projectRoot = graph.nodes[name].data.root
    if (!existsSync(path.join(projectRoot, 'vx.app.yaml'))) continue
    // vx-bot/NOTE: Execute the fixed repository CLI with argv; metadata contents are never evaluated as code.
    // react-doctor-disable-next-line react-doctor/import-metadata-execution-risk
    const output = execFileSync(
      process.execPath,
      [
        '--import',
        'tsx',
        'packages/vx/config/src/lib/metadata/cli.ts',
        'generate',
        projectRoot,
        '--json'
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }
    )
    const files: unknown = JSON.parse(output)
    if (
      !Array.isArray(files) ||
      !files.every(file => typeof file === 'string')
    ) {
      throw new Error(`Invalid metadata CLI output for ${name}`)
    }
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
