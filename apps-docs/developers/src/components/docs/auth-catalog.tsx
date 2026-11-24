import { useParams } from '@tanstack/react-router'

import { Card, Cards } from '@vezham/docs-react/components/card'

import { getAuthCatalog } from '@src/lib/docs/component-catalog'

export const AuthCatalog = () => {
  const { lang } = useParams({ strict: false })
  const pages = getAuthCatalog('web', lang)

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
