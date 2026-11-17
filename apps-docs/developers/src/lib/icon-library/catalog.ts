import type { SearchSchemaInput } from '@tanstack/react-router'

import { APP_VER } from '@vezham/env/vite'

export type AssetKind = 'icons' | 'illustrations' | 'logos'
export const iconWeights = [
  'outline',
  'filled',
  'duotone-outline',
  'duotone-filled'
] as const
export type IconWeight = (typeof iconWeights)[number]
export type Asset = {
  slug: string
  title: string
  category: string
  keywords: string
  subcategory: string
  weights: IconWeight[]
  variants: Record<string, string>
}
type AssetRow = [
  string,
  string,
  string,
  string,
  string,
  IconWeight[] | null,
  Record<string, string> | null
]

export const catalogRoutes = {
  icons: '/docs/assets/icons',
  illustrations: '/docs/assets/illustrations',
  logos: '/docs/assets/logos'
} as const
export const detailRoutes = {
  icons: `/{-$lang}${catalogRoutes.icons}/$name`,
  illustrations: `/{-$lang}${catalogRoutes.illustrations}/$name`,
  logos: `/{-$lang}${catalogRoutes.logos}/$name`
} as const
export const kindLabels = {
  icons: 'Icons',
  illustrations: 'Illustrations',
  logos: 'Logos'
}
export const formatLabel = (value: string) =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
const collectionOrigins = {
  illustrations: import.meta.env.V_ILLUSTRATIONS_CDN_URL,
  logos: import.meta.env.V_LOGOS_CDN_URL
} as const
const collectionOrigin = (kind: Exclude<AssetKind, 'icons'>) => {
  const origin: string | undefined = collectionOrigins[kind]
  if (!origin?.trim()) throw new Error(`The ${kind} CDN URL is not configured.`)
  return origin.trim().replace(/\/+$/, '')
}
const collectionUrl = (kind: Exclude<AssetKind, 'icons'>, path: string) => {
  const url = new URL(`${collectionOrigin(kind)}${path}`)
  url.searchParams.set('vx', APP_VER)
  return url.href
}
const catalogs = new Map<AssetKind, Promise<Asset[]>>()

export const loadCatalog = (kind: AssetKind): Promise<Asset[]> => {
  const cached = catalogs.get(kind)
  if (cached) return cached
  const catalogUrl =
    kind === 'icons'
      ? '/icon-catalog/icons.json'
      : collectionUrl(kind, '/catalog.json')
  const request = fetch(catalogUrl)
    .then(async response => {
      if (!response.ok)
        throw new Error('The asset catalog could not load. Please try again.')
      const rows: AssetRow[] = await response.json()
      return rows.map(
        ([
          slug,
          title,
          category,
          keywords,
          subcategory,
          weights,
          variants
        ]) => ({
          slug,
          title,
          category,
          keywords,
          subcategory,
          weights: weights ?? [],
          variants: variants ?? {}
        })
      )
    })
    .catch(() => {
      catalogs.delete(kind)
      throw new Error('The asset catalog could not load. Please try again.')
    })
  catalogs.set(kind, request)
  return request
}

export const getAssetVariant = (
  asset: Pick<Asset, 'variants'>,
  variant: string
) =>
  asset.variants[variant]
    ? variant
    : asset.variants.original
      ? 'original'
      : (Object.keys(asset.variants)[0] ?? 'original')

export const assetUrl = (
  kind: Exclude<AssetKind, 'icons'>,
  asset: Pick<Asset, 'slug' | 'variants'>,
  variant = 'original'
) => {
  if (kind === 'logos') {
    const availableVariant = getAssetVariant(asset, variant)
    return collectionUrl(
      kind,
      `/assets/${encodeURIComponent(asset.slug)}/${encodeURIComponent(availableVariant)}.svg`
    )
  }
  return collectionUrl(kind, `/assets/${encodeURIComponent(asset.slug)}.svg`)
}

export type CatalogSearch = {
  q: string
  category: string
  weight: IconWeight
  size: number
  sort: 'featured' | 'az' | 'za'
  page: number
}

export const parseCatalogSearch = (
  input: Record<string, unknown>,
  kind: AssetKind = 'icons'
): CatalogSearch => ({
  q: typeof input.q === 'string' ? input.q.slice(0, 200) : '',
  category: typeof input.category === 'string' ? input.category : 'all',
  weight: iconWeights.includes(input.weight as IconWeight)
    ? (input.weight as IconWeight)
    : 'outline',
  size:
    kind !== 'icons'
      ? Math.min(144, Math.max(48, Number(input.size) || 144))
      : Math.min(72, Math.max(24, Number(input.size) || 36)),
  sort: input.sort === 'az' || input.sort === 'za' ? input.sort : 'featured',
  page: Math.max(1, Math.floor(Number(input.page) || 1))
})

export const validateCatalogSearch = (
  input: Record<string, unknown> & SearchSchemaInput,
  kind: AssetKind = 'icons'
) => parseCatalogSearch(input, kind)

const synonyms: Record<string, string[]> = {
  gear: ['settings', 'cog'],
  settings: ['gear', 'cog'],
  user: ['profile', 'person', 'account'],
  search: ['magnifier', 'find'],
  email: ['mail', 'letter'],
  home: ['house', 'building'],
  delete: ['trash', 'bin'],
  plus: ['add'],
  close: ['cross', 'cancel'],
  favorite: ['heart', 'star']
}

export const filterAssets = (
  assets: readonly Asset[],
  search: CatalogSearch,
  kind: AssetKind
) => {
  const terms = search.q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const result = assets.filter(asset => {
    if (search.category !== 'all' && asset.category !== search.category)
      return false
    if (kind === 'icons' && !asset.weights.includes(search.weight)) return false
    const text =
      `${asset.slug} ${asset.title} ${asset.category} ${asset.subcategory} ${asset.keywords}`.toLowerCase()
    return terms.every(term =>
      [term, ...(synonyms[term] ?? [])].some(value => text.includes(value))
    )
  })
  if (search.sort === 'az')
    result.sort((a, b) => a.title.localeCompare(b.title))
  if (search.sort === 'za')
    result.sort((a, b) => b.title.localeCompare(a.title))
  if (search.sort === 'featured' && terms.length) {
    const relevance = (asset: Asset) =>
      terms.reduce((score, term) => {
        const name = asset.slug.replace(/-/g, ' ')
        return (
          score +
          Math.max(
            ...[term, ...(synonyms[term] ?? [])].map(value =>
              name === value
                ? 100
                : name.startsWith(value)
                  ? 40
                  : name.includes(value)
                    ? 20
                    : asset.keywords.toLowerCase().includes(value)
                      ? 5
                      : 0
            )
          )
        )
      }, 0)
    result.sort((a, b) => relevance(b) - relevance(a))
  }
  return result
}
