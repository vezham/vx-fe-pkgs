import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type DeviceAuthorizationPluginOptions,
  deviceAuthorizationPlugin as coreDeviceAuthorizationPlugin
} from '@vezham/auth-ui-core/plugins/device-authorization'

import { DeviceAuthorization } from './device-authorization'

export const deviceAuthorizationPlugin = createAuthPlugin(
  coreDeviceAuthorizationPlugin.id,
  (options: DeviceAuthorizationPluginOptions = {}) => ({
    ...coreDeviceAuthorizationPlugin(options),
    views: {
      auth: {
        deviceAuthorization: DeviceAuthorization
      }
    }
  })
)
