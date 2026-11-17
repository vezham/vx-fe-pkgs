import { Link, useRouter } from '@tanstack/react-router'
import type { ComponentPropsWithoutRef } from 'react'

import { Globe, Smartphone } from '@vezham/icons-react'
import { Tabs } from '@vezham/react-v3'

import { getUiLibraryRoute } from '@components/docs/library-routes'
import { platformIconVariants } from '@components/docs/navigation.variants'
import { type UiLibrary, uiPlatforms } from '@config/ui-libraries'

type Platform = 'web' | 'native'

type Props = {
  library?: UiLibrary
  getPlatformParams: (platform: Platform) => {
    _splat: string
    lang: string | undefined
    platform: Platform
  }
  platform: Platform
  platforms: readonly Platform[]
}

export const PlatformTabs = ({
  library = 'react',
  getPlatformParams,
  platform,
  platforms
}: Props) => {
  const router = useRouter()
  if (platforms.length === 0) return null
  const getHref = (value: Platform) =>
    router.buildLocation({
      to: getUiLibraryRoute(library),
      params: getPlatformParams(value)
    }).href
  return (
    <Tabs selectedKey={platform} keyboardActivation="manual">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Documentation platform">
          {platforms.includes('web') && (
            <Tabs.Tab
              id="web"
              href={getHref('web')}
              render={props => {
                const linkProps = {
                  ...(props as ComponentPropsWithoutRef<'a'>)
                }
                delete linkProps.href
                return (
                  <Link
                    {...linkProps}
                    to={getUiLibraryRoute(library)}
                    params={getPlatformParams('web')}
                  />
                )
              }}>
              <Globe
                size={16}
                className={platformIconVariants({
                  platform: 'web',
                  selected: platform === 'web'
                })}
              />
              {uiPlatforms.web}
              <Tabs.Indicator />
            </Tabs.Tab>
          )}
          {platforms.includes('native') && (
            <Tabs.Tab
              id="native"
              href={getHref('native')}
              render={props => {
                const linkProps = {
                  ...(props as ComponentPropsWithoutRef<'a'>)
                }
                delete linkProps.href
                return (
                  <Link
                    {...linkProps}
                    to={getUiLibraryRoute(library)}
                    params={getPlatformParams('native')}
                  />
                )
              }}>
              <Smartphone
                size={16}
                className={platformIconVariants({
                  platform: 'native',
                  selected: platform === 'native'
                })}
              />
              {uiPlatforms.native}
              <Tabs.Indicator />
            </Tabs.Tab>
          )}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
}
