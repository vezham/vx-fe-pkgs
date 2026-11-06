import { z } from 'zod'

import { idSchema, mutationSchema, nodeSchema, timestampSchema } from './schema'
import type { WorkspaceState } from './schema'

export const pushRequestSchema = z
  .object({
    version: z.literal(1),
    appId: z.string().min(1),
    workspaceLocalId: z.string().min(1),
    workspaceRemoteId: idSchema.nullable(),
    clientId: idSchema,
    mutations: z.array(mutationSchema).max(100)
  })
  .superRefine((value, context) => {
    const operations = new Set(value.mutations.map(item => item.id))
    if (operations.size !== value.mutations.length)
      context.addIssue({
        code: 'custom',
        message: 'Operation IDs must be unique in a push batch.'
      })
    if (
      value.mutations.some(
        item => item.clientId !== value.clientId || item.status !== 'pending'
      )
    )
      context.addIssue({
        code: 'custom',
        message:
          'A push batch must contain pending operations from its own client.'
      })
  })
export const pushResultSchema = z.object({
  operationId: idSchema,
  entityId: idSchema,
  entityRevision: z.number().int().positive(),
  status: z.enum(['accepted', 'conflict', 'rejected']),
  remoteId: idSchema.nullable(),
  remoteRevision: z.number().int().nonnegative().nullable(),
  error: z.string().nullable(),
  serverNode: nodeSchema.nullable()
})
export const pushResponseSchema = z.object({
  version: z.literal(1),
  clientId: idSchema,
  workspaceLocalId: z.string(),
  workspaceRemoteId: idSchema,
  results: z.array(pushResultSchema).max(100),
  serverTime: timestampSchema,
  cursor: z.string()
})
export const changeFeedSchema = z.object({
  version: z.literal(1),
  changes: z.array(
    z.object({
      cursor: z.string(),
      operation: z.enum(['upsert', 'tombstone', 'purge']),
      entityId: idSchema,
      remoteId: idSchema,
      remoteRevision: z.number().int().nonnegative(),
      node: nodeSchema.nullable()
    })
  ),
  nextCursor: z.string(),
  hasMore: z.boolean()
})
export type PushRequest = z.infer<typeof pushRequestSchema>
export type PushResponse = z.infer<typeof pushResponseSchema>

export const createPushBatch = (
  state: WorkspaceState,
  appId: string,
  workspaceLocalId: string,
  workspaceRemoteId: string | null = null
): PushRequest | null => {
  if (!state.clientId) return null
  const seen = new Set<string>()
  const mutations = state.outbox
    .filter(item => {
      if (seen.has(item.entityId)) return false
      seen.add(item.entityId)
      return item.status === 'pending'
    })
    .slice(0, 100)
  return pushRequestSchema.parse({
    version: 1,
    appId,
    workspaceLocalId,
    workspaceRemoteId,
    clientId: state.clientId,
    mutations
  })
}

export const applyPushResponse = (
  state: WorkspaceState,
  request: PushRequest,
  input: unknown
): WorkspaceState => {
  const response = pushResponseSchema.parse(input)
  if (
    state.clientId !== request.clientId ||
    (request.workspaceRemoteId !== null &&
      response.workspaceRemoteId !== request.workspaceRemoteId) ||
    response.clientId !== request.clientId ||
    response.workspaceLocalId !== request.workspaceLocalId
  )
    throw new Error('Push response belongs to another workspace or client.')
  const sent = new Map(request.mutations.map(item => [item.id, item]))
  const accepted = new Set<string>()
  const results = new Map(
    response.results.map(item => [item.operationId, item])
  )
  if (results.size !== response.results.length)
    throw new Error('Duplicate push acknowledgement.')
  const nodes = { ...state.nodes }
  for (const result of response.results) {
    const operation = sent.get(result.operationId)
    if (
      !operation ||
      operation.entityId !== result.entityId ||
      operation.entityRevision !== result.entityRevision
    )
      throw new Error('Unknown push acknowledgement.')
    if (result.status === 'accepted') {
      if (!result.remoteId || result.remoteRevision === null)
        throw new Error('Accepted changes require a remote mapping.')
      const mappings = [
        operation.remoteId,
        nodes[result.entityId]?.remoteId,
        ...state.outbox
          .filter(item => item.entityId === result.entityId)
          .map(item => item.remoteId)
      ].filter(Boolean)
      if (mappings.some(remoteId => remoteId !== result.remoteId))
        throw new Error('Remote identifier changed unexpectedly.')
      if (result.remoteRevision < (operation.expectedRemoteRevision ?? 0))
        throw new Error('Remote revision moved backwards.')
      accepted.add(result.operationId)
      const current = nodes[result.entityId]
      if (current)
        nodes[current.id] = {
          ...current,
          remoteId: result.remoteId,
          remoteRevision: Math.max(
            current.remoteRevision ?? 0,
            result.remoteRevision
          )
        }
    }
  }
  const outbox = state.outbox
    .filter(item => !accepted.has(item.id))
    .map(item => {
      const result = results.get(item.id)
      if (result && result.status !== 'accepted')
        return { ...item, status: result.status, error: result.error }
      const acknowledgement = response.results.find(
        result =>
          result.entityId === item.entityId && result.status === 'accepted'
      )
      if (acknowledgement)
        return {
          ...item,
          remoteId: acknowledgement.remoteId,
          expectedRemoteRevision: Math.max(
            item.expectedRemoteRevision ?? 0,
            nodes[item.entityId]?.remoteRevision ?? 0,
            acknowledgement.remoteRevision ?? 0
          )
        }
      const current = nodes[item.entityId]
      return current
        ? {
            ...item,
            remoteId: current.remoteId,
            expectedRemoteRevision: current.remoteRevision
          }
        : item
    })
  return { ...state, nodes, outbox }
}

export const fileUploadRequestSchema = z.object({
  version: z.literal(1),
  entityLocalId: idSchema,
  blobLocalId: idSchema,
  remoteId: idSchema.nullable(),
  mimeType: z.string().min(1).max(255),
  byteSize: z.number().int().nonnegative().max(50_000_000),
  sha256: z.string().regex(/^[0-9a-f]{64}$/)
})
export const fileUploadLeaseSchema = z.object({
  version: z.literal(1),
  uploadId: idSchema,
  method: z.literal('PUT'),
  url: z
    .url()
    .refine(value => /^https:\/\//i.test(value), 'Uploads require HTTPS.'),
  headers: z.record(z.string(), z.string()),
  expiresAt: timestampSchema
})
export const fileUploadCompleteSchema = z.object({
  version: z.literal(1),
  uploadId: idSchema,
  sha256: z.string().regex(/^[0-9a-f]{64}$/)
})
export type FileUploadRequest = z.infer<typeof fileUploadRequestSchema>
export type FileUploadLease = z.infer<typeof fileUploadLeaseSchema>
