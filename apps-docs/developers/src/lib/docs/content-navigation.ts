import type { LoaderOutput } from '@vezham/docs-core/source'

type ContentSource = Pick<
  LoaderOutput,
  'getPageTree' | 'getNodeMeta' | 'getNodePage' | 'getPage'
>

type Options = { locale?: string; prefix?: string }

export const getContentSections = (
  source: ContentSource,
  { locale, prefix = '' }: Options = {}
) => {
  const tree = source.getPageTree(locale)
  const folder = prefix
    ? tree.children.find(
        node =>
          node.type === 'folder' &&
          source
            .getNodeMeta(node, locale)
            ?.path.split('/')
            .slice(0, -1)
            .join('/') === prefix
      )
    : tree
  const nodes = folder && 'children' in folder ? folder.children : []
  const offset = prefix.split('/').filter(Boolean).length
  return nodes.flatMap(node => {
    const meta =
      node.type === 'folder' ? source.getNodeMeta(node, locale) : undefined
    const index = node.type === 'folder' ? node.index : node
    const entry =
      index?.type === 'page'
        ? source.getNodePage(index, locale)
        : meta
          ? source.getPage(
              meta.path
                .split('/')
                .slice(0, -1)
                .filter(part => !/^\(.*\)$/.test(part)),
              locale
            )
          : undefined
    if (!entry) return []
    const title = meta?.data.title ?? entry.data.title
    if (!title) return []
    const slugs = entry.slugs.slice(offset)
    return [{ id: slugs[0] ?? '', title, page: slugs.join('/') }]
  })
}

export const getContentPage = (
  source: ContentSource,
  page: string,
  options: Options = {}
) => {
  const sections = getContentSections(source, options)
  const section = sections.find(item => item.id === page.split('/')[0])
  const slugs = [options.prefix, page]
    .filter(Boolean)
    .join('/')
    .split('/')
    .filter(Boolean)
  if (section && source.getPage(slugs, options.locale)) return page
  return section?.page ?? sections[0]?.page
}
