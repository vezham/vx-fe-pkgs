import { createFileRoute } from '@tanstack/react-router'

import { normalizeLocale } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { IconPackages } from '@components/icon-library/info-pages'
import { pageHead } from '@src/lib/page-head'

const RouteComponent = () => {
  const { lang } = Route.useParams()
  return <IconPackages locale={normalizeLocale(i18n, lang)} />
}
export const Route = createFileRoute('/{-$lang}/docs/assets/packages/')({
  component: RouteComponent,
  head: () => pageHead('Packages and Tools', 'Assets')
})
