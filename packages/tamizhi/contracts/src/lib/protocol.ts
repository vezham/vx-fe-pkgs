import { z } from 'zod'

export const permissionModeSchema = z.enum(['ask', 'safe', 'full'])
export type PermissionMode = z.infer<typeof permissionModeSchema>

export const attachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number(),
  text: z.string().optional()
})
export const wireMessageSchema = z.object({
  id: z.string().max(128).optional(),
  attachments: z.array(attachmentSchema).max(8).optional(),
  role: z.enum(['user', 'assistant']),
  content: z.string().max(100_000),
  outfitLocked: z.boolean().optional(),
  profileId: z.string().min(1).max(128).optional(),
  persona: z
    .enum(['helper', 'coder', 'writer', 'planner', 'tutor', 'explorer'])
    .optional(),
  outfit: z
    .enum([
      'rest',
      'cook',
      'investigate',
      'write',
      'builder',
      'music',
      'tutor',
      'garden',
      'designer',
      'director',
      'coach',
      'traveller',
      'money',
      'planner',
      'captain',
      'tester',
      'guard',
      'bug'
    ])
    .optional()
})
export const runRequestSchema = z.object({
  activityProfiles: z
    .record(
      z.string().min(1).max(256),
      z.object({
        persona: wireMessageSchema.shape.persona,
        outfit: wireMessageSchema.shape.outfit
      })
    )
    .refine(value => Object.keys(value).length <= 64)
    .optional(),
  conversationId: z.string().min(1).max(128),
  messages: z.array(wireMessageSchema).min(1).max(200),
  title: z.string().max(128).optional(),
  expectedVersion: z.number().int().optional(),
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
  provider: z.string(),
  modalities: z.array(z.string()).optional(),
  contextWindow: z.number().optional(),
  fast: z.boolean().optional()
})
export type ModelInfo = z.infer<typeof modelInfoSchema>
export const pluginInfoSchema = z.object({
  required: z.boolean().optional(),
  error: z.string().optional(),
  name: z.string(),
  services: z.array(z.string()).optional(),
  kind: z.string().optional(),
  enabled: z.boolean().optional(),
  status: z.string().optional(),
  dependencies: z.array(z.string()).optional()
})
export type PluginInfo = z.infer<typeof pluginInfoSchema>

const eventIdentity = {
  runId: z.string(),
  conversationId: z.string(),
  sequence: z.number().int().optional(),
  parentRunId: z.string().optional()
}
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
  z.object({ ...eventIdentity, type: z.literal('error'), message: z.string() }),
  z.object({ ...eventIdentity, type: z.literal('status'), name: z.string() }),
  z.object({
    ...eventIdentity,
    type: z.literal('subagent'),
    output: z.unknown()
  }),
  z.object({
    ...eventIdentity,
    type: z.literal('subagent-event'),
    output: z.unknown()
  }),
  z.object({
    ...eventIdentity,
    type: z.literal('client-action'),
    output: z.object({ name: z.literal('navigate'), path: z.string() })
  })
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
  title: z.string().optional(),
  version: z.number().optional(),
  parentId: z.string().optional(),
  summary: z.string().optional(),
  messages: z
    .array(
      wireMessageSchema.extend({
        role: z.enum(['user', 'assistant', 'tool']),
        rating: z.string().optional(),
        tasks: z
          .array(z.object({ label: z.string(), done: z.boolean() }))
          .optional()
      })
    )
    .max(1000),
  updatedAt: z.number()
})
export type StoredConversationData = z.infer<typeof storedConversationSchema>
