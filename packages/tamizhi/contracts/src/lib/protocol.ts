import { z } from 'zod'

export const permissionModeSchema = z.enum(['ask', 'safe', 'full'])
export type PermissionMode = z.infer<typeof permissionModeSchema>

export const wireMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(100_000)
})
export const runRequestSchema = z.object({
  conversationId: z.string().min(1).max(128),
  messages: z.array(wireMessageSchema).min(1).max(60),
  model: z.string().min(1).max(256).optional(),
  fast: z.boolean().default(false),
  permission: permissionModeSchema.default('ask')
})
export type RunRequest = z.infer<typeof runRequestSchema>
export type WireMessage = z.infer<typeof wireMessageSchema>

export const approvalDecisionSchema = z.object({
  runId: z.string().min(1).max(128),
  callId: z.string().min(1).max(128),
  approved: z.boolean()
})
export type ApprovalDecision = z.infer<typeof approvalDecisionSchema>
export const modelInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string()
})
export type ModelInfo = z.infer<typeof modelInfoSchema>
export const pluginInfoSchema = z.object({
  name: z.string(),
  services: z.array(z.string())
})
export type PluginInfo = z.infer<typeof pluginInfoSchema>

const eventIdentity = { runId: z.string(), conversationId: z.string() }
export const streamEventSchema = z.discriminatedUnion('type', [
  z.object({ ...eventIdentity, type: z.literal('start') }),
  z.object({ ...eventIdentity, type: z.literal('text'), delta: z.string() }),
  z.object({
    ...eventIdentity,
    type: z.literal('tool'),
    callId: z.string(),
    name: z.string(),
    input: z.unknown()
  }),
  z.object({
    ...eventIdentity,
    type: z.literal('approval'),
    callId: z.string(),
    name: z.string(),
    input: z.unknown()
  }),
  z.object({
    ...eventIdentity,
    type: z.literal('tool-result'),
    callId: z.string(),
    name: z.string(),
    output: z.unknown()
  }),
  z.object({
    ...eventIdentity,
    type: z.literal('finish'),
    reason: z.enum(['complete', 'canceled'])
  }),
  z.object({ ...eventIdentity, type: z.literal('error'), message: z.string() })
])
export type StreamEvent = z.infer<typeof streamEventSchema>
export type ToolActivity = Extract<
  StreamEvent,
  { type: 'tool' | 'approval' | 'tool-result' }
>
export interface ApprovalRequest {
  runId: string
  callId: string
  name: string
  input: unknown
}

export const storedConversationSchema = z.object({
  id: z.string().min(1).max(128),
  messages: z.array(wireMessageSchema).max(60),
  updatedAt: z.number()
})
export type StoredConversationData = z.infer<typeof storedConversationSchema>
