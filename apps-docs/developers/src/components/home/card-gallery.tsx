import { Card, ScrollShadow } from '@vezham/react-v3'

import type { Locale } from '@generated/vx'

import {
  type HomeFeatureSection,
  type HomeSection,
  homeGallery
} from './config'
import { SectionAction } from './section-action'
import { SectionVisual } from './section-visual'

type Props = {
  locale: Locale
}

const GalleryFeatureCard = ({
  section,
  locale
}: {
  section: HomeFeatureSection
  locale: Locale
}) => (
  <Card.Root
    className={`vx-page__card relative h-[450px] w-full min-w-0 shrink-0 gap-3 overflow-hidden rounded-[28px] p-7 pb-16 min-[737px]:h-[500px] ${section.appearance ?? ''}`}>
    <Card.Header className="gap-3">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
        {section.icon && (
          <section.icon size={28} weight="duotone-outline" aria-hidden="true" />
        )}
        {section.title}
      </p>
      <Card.Title
        className="max-w-sm text-[21px] leading-[25px] font-semibold tracking-tight text-inherit min-[737px]:text-[28px] min-[737px]:leading-8"
        render={({ children, ...props }) => <h2 {...props}>{children}</h2>}>
        {section.headline}
      </Card.Title>
      <Card.Description className="max-w-xs text-sm leading-snug text-inherit opacity-90">
        {section.content}
      </Card.Description>
    </Card.Header>
    <Card.Content className="flex min-h-0 flex-1 flex-col justify-center">
      <SectionVisual section={section.visual} compact />
    </Card.Content>
    <SectionAction
      action={section.action}
      href={section.href}
      locale={locale}
    />
  </Card.Root>
)

const GalleryTile = ({
  section,
  locale
}: {
  section: HomeSection
  locale: Locale
}) => (
  <Card.Root
    className={`vx-page__card relative h-[215px] min-w-0 shrink-0 gap-3 overflow-hidden rounded-[28px] p-7 pb-16 min-[737px]:h-[240px] ${section.appearance ?? ''}`}>
    <Card.Header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2">
      {section.icon && (
        <section.icon size={28} weight="duotone-outline" aria-hidden="true" />
      )}
      <p className="text-xs font-semibold tracking-wide uppercase">
        {section.title}
      </p>
      <Card.Title
        className="col-span-full max-w-sm text-lg leading-6 font-semibold tracking-tight text-inherit min-[737px]:text-xl"
        render={({ children, ...props }) => <h2 {...props}>{children}</h2>}>
        {section.headline}
      </Card.Title>
      <Card.Description className="col-span-full text-xs leading-4 text-inherit opacity-90 min-[737px]:text-sm min-[737px]:leading-5">
        {section.content}
      </Card.Description>
    </Card.Header>
    <SectionAction
      action={section.action}
      href={section.href}
      locale={locale}
    />
  </Card.Root>
)

export const CardGallery = ({ locale }: Props) => (
  <nav aria-label="Explore documentation list" className="vx-page__content">
    <ScrollShadow
      aria-label="Scrollable documentation cards"
      orientation="horizontal"
      role="region"
      tabIndex={0}
      className="w-full overflow-x-auto">
      <ul className="flex items-stretch gap-5 px-1 py-4">
        {homeGallery.map(group => (
          <li
            key={group.id}
            aria-label={group.title}
            className={`flex w-[309px] shrink-0 max-[374px]:w-[260px] ${group.kind === 'tiles' ? 'flex-col gap-5 min-[737px]:w-[313px]' : 'min-[737px]:w-[400px]'}`}>
            {group.kind === 'feature' ? (
              <GalleryFeatureCard section={group.section} locale={locale} />
            ) : (
              group.sections.map(section => (
                <GalleryTile
                  key={section.id}
                  section={section}
                  locale={locale}
                />
              ))
            )}
          </li>
        ))}
      </ul>
    </ScrollShadow>
  </nav>
)
