'use client'

import { DeviceAuthorization as DeviceAuthorizationRoot } from './device-authorization'
import { deviceAuthorizationPlugin } from './plugin'

export type * from './device-authorization'
export type * from './plugin'

export const DeviceAuthorization = Object.assign(DeviceAuthorizationRoot, {
  plugin: deviceAuthorizationPlugin
})
