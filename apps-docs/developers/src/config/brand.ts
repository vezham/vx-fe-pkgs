import { localizedUrl } from '@vezham/start/runtime/docs'

import { type Locale, vxI18n } from '@generated/vx'

export const getBrandLinkProps = (locale: Locale) => ({
  to: localizedUrl(vxI18n, locale, '/')
})
