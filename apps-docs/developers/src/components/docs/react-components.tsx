import { useParams } from '@tanstack/react-router'

import { Card, Cards } from '@vezham/docs-react/components/card'

import { getComponentCatalog } from '@src/lib/docs/component-catalog'

export const ReactComponents = () => {
  const { lang } = useParams({ strict: false })
  const pages = getComponentCatalog('web', 'react', lang)

  return (
    <Cards>
      {pages.map(page => (
        <Card key={page.url} title={page.title} href={page.url}>
          Usage, examples, and API reference.
        </Card>
      ))}
    </Cards>
  )
}
