import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { APP_BRAND_CHANNEL, APP_BRAND_NAME } from '@vezham/env/vite'
import { VezhamLogo } from '@vezham/icons-react'
import { Chip, cn } from '@vezham/react-v3'

import { brandConfig } from './config'

export type BrandProps = {
  name?: string
  channel?: string
  logoSize?: number
}

export type BrandLinkProps = BrandProps &
  Omit<ComponentProps<typeof Link>, 'children'>

const BrandRoot = ({
  name = APP_BRAND_NAME,
  channel = APP_BRAND_CHANNEL,
  logoSize = 20
}: BrandProps) => {
  const channelConfig = brandConfig.channels.find(c => c.id === channel)
  const channelStyle = channelConfig ?? brandConfig.defaultChannel

  return (
    <span className="inline-flex items-center gap-2 font-semibold">
      <VezhamLogo size={logoSize} aria-hidden="true" />
      {name}
      {channel && (
        <Chip
          color={channelStyle.color}
          size="sm"
          variant={channelStyle.variant}>
          <Chip.Label>{channelConfig?.label ?? channel}</Chip.Label>
        </Chip>
      )}
    </span>
  )
}

const BrandLink = ({
  name,
  channel,
  logoSize,
  className,
  ...props
}: BrandLinkProps) => (
  <Link {...props} className={cn('inline-flex', className)}>
    <BrandRoot name={name} channel={channel} logoSize={logoSize} />
  </Link>
)

export const Brand = Object.assign(BrandRoot, { Link: BrandLink })
