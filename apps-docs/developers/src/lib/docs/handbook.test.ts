import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { deserializePageTree } from '@vezham/docs-core/source/client'

import { handbookDocsRuntime } from '../../components/docs/handbook-docs'
import { handbookMarkdownHandler, loadHandbookDocs } from './handbook-route'

const text = (value: ReactNode) =>
  renderToStaticMarkup(value).replace(/<[^>]*>/g, '')

describe('MDX handbook', () => {
  it.each([undefined, 'cn'])(
    'scopes and normalizes the Markdown sidebar for locale %s',
    async lang => {
      const prefix = lang ? `/${lang}` : ''
      const data = await loadHandbookDocs({
        params: { lang, _splat: 'markdown/handbooks/basic' }
      })
      const tree = deserializePageTree(data.pageTree)
      const overview = tree.children.find(
        node =>
          node.type === 'page' && node.url === `${prefix}/handbook/markdown`
      )
      expect(overview?.type).toBe('page')
      if (overview?.type !== 'page')
        throw new Error('Missing Markdown overview')
      expect(renderToStaticMarkup(overview.icon)).toContain('<svg')
      expect(renderToStaticMarkup(overview.icon)).not.toContain('data-vx-icon')
      expect(
        tree.children.some(node => node.type === 'folder' && node.root)
      ).toBe(false)
      for (const node of tree.children)
        if (node.type === 'folder') {
          expect(node.defaultOpen).toBe(true)
          expect(node.index).toBeUndefined()
          const icon = renderToStaticMarkup(node.icon)
          if (text(node.name) === 'TODO') expect(icon).toBe('')
          else expect(icon, `Icon for ${text(node.name)}`).toContain('<svg')
        }
      expect(
        tree.children
          .filter(node => node.type === 'folder')
          .map(node => text(node.name))
      ).toEqual(['Handbooks', 'Reference', 'TODO'])
      const todo = tree.children.find(
        node => node.type === 'folder' && text(node.name) === 'TODO'
      )
      expect(
        todo?.type === 'folder' &&
          todo.children.some(
            node =>
              node.type === 'page' &&
              node.url === `${prefix}/handbook/markdown/todo`
          )
      ).toBe(true)
      const serialized = JSON.stringify(tree.children)
      expect(serialized).toContain(
        `${prefix}/handbook/markdown/handbooks/basic`
      )
      expect(
        tree.children.some(
          node => node.type === 'page' && node.url === `${prefix}/handbook`
        )
      ).toBe(false)
    }
  )

  it('includes Markdown in the shared handbook source', () => {
    expect(
      handbookDocsRuntime.source.getPages().map(page => page.slugs.join('/'))
    ).toContain('markdown')
  })
  it.each(['', 'get-started', 'missing', 'markdown/missing'])(
    'rejects missing handbook page %s instead of inventing a TODO page',
    async slug => {
      await expect(
        handbookDocsRuntime.createDocsLoader()({ params: { _splat: slug } })
      ).rejects.toMatchObject({ isNotFound: true })
    }
  )

  it('loads the Markdown index directly and rejects the retired overview alias', async () => {
    const data = await handbookDocsRuntime.createDocsLoader()({
      params: { _splat: 'markdown' }
    })
    expect(data.title).toBe('Overview')
    expect(data.routePath).toBe('/handbook/markdown')
    expect(data.markdownUrl).toBe('/handbook/markdown.md')
    const { page } = handbookDocsRuntime.getDocsPage({ slugs: ['markdown'] })
    expect(await handbookDocsRuntime.getLLMText(page)).toContain('Basic Syntax')
    await expect(
      handbookDocsRuntime.createDocsLoader()({
        params: { _splat: 'markdown/overview' }
      })
    ).rejects.toMatchObject({ isNotFound: true })
  })

  it.each([
    'markdown',
    'markdown/handbooks/basic',
    'markdown/handbooks/extended',
    'markdown/handbooks/hacks',
    'markdown/ref/md-affine',
    'markdown/ref/md-cliq',
    'markdown/ref/md-mdlivepreview',
    'markdown/ref/md-vhm-v1',
    'markdown/todo',
    'markdown/todo/mdx-fumadocs'
  ])('loads the nested content and Markdown export for %s', async slug => {
    const data = await handbookDocsRuntime.createDocsLoader()({
      params: { _splat: slug }
    })
    expect(data.routePath).toBe(`/handbook/${slug}`)
    const { page } = handbookDocsRuntime.getDocsPage({
      slugs: data.markdownUrl.replace('/handbook/', '').split('/'),
      pathFormat: 'markdown-url'
    })
    expect(await handbookDocsRuntime.getLLMText(page)).toBeTruthy()
  })

  it.each(['index.md', 'handbooks/basic.md'])(
    'preserves section-relative Markdown export %s',
    async path => {
      const response = await handbookMarkdownHandler({
        params: { _splat: 'markdown/' + path }
      })
      expect(response.headers.get('content-type')).toBe('text/markdown')
      expect(await response.text()).toContain('Syntax')
    }
  )
})
