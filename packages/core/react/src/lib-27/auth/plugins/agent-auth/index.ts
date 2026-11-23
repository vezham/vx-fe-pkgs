'use client'

import { AgentApproval } from './agent-approval'
import { AgentAuthorizations } from './agent-authorizations'
import { agentAuthPlugin } from './plugin'

export type * from './plugin'
export type * from './agent-approval'
export type * from './agent-authorizations'

export const AgentAuth = {
  plugin: agentAuthPlugin,
  Approval: AgentApproval,
  Authorizations: AgentAuthorizations
}
