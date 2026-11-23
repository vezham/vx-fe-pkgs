import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type AgentAuthPluginOptions,
  agentAuthPlugin as coreAgentAuthPlugin
} from '@vezham/auth-ui-core/plugins/agent-auth'

import { AgentApproval } from './agent-approval'
import { AgentAuthorizations } from './agent-authorizations'

export const agentAuthPlugin = createAuthPlugin(
  coreAgentAuthPlugin.id,
  (options: AgentAuthPluginOptions) => {
    const core = coreAgentAuthPlugin(options)
    return {
      ...core,
      views: { auth: { agentApproval: AgentApproval } },
      securityCards: core.grants ? [AgentAuthorizations] : []
    }
  }
)
