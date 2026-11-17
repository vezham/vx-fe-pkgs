import type { getDocsRouteHead } from '@vezham/start/runtime/docs'

import { vxCore } from '../generated/vx'

export const pageTitle = (title: string, section?: string) =>
  `${title}${section ? ` - ${section}` : ''} | ${vxCore.name}`

export const pageHead = (title: string, section?: string) => {
  const value = pageTitle(title, section)
  return {
    meta: [
      { title: value },
      { property: 'og:title', content: value },
      { name: 'twitter:title', content: value }
    ]
  }
}

export const docsPageHead = (
  data: Parameters<typeof getDocsRouteHead>[0],
  head: ReturnType<typeof getDocsRouteHead>,
  options: { title?: string; section?: string } = {}
) => {
  if (!data || !head.meta) return head
  const value = pageTitle(
    options.title ?? data.title ?? 'Documentation',
    options.section
  )
  return {
    ...head,
    meta: head.meta.map(meta => {
      if (meta.title !== undefined) return { ...meta, title: value }
      if (meta.property === 'og:title' || meta.name === 'twitter:title')
        return { ...meta, content: value }
      return meta
    })
  }
}
