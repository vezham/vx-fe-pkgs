import { createFileRoute } from '@tanstack/react-router'

import { normalizeLocale } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { AssetGallery } from '@components/icon-library/gallery'
import { validateCatalogSearch } from '@src/lib/icon-library/catalog'
import { pageHead } from '@src/lib/page-head'

const RouteComponent = () => {
  const { lang } = Route.useParams()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <AssetGallery
      kind="icons"
      locale={normalizeLocale(i18n, lang)}
      search={search}
      onSearchChange={value => {
        return navigate({ search: value, replace: true, resetScroll: false })
      }}
    />
  )
}
export const Route = createFileRoute('/{-$lang}/docs/assets/icons/')({
  component: RouteComponent,
  validateSearch: validateCatalogSearch,
  head: () => pageHead('Icons')
})
