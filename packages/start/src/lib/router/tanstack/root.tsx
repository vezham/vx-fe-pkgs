import { Outlet } from '@tanstack/react-router'

import { APP_ENV, APP_ID, APP_NAME, APP_VER, __DEV__ } from '@vezham/env/vite'
import { NotFound } from '@vezham/template/components'

import { ClientDevtools } from '../../provider/shared/devtools'

export const RouterRoot = () => (
  <>
    <Outlet />
    <ClientDevtools
      app={{
        id: APP_ID,
        name: APP_NAME,
        version: APP_VER,
        environment: APP_ENV,
        runtime: 'vite'
      }}
      env={__DEV__}
    />
  </>
)

export const DefaultNotFound = () => (
  <NotFound app={APP_NAME} version={APP_VER} />
)
