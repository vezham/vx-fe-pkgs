import { deserializePageTree } from '@vezham/docs-core/source/client'

import { iconDocsRuntime, loadIconDocs } from './docs'

describe('asset library guides', () => {
  it.each([undefined, 'cn'])(
    'loads framework guides and navigation for locale %s',
    async lang => {
      const prefix = lang ? `/${lang}` : ''
      const data = await loadIconDocs({ params: { lang, framework: 'react' } })
      expect(data.routePath).toBe(`${prefix}/docs/assets/guides/react`)
      expect(data.markdownUrl).toBe(`${prefix}/docs/assets/guides/react.md`)
      const tree = JSON.stringify(deserializePageTree(data.pageTree).children)
      expect(tree).toContain(`${prefix}/docs/assets/guides/vanilla`)
      expect(tree).not.toContain('/docs/ui/')
    }
  )

  it('exports the overview with links to the moved galleries and framework guides', async () => {
    const { page } = iconDocsRuntime.getDocsPage({ slugs: [] })
    const markdown = await iconDocsRuntime.getLLMText(page)
    expect(markdown).toContain('/docs/assets/guides/react')
    expect(markdown).toContain('/docs/assets/icons')
    expect(markdown).toContain('/docs/assets/illustrations')
    expect(markdown).toContain('/docs/assets/logos')
  })
})
