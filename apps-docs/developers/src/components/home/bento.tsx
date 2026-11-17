import { Card } from '@vezham/react-v3'

import type { Locale } from '@generated/vx'

import type { HomeSection } from './config'
import { SectionAction } from './section-action'
import { SectionVisual } from './section-visual'

type Props = {
  section: HomeSection
  locale: Locale
}

export const BentoCard = ({ section, locale }: Props) => (
  <Card.Root
    className={`vx-page__card relative min-w-0 gap-5 overflow-hidden p-7 pb-20 sm:p-8 sm:pb-20 ${section.appearance ?? ''} ${section.layout ?? ''}`}>
    <Card.Header className="gap-3">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-wide uppercase">
        {section.icon && (
          <section.icon size={28} weight="duotone-outline" aria-hidden="true" />
        )}
        {section.title}
      </p>
      <Card.Title
        className="max-w-sm text-2xl leading-tight font-semibold tracking-tight text-inherit sm:text-3xl"
        render={({ children, ...props }) => <h2 {...props}>{children}</h2>}>
        {section.headline}
      </Card.Title>
      <Card.Description className="max-w-xs text-sm leading-snug text-inherit opacity-90">
        {section.content}
      </Card.Description>
    </Card.Header>
    {section.visual && (
      <Card.Content className="flex flex-1 flex-col justify-center">
        <SectionVisual section={section.visual} />
      </Card.Content>
    )}
    <SectionAction
      action={section.action}
      href={section.href}
      locale={locale}
    />
  </Card.Root>
)
