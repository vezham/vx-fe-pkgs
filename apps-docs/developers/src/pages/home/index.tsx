import { HomeLayout } from '@vezham/docs-react/layouts/home'

import { i18n } from '@app/docs'
import { BentoCard } from '@components/home/bento'
import { CardGallery } from '@components/home/card-gallery'
import { homeSections } from '@components/home/config'
import { baseOptions } from '@config/layout'
import { type Locale, vxCore } from '@generated/vx'

type Props = {
  locale?: Locale
}

export default ({ locale = i18n.defaultLanguage }: Props) => (
  <HomeLayout {...baseOptions(locale)}>
    <h1 className="sr-only">{vxCore.name}</h1>
    <CardGallery locale={locale} />

    <nav
      aria-label="Explore documentation"
      className="mx-auto grid max-w-5xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {homeSections.map(section => (
        <BentoCard key={section.id} section={section} locale={locale} />
      ))}
    </nav>
  </HomeLayout>
)
