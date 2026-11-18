import bun from './logos/bun.svg?raw'
import npm from './logos/npm.svg?raw'
import pnpm from './logos/pnpm.svg?raw'
import yarn from './logos/yarn.svg?raw'

const imageSource = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`

export const packageManagerIcons = {
  npm: imageSource(npm),
  pnpm: imageSource(pnpm),
  yarn: imageSource(yarn),
  bun: imageSource(bun)
}
