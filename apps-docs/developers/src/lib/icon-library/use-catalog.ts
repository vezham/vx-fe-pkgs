import { useCallback } from 'react'

import { type AssetKind, loadCatalog } from './catalog'
import { loadIconRuntime } from './runtime'
import { useResource } from './use-resource'

export const useCatalog = (kind: AssetKind) => {
  const load = useCallback(async () => {
    const [assets] = await Promise.all([
      loadCatalog(kind),
      kind === 'icons' ? loadIconRuntime() : Promise.resolve()
    ])
    return assets
  }, [kind])
  return useResource(kind, load)
}
