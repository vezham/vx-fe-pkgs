import { deserializePageTree } from '@vezham/docs-core/source/client'

import { packagesDocsRuntime } from '../../components/docs/packages-docs'
import { docsPackageIds, docsPackages } from '../../config/packages'
import { loadPackageDocs, packageMarkdownHandler } from './package-route'

const expectedSections = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'guides', title: 'Guides' },
  { id: 'api', title: 'API Reference' },
  { id: 'releases', title: 'Releases' }
] as const

describe('package documentation', () => {
  it.each(
    docsPackageIds.flatMap(packageId =>
      expectedSections.map(section => [packageId, section.id] as const)
    )
  )('loads %s/%s with its own sidebar', async (packageId, section) => {
    const data = await loadPackageDocs({
      params: { package: packageId, _splat: section }
    })
    expect(data.routePath).toBe(`/docs/packages/${packageId}/${section}`)
    expect(data.packageId).toBe(packageId)
    expect(data.title).toBe(
      expectedSections.find(item => item.id === section)?.title
    )
    expect(data.sections).toEqual(
      expectedSections.map(item => ({
        ...item,
        path: `/docs/packages/${packageId}/${item.id}`
      }))
    )
    const tree = JSON.stringify(deserializePageTree(data.pageTree))
    expect(tree).toContain(`/docs/packages/${packageId}/${section}`)
    for (const other of docsPackageIds.filter(id => id !== packageId))
      expect(tree).not.toContain(`/docs/packages/${other}/`)
    for (const other of expectedSections.filter(item => item.id !== section))
      expect(tree).not.toContain(`/docs/packages/${packageId}/${other.id}`)
  })

  it.each([
    {},
    { package: 'missing', _splat: 'getting-started' },
    { package: 'env', _splat: 'missing' },
    { package: 'env', _splat: 'guides/missing' }
  ])('rejects an unavailable package or page: %j', async params => {
    await expect(loadPackageDocs({ params })).rejects.toMatchObject({
      isNotFound: true
    })
  })

  it('follows content navigation order and omits unlisted sections', async () => {
    const source = packagesDocsRuntime.source
    const tree = source.getPageTree('en')
    const navigation = vi.spyOn(source, 'getPageTree').mockReturnValue({
      ...tree,
      children: tree.children.map(node =>
        node.type === 'folder' &&
        source.getNodeMeta(node, 'en')?.path === 'env/meta.json'
          ? {
              ...node,
              children: node.children
                .filter(
                  child =>
                    child.type !== 'folder' ||
                    child.index?.url !== '/docs/packages/env/releases'
                )
                .reverse()
            }
          : node
      )
    })
    try {
      const data = await loadPackageDocs({
        params: { package: 'env', _splat: 'guides' }
      })
      expect(data.sections.map(section => section.id)).toEqual([
        'api',
        'guides',
        'getting-started'
      ])
      await expect(
        loadPackageDocs({
          params: { package: 'env', _splat: 'releases' }
        })
      ).rejects.toMatchObject({ isNotFound: true })
    } finally {
      navigation.mockRestore()
    }
  })

  it.each([undefined, 'cn'])(
    'exports package markdown for locale %s',
    async lang => {
      const data = await loadPackageDocs({
        params: { package: 'hooks', _splat: 'guides', lang }
      })
      expect(data.markdownUrl).toBe(
        `${lang ? '/cn' : ''}/docs/packages/hooks/guides.md`
      )
      const response = await packageMarkdownHandler({
        params: { package: 'hooks', _splat: 'guides', lang }
      })
      expect(response.headers.get('Content-Type')).toBe('text/markdown')
      expect(await response.text()).toContain(
        `TODO: Add usage guides for ${docsPackages.hooks.name}.`
      )
    }
  )
})
