import { useParams } from '@tanstack/react-router'

import { getComponentCatalog } from '@src/lib/docs/component-catalog'
import {
  relatedComponents,
  relatedShowcases
} from '@src/lib/docs/heroui-presentation'

import { ComponentTile } from './component-gallery'

const normalize = (value: string) => value.toLowerCase().replace(/[-_\s]/g, '')

export const RelatedComponents = ({ component }: { component: string }) => {
  const { lang } = useParams({ strict: false })
  const names = relatedComponents[normalize(component)] ?? []
  const catalog = getComponentCatalog('web', 'react-v3', lang)
  const pages = names.flatMap(name =>
    catalog.filter(
      item =>
        item.platform === 'web' && normalize(item.title) === normalize(name)
    )
  )
  if (!pages.length) return null
  return (
    <div
      className="not-prose my-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Related components">
      {pages.map(page => (
        <ComponentTile key={page.url} page={page} href={page.url} />
      ))}
    </div>
  )
}

export const RelatedShowcases = ({ component }: { component: string }) => {
  const showcases = relatedShowcases.filter(item =>
    item.components.some(name => normalize(name) === normalize(component))
  )
  if (!showcases.length) return null
  return (
    <div
      className="not-prose my-6 grid gap-4 sm:grid-cols-2"
      aria-label="Related showcases">
      {showcases.map(item => (
        <a
          key={item.name}
          href={`https://heroui.com/showcase/${item.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden rounded-xl border">
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
          <div className="p-4">
            <p className="font-medium">{item.title}</p>
            <p className="text-muted mt-2 text-sm">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
