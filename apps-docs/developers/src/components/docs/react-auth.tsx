import { useParams } from '@tanstack/react-router'

import { Card, Cards } from '@vezham/docs-react/components/card'

import { getAuthCatalog } from '@src/lib/docs/component-catalog'

export const ReactAuth = () => {
  const { lang } = useParams({ strict: false })
  const pages = getAuthCatalog('web', 'react', lang)

  return (
    <Cards>
      {pages.map(page => (
        <Card key={page.url} title={page.title} href={page.url}>
          Setup, usage, and API reference.
        </Card>
      ))}
    </Cards>
  )
}
