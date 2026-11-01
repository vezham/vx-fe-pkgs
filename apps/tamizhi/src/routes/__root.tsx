import { createRootRoute } from '@tanstack/react-router'

import { AppLayout } from '@vezham/react/layouts/app'
import { createRootComponent } from '@vezham/start/tanstack'

import { appMenu, controlCenter, navigationItems } from '@generated/navigation'
import { tanstackHead, vxI18n } from '@generated/vx'

import { tamizhiClient } from '../app/tamizhi-client'

export const Route = createRootRoute({
  head: () => tanstackHead,
  component: createRootComponent({
    lang: vxI18n.defaultLanguage,
    children: (
      <AppLayout
        tamizhi={{ client: tamizhiClient }}
        settings
        navigationItems={navigationItems}
        appMenu={appMenu}
        controlCenter={controlCenter}
        i18n={vxI18n}
      />
    )
  })
})
