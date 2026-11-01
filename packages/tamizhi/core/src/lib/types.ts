import type { Context, Plugin } from '@deepseek-ai/cordis'
import type { ZodType } from 'zod'

import type {
  ModelInfo,
  PermissionMode,
  RunRequest,
  StreamEvent,
  WireMessage
} from '@vezham/tamizhi-contracts'

export type TamizhiPlugin = Plugin.Object<void>
export interface Registry<T> {
  register: (context: Context, id: string, value: T) => void
  get: (id: string) => T | undefined
  entries: () => [string, T][]
}
export interface Principal {
  id: string
}
export interface ToolContext {
  principal: Principal
  conversationId: string
  signal: AbortSignal
}
export interface Tool {
  name: string
  description: string
  risk: 'read' | 'write' | 'external'
  inputSchema: ZodType
  execute: (input: unknown, context: ToolContext) => Promise<unknown>
}
export interface ProviderRequest extends RunRequest {
  signal: AbortSignal
  executeTool: (
    name: string,
    input: unknown,
    callId: string
  ) => Promise<unknown>
  tools: Tool[]
}
export interface Provider {
  models: ModelInfo[]
  stream: (request: ProviderRequest) => AsyncIterable<string>
}
export interface StoredConversation {
  id: string
  messages: WireMessage[]
  updatedAt: number
}
export interface Storage {
  get: (owner: string, id: string) => Promise<StoredConversation | undefined>
  put: (owner: string, conversation: StoredConversation) => Promise<void>
}
export interface PermissionPolicy {
  evaluate: (
    mode: PermissionMode,
    tool: Tool,
    principal: Principal
  ) => 'allow' | 'ask' | 'deny'
}
export interface Host {
  run: (
    request: RunRequest,
    principal: Principal,
    signal?: AbortSignal
  ) => AsyncIterable<StreamEvent>
  approve: (
    principal: Principal,
    runId: string,
    callId: string,
    approved: boolean
  ) => boolean
  conversation: (
    principal: Principal,
    id: string
  ) => Promise<StoredConversation | undefined>
  models: () => ModelInfo[]
  plugins: () => string[]
}
export interface TamizhiServices {
  providers: Registry<Provider>
  tools: Registry<Tool>
  storage: Registry<Storage>
  permissions: Registry<PermissionPolicy>
  transports: Registry<(request: Request) => Promise<Response>>
  host: Host
}
declare module '@deepseek-ai/cordis' {
  interface Context {
    tamizhi: TamizhiServices
  }
  interface Events {
    'tamizhi/event': (event: StreamEvent, principal: Principal) => void
  }
}
