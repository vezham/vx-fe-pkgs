import { HomeLayout } from '@vezham/docs-react/layouts/home'
import { Bento } from '@vezham/react/layouts/bento'
import { CardGallery } from '@vezham/react/layouts/card-gallery'

import { i18n } from '@app/docs'
import {
  type HomeSection,
  homeGallery,
  homeSections
} from '@components/home/config'
import { SectionAction } from '@components/home/section-action'
import { SectionVisual } from '@components/home/section-visual'
import { baseOptions } from '@config/layout'
import { type Locale, vxCore } from '@generated/vx'

type Props = {
  locale?: Locale
}

const getCardContent = (
  section: HomeSection,
  locale: Locale,
  compact = false
) => ({
  eyebrow: section.title,
  title: section.headline,
  description: section.content,
  icon: section.icon ? (
    <section.icon size={28} weight="duotone-outline" aria-hidden="true" />
  ) : undefined,
  children: section.visual ? (
    <SectionVisual section={section.visual} compact={compact} />
  ) : undefined,
  action: (
    <SectionAction
      action={section.action}
      href={section.href}
      locale={locale}
    />
  )
})

export default ({ locale = i18n.defaultLanguage }: Props) => (
  <HomeLayout {...baseOptions(locale)}>
    <h1 className="sr-only">{vxCore.name}</h1>
    <CardGallery
      aria-label="Explore documentation list"
      scrollLabel="Scrollable documentation cards"
      className="vx-page__content">
      {homeGallery.map(group => (
        <CardGallery.Group
          key={group.id}
          aria-label={group.title}
          variant={group.kind}>
          {group.kind === 'feature' ? (
            <CardGallery.Card
              {...getCardContent(group.section, locale, true)}
              className={group.section.appearance}
            />
          ) : (
            group.sections.map(section => (
              <CardGallery.Card
                key={section.id}
                variant="tile"
                {...getCardContent(section, locale, true)}
                className={section.appearance}
              />
            ))
          )}
        </CardGallery.Group>
      ))}
    </CardGallery>

    <nav
      aria-label="Explore documentation"
      className="vx-page__content max-w-5xl p-4">
      <Bento>
        {homeSections.map(section => (
          <Bento.Card
            key={section.id}
            {...getCardContent(section, locale)}
            className={`${section.appearance ?? ''} ${section.layout ?? ''}`}
          />
        ))}
      </Bento>
    </nav>
  </HomeLayout>
)
