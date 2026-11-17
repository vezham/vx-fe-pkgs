import { docsPageHead, pageHead, pageTitle } from './page-head'

describe('page titles', () => {
  it('formats standalone and section titles', () => {
    expect(pageTitle('Home')).toBe('Home | Vezham Developers')
    expect(pageTitle('Align Bottom', 'Icons')).toBe(
      'Align Bottom - Icons | Vezham Developers'
    )
    expect(pageHead('FAQ', 'Assets').meta).toEqual([
      { title: 'FAQ - Assets | Vezham Developers' },
      { property: 'og:title', content: 'FAQ - Assets | Vezham Developers' },
      { name: 'twitter:title', content: 'FAQ - Assets | Vezham Developers' }
    ])
  })

  it.each([
    [
      '/docs/ui/react/web/getting-started',
      'Getting Started',
      'Getting Started - Vezham Web'
    ],
    [
      '/docs/ui/react/native/getting-started',
      'Getting Started',
      'Getting Started - Vezham Native'
    ],
    [
      '/docs/ui/react-v3/web/components/accordion',
      'Accordion',
      'Accordion - Vezham v3 Web'
    ],
    [
      '/docs/ui/react-v3/native/components/button',
      'Button',
      'Button - Vezham v3 Native'
    ],
    [
      '/docs/ui/react-pro-v3/web/components/area-chart',
      'Area Chart',
      'Area Chart - Vezham Pro v3 Web'
    ],
    [
      '/cn/docs/ui/react-pro-v3/native/components/fab',
      'FAB',
      'FAB - Vezham Pro v3 Native'
    ],
    ['/docs/assets/guides', 'Vezham Icons', 'Guides - Assets'],
    ['/docs/assets/guides/react', 'React', 'React - Assets'],
    ['/handbook', 'Handbook', 'Handbook'],
    ['/handbook/philosophy', 'Philosophy', 'Philosophy - Handbook'],
    ['/cn/handbook/markdown', 'Overview', 'Markdown - Handbook'],
    [
      '/handbook/markdown/handbooks/basic',
      'Basic Syntax',
      'Basic Syntax - Markdown'
    ]
  ])(
    'formats %s and preserves other metadata',
    (routePath, title, expected) => {
      const value = `${expected} | Vezham Developers`
      const head = docsPageHead(
        { locale: 'en', routePath, title },
        {
          meta: [
            { title: 'Original' },
            { property: 'og:title', content: 'Original' },
            { name: 'twitter:title', content: 'Original' },
            { name: 'description', content: 'Keep description' },
            { property: 'og:image', content: '/image.png' }
          ]
        },
        {
          title: expected.split(' - ')[0],
          section: expected.split(' - ')[1]
        }
      )
      expect(head.meta).toEqual([
        { title: value },
        { property: 'og:title', content: value },
        { name: 'twitter:title', content: value },
        { name: 'description', content: 'Keep description' },
        { property: 'og:image', content: '/image.png' }
      ])
    }
  )

  it('uses MDX titles without inspecting the route URL', () => {
    const data = {
      locale: 'en',
      routePath: '/docs/ui/react-v3/web/test',
      title: 'MDX title'
    }
    expect(docsPageHead(data, { meta: [{ title: 'Original' }] }).meta).toEqual([
      { title: 'MDX title | Vezham Developers' }
    ])
    expect(
      docsPageHead(
        data,
        { meta: [{ title: 'Original' }] },
        { section: 'Explicit context' }
      ).meta
    ).toEqual([{ title: 'MDX title - Explicit context | Vezham Developers' }])
  })

  it('leaves missing loader data alone', () => {
    expect(docsPageHead(undefined, {})).toEqual({})
  })
})
