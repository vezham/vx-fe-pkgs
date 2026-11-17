import { Link as RouterLink } from '@tanstack/react-router'

import { Card } from '@vezham/react-v3'

import {
  type Asset,
  type AssetKind,
  assetUrl,
  detailRoutes,
  formatLabel
} from '@src/lib/icon-library/catalog'

import { CdnIcon } from './controls'

type Props = {
  items: Asset[]
  kind: AssetKind
  category: string
  lang?: string
}

export const RelatedAssets = ({ items, kind, category, lang }: Props) =>
  items.length > 0 && (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">More in {formatLabel(category)}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {items.map(item => (
          <RouterLink
            key={item.slug}
            to={detailRoutes[kind]}
            params={{ lang, name: item.slug }}
            search={{}}
            className="min-w-0 no-underline">
            <Card className="h-full">
              <Card.Content
                className={`flex min-h-24 items-center justify-center ${kind === 'logos' ? 'asset-preview--logo rounded-xl' : ''}`}>
                {kind === 'icons' ? (
                  <CdnIcon name={item.slug} size={32} />
                ) : (
                  <img
                    src={assetUrl(kind, item)}
                    alt=""
                    loading="lazy"
                    className="max-h-20 max-w-full object-contain"
                  />
                )}
              </Card.Content>
              <Card.Footer>
                <span className="truncate text-xs">
                  {formatLabel(item.slug)}
                </span>
              </Card.Footer>
            </Card>
          </RouterLink>
        ))}
      </div>
    </section>
  )
