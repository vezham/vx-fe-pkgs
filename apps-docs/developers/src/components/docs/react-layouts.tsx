import { useParams } from '@tanstack/react-router'

import { Card, Cards } from '@vezham/docs-react/components/card'

import { getLayoutCatalog } from '@src/lib/docs/component-catalog'

export const ReactLayouts = () => {
  const { lang } = useParams({ strict: false })
  const pages = getLayoutCatalog('web', 'react', lang)

  return (
    <Cards>
      {pages.map(page => (
        <Card key={page.url} title={page.title} href={page.url}>
          Usage, composition, and API reference.
        </Card>
      ))}
    </Cards>
  )
}
