import { z } from 'zod'

export const idSchema = z.uuid()
export const timestampSchema = z.iso.datetime()
export const roleSchema = z.enum([
  'owner',
  'admin',
  'editor',
  'commenter',
  'reader'
])
export const fieldTypeSchema = z.enum([
  'text',
  'number',
  'boolean',
  'select',
  'multi_select',
  'date',
  'email',
  'phone',
  'url',
  'collaborator',
  'file',
  'relation',
  'rollup',
  'created_at',
  'created_by',
  'updated_at',
  'updated_by'
])
export const cellSchema = z.union([
  z.string(),
  z.number().finite(),
  z.boolean(),
  z.array(z.string()),
  z.null()
])
export const fieldSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1).max(120),
  type: fieldTypeSchema,
  options: z.array(z.string().trim().min(1).max(120)).max(100),
  required: z.boolean(),
  relationDatabaseId: idSchema.nullable(),
  relationFieldId: idSchema.nullable(),
  targetFieldId: idSchema.nullable(),
  aggregation: z.enum(['count', 'sum', 'average', 'min', 'max'])
})
export const filterSchema = z.object({
  id: idSchema,
  fieldId: idSchema,
  operator: z.enum(['contains', 'equals', 'not_equals', 'empty', 'gt', 'lt']),
  value: z.string()
})
export const viewSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1).max(120),
  type: z.enum(['table', 'board', 'calendar']),
  groupFieldId: idSchema.nullable(),
  dateFieldId: idSchema.nullable(),
  sortFieldId: idSchema.nullable(),
  sortDescending: z.boolean(),
  filters: z.array(filterSchema).max(50),
  hiddenFields: z.array(idSchema)
})
const common = {
  id: idSchema,
  parentId: idSchema.nullable(),
  title: z.string().trim().min(1).max(240),
  icon: z.string().max(12),
  position: z.number().finite(),
  revision: z.number().int().positive(),
  remoteId: idSchema.nullable(),
  remoteRevision: z.number().int().nonnegative().nullable(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  createdBy: idSchema,
  updatedBy: idSchema,
  deletedAt: timestampSchema.nullable(),
  trashGroupId: idSchema.nullable(),
  locked: z.boolean(),
  pinned: z.boolean()
}
export const pageSchema = z.object({
  ...common,
  kind: z.literal('page'),
  data: z.object({
    document: z.json(),
    text: z.string().max(2_000_000),
    cover: z.string().max(64)
  })
})
export const databaseSchema = z.object({
  ...common,
  kind: z.literal('database'),
  data: z.object({
    fields: z.array(fieldSchema).max(100),
    views: z.array(viewSchema).max(30)
  })
})
export const recordSchema = z.object({
  ...common,
  kind: z.literal('record'),
  data: z.object({
    values: z.record(idSchema, cellSchema),
    document: z.json(),
    text: z.string().max(2_000_000)
  })
})
export const messageSchema = z.object({
  ...common,
  kind: z.literal('message'),
  data: z.object({
    text: z.string().min(1).max(30_000),
    replyTo: idSchema.nullable(),
    attachments: z.array(idSchema).max(20),
    reactions: z.record(z.string().max(16), z.array(idSchema).max(1000))
  })
})
export const fileSchema = z.object({
  ...common,
  kind: z.literal('file'),
  data: z.object({
    mimeType: z.string().max(255),
    size: z.number().int().nonnegative().max(50_000_000),
    blobId: idSchema,
    checksum: z.string().max(128).nullable()
  })
})
export const nodeSchema = z.discriminatedUnion('kind', [
  z.object({
    ...common,
    kind: z.literal('space'),
    data: z.object({ description: z.string().max(5000) })
  }),
  z.object({ ...common, kind: z.literal('folder'), data: z.object({}) }),
  pageSchema,
  databaseSchema,
  recordSchema,
  z.object({
    ...common,
    kind: z.literal('channel'),
    data: z.object({
      topic: z.string().max(5000),
      archived: z.boolean(),
      isDirect: z.boolean(),
      participants: z.array(idSchema).max(100)
    })
  }),
  messageSchema,
  fileSchema
])
export const mutationSchema = z
  .object({
    id: idSchema,
    entityId: idSchema,
    clientId: idSchema,
    sequence: z.number().int().positive(),
    entityRevision: z.number().int().positive(),
    operation: z.enum(['upsert', 'tombstone', 'purge']),
    node: nodeSchema.nullable(),
    remoteId: idSchema.nullable(),
    expectedRemoteRevision: z.number().int().nonnegative().nullable(),
    createdAt: timestampSchema,
    status: z.enum(['pending', 'conflict', 'rejected']),
    error: z.string().nullable()
  })
  .superRefine((value, context) => {
    if (value.operation === 'purge') {
      if (value.node !== null)
        context.addIssue({
          code: 'custom',
          message: 'A purge must not include document content.'
        })
      return
    }
    if (!value.node) {
      context.addIssue({
        code: 'custom',
        message: 'An upsert or tombstone requires an entity snapshot.'
      })
      return
    }
    if (
      value.node.id !== value.entityId ||
      value.node.revision !== value.entityRevision
    )
      context.addIssue({
        code: 'custom',
        message:
          'Mutation identity and revision must match the entity snapshot.'
      })
    if (Boolean(value.node.deletedAt) !== (value.operation === 'tombstone'))
      context.addIssue({
        code: 'custom',
        message: 'Mutation operation must match the entity deletion state.'
      })
  })
export const historySchema = z.object({
  id: idSchema,
  nodeId: idSchema,
  createdAt: timestampSchema,
  node: nodeSchema
})
export const activitySchema = z.object({
  id: idSchema,
  nodeId: idSchema,
  title: z.string(),
  action: z.string(),
  createdAt: timestampSchema
})
export const stateSchema = z.object({
  schemaVersion: z.literal(1),
  clientId: idSchema.nullable(),
  sequence: z.number().int().nonnegative(),
  nodes: z.record(idSchema, nodeSchema),
  favorites: z.array(idSchema),
  readCursors: z.record(z.string(), timestampSchema),
  history: z.array(historySchema),
  activity: z.array(activitySchema),
  outbox: z.array(mutationSchema),
  purged: z.record(z.string(), timestampSchema)
})
export const backupSchema = z.object({
  format: z.literal('vezham.workspace'),
  version: z.literal(1),
  exportedAt: timestampSchema,
  state: stateSchema,
  files: z.record(
    z.string(),
    z.object({ mimeType: z.string(), base64: z.string() })
  )
})
export type WorkspaceNode = z.infer<typeof nodeSchema>
export type NodeKind = WorkspaceNode['kind']
export type DatabaseNode = z.infer<typeof databaseSchema>
export type Field = z.infer<typeof fieldSchema>
export type FieldType = z.infer<typeof fieldTypeSchema>
export type CellValue = z.infer<typeof cellSchema>
export type DatabaseView = z.infer<typeof viewSchema>
export type DatabaseFilter = z.infer<typeof filterSchema>
export type WorkspaceState = z.infer<typeof stateSchema>
export type WorkspaceMutation = z.infer<typeof mutationSchema>
export type WorkspaceBackup = z.infer<typeof backupSchema>
export const EMPTY_WORKSPACE: WorkspaceState = {
  schemaVersion: 1,
  clientId: null,
  sequence: 0,
  nodes: {},
  favorites: [],
  readCursors: {},
  history: [],
  activity: [],
  outbox: [],
  purged: {}
}
