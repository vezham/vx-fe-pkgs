import { Link } from '@tanstack/react-router'

import { APP_NAME } from '@vezham/env/vite'
import { VezhamLogo } from '@vezham/icons-react'
import { Chip } from '@vezham/react-v3'

import { i18n } from '@app/docs'
import type { Locale } from '@generated/vx'

import { brandConfig } from './config'

type Props = {
  logoSize?: number
}

const brandName = import.meta.env.V_APP_BRAND_NAME?.trim() || APP_NAME
const brandChannel = import.meta.env.V_APP_BRAND_CHANNEL?.trim()
const channelConfig = brandConfig.channels.find(c => c.id === brandChannel)
const channelStyle = channelConfig ?? brandConfig.defaultChannel

const BrandRoot = ({ logoSize = 20 }: Props) => (
  <span className="inline-flex items-center gap-2 font-semibold">
    <VezhamLogo size={logoSize} aria-hidden="true" />
    {brandName}
    {brandChannel && (
      <Chip color={channelStyle.color} size="sm" variant={channelStyle.variant}>
        <Chip.Label>{channelConfig?.label ?? brandChannel}</Chip.Label>
      </Chip>
    )}
  </span>
)

const BrandLink = ({ locale, logoSize }: Props & { locale: Locale }) => (
  <Link
    to="/{-$lang}"
    params={{ lang: locale === i18n.defaultLanguage ? undefined : locale }}
    className="inline-flex">
    <BrandRoot logoSize={logoSize} />
  </Link>
)

export const Brand = Object.assign(BrandRoot, { Link: BrandLink })
