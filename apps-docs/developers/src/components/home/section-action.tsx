import { Bento } from '@vezham/react/layouts/bento'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import type { Locale } from '@generated/vx'

type Props = {
  action: string
  href: string
  locale: Locale
}

export const SectionAction = ({ action, href, locale }: Props) => (
  <Bento.Action aria-label={action} href={localizedUrl(i18n, locale, href)} />
)
