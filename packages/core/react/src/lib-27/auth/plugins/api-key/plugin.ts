import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type ApiKeyPluginOptions,
  apiKeyPlugin as coreApiKeyPlugin
} from '@vezham/auth-ui-core/plugins/api-key'

import { ApiKeys } from './api-keys'
import { OrganizationApiKeys } from './organization-api-keys'

export const apiKeyPlugin = createAuthPlugin(
  coreApiKeyPlugin.id,
  (options: ApiKeyPluginOptions = {}) => {
    const core = coreApiKeyPlugin(options)

    return {
      ...core,
      securityCards: [ApiKeys],
      ...(core.organization ? { organizationCards: [OrganizationApiKeys] } : {})
    }
  }
)
