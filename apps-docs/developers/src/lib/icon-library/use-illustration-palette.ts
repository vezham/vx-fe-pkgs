import { useCallback, useMemo, useState } from 'react'

import {
  extractIllustrationPalette,
  recolorIllustration
} from './illustration-palette'
import { fetchAssetSvg } from './svg'
import { useResource } from './use-resource'

export const useIllustrationPalette = (source: string) => {
  const load = useCallback(
    () => (source ? fetchAssetSvg(source) : Promise.resolve('')),
    [source]
  )
  const resource = useResource(source, load)
  const [state, setState] = useState<{
    source: string
    overrides: Record<string, string>
  }>()
  const overrides = state?.source === source ? state.overrides : undefined
  const palette = useMemo(
    () => extractIllustrationPalette(resource.data ?? ''),
    [resource.data]
  )
  const svg = useMemo(
    () =>
      resource.data ? recolorIllustration(resource.data, overrides ?? {}) : '',
    [resource.data, overrides]
  )
  const customized = Boolean(overrides && Object.keys(overrides).length)
  const preview = useMemo(
    () =>
      customized && svg
        ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        : source,
    [customized, svg, source]
  )
  return {
    ...resource,
    palette,
    svg,
    preview,
    customized,
    colors: overrides ?? {},
    change: (original: string, color: string) =>
      setState(previous => {
        const next = {
          ...(previous?.source === source ? previous.overrides : {})
        }
        if (color.toLowerCase() === original) delete next[original]
        else next[original] = color
        return { source, overrides: next }
      }),
    reset: () => setState(undefined)
  }
}
