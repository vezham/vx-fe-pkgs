import type { AvatarRenderer } from '../../../avatar-renderer'

export const createRenderer: (options: {
  base: string
  resolveAsset: (suffix: string) => string
}) => AvatarRenderer
export const PALETTES: Record<string, string[]>
