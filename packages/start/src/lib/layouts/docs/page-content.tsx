import type { ReactNode } from 'react'

import { PageActions } from './page-actions'
import type { PageComponents } from './pages'

type Props = {
  children: ReactNode
  description?: ReactNode
  markdownUrl?: string
  title?: ReactNode
} & Pick<PageComponents, 'Body' | 'Description' | 'Title'>

export const DocsPageContent = ({
  children,
  description,
  markdownUrl,
  title,
  Body,
  Description,
  Title
}: Props) => (
  <>
    {title || markdownUrl ? (
      <div className="flex flex-col items-start gap-3 lg:flex-row lg:justify-between lg:gap-4">
        {title ? <Title>{title}</Title> : <span />}
        {markdownUrl ? <PageActions markdownUrl={markdownUrl} /> : null}
      </div>
    ) : null}
    {description ? <Description>{description}</Description> : null}
    <Body>{children}</Body>
  </>
)
