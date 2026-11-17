import { ArrowRightUp } from '@vezham/icons-react'
import { Card, Link } from '@vezham/react-v3'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import type { Locale } from '@generated/vx'

type Props = {
  action: string
  href: string
  locale: Locale
}

export const SectionAction = ({ action, href, locale }: Props) => (
  <Card.Footer className="absolute inset-0 z-10 rounded-[inherit]">
    <Link
      aria-label={action}
      className="group data-[focus-visible=true]:inset-ring-focus flex size-full cursor-pointer items-end justify-end rounded-[inherit] p-6 data-[focus-visible=true]:inset-ring-2"
      href={localizedUrl(i18n, locale, href)}>
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full bg-[#ededf1] text-[#57575b] group-hover:bg-white">
        <ArrowRightUp size={22} />
      </span>
    </Link>
  </Card.Footer>
)
