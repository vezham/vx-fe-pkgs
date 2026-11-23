import type { AgentAuthClientPlugin } from '@vezham/auth-agent-auth/client'

import type { AuthClient } from '../../lib/auth-client'

export type AgentAuthClient = AuthClient<{
  plugins: [AgentAuthClientPlugin]
}>
