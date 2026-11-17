import type { BaseLayoutProps } from '@vezham/docs-react/layouts/shared'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { Brand } from '@components/brand'
import type { Locale } from '@generated/vx'

export const baseOptions = (
  locale: Locale = i18n.defaultLanguage
): BaseLayoutProps => {
  return {
    nav: {
      title: <Brand logoSize={22} />,
      url: localizedUrl(i18n, locale, '/')
    }
  }
}
