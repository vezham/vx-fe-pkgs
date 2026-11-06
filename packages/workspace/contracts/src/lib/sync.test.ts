import { describe, expect, it } from 'vitest'

import { EMPTY_WORKSPACE, mutationSchema } from './schema'
import type { WorkspaceMutation, WorkspaceState } from './schema'
import { applyPushResponse, createPushBatch } from './sync'
import type { PushResponse } from './sync'

const client = '10000000-0000-4000-8000-000000000001',
  entity = '20000000-0000-4000-8000-000000000001',
  remote = '30000000-0000-4000-8000-000000000001'
const operation = (sequence: number): WorkspaceMutation => ({
  id: `40000000-0000-4000-8000-${String(sequence).padStart(12, '0')}`,
  entityId: entity,
  clientId: client,
  sequence,
  entityRevision: sequence,
  operation: 'purge',
  node: null,
  remoteId: null,
  expectedRemoteRevision: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  status: 'pending',
  error: null
})
const initial = (): WorkspaceState => ({
  ...EMPTY_WORKSPACE,
  clientId: client,
  sequence: 2,
  outbox: [operation(1), operation(2)]
})
const response = (
  status: 'accepted' | 'conflict' = 'accepted'
): PushResponse => ({
  version: 1,
  clientId: client,
  workspaceLocalId: 'local',
  workspaceRemoteId: remote,
  serverTime: '2026-01-01T00:00:00.000Z',
  cursor: '1',
  results: [
    {
      operationId: operation(1).id,
      entityId: entity,
      entityRevision: 1,
      status,
      remoteId: remote,
      remoteRevision: 1,
      error: status === 'conflict' ? 'Changed on server' : null,
      serverNode: null
    }
  ]
})
const requiredBatch = (state: WorkspaceState) => {
  const batch = createPushBatch(state, 'crm', 'local')
  if (!batch) throw new Error('Missing test batch')
  return batch
}
describe('future cloud push contract', () => {
  it('sends at most the earliest pending mutation per entity', () => {
    expect(createPushBatch(initial(), 'crm', 'local')?.mutations).toEqual([
      operation(1)
    ])
    expect(createPushBatch(EMPTY_WORKSPACE, 'crm', 'local')).toBeNull()
  })
  it('removes only acknowledged operations and preserves changes made during upload', () => {
    const state = initial(),
      request = requiredBatch(state)
    const next = applyPushResponse(
      { ...state, outbox: [...state.outbox, operation(3)] },
      request,
      response()
    )
    expect(next.outbox.map(item => item.sequence)).toEqual([2, 3])
    expect(next.outbox[0].remoteId).toBe(remote)
    expect(next.outbox[0].expectedRemoteRevision).toBe(1)
    expect(state.outbox).toHaveLength(2)
  })
  it('preserves conflicts and blocks later edits of the same entity', () => {
    const state = initial(),
      request = requiredBatch(state)
    const next = applyPushResponse(state, request, response('conflict'))
    expect(next.outbox[0].status).toBe('conflict')
    expect(createPushBatch(next, 'crm', 'local')?.mutations).toHaveLength(0)
  })
  it('rejects foreign, unknown, and duplicate acknowledgements', () => {
    const state = initial(),
      request = requiredBatch(state),
      ack = response()
    expect(() =>
      applyPushResponse(state, request, { ...ack, workspaceLocalId: 'foreign' })
    ).toThrow('another workspace')
    expect(() =>
      applyPushResponse(state, request, {
        ...ack,
        results: [ack.results[0], ack.results[0]]
      })
    ).toThrow('Duplicate')
    expect(() =>
      applyPushResponse(state, request, {
        ...ack,
        results: [{ ...ack.results[0], entityRevision: 9 }]
      })
    ).toThrow('Unknown')
  })
})

it('rejects content-bearing purges and malformed push envelopes', () => {
  const invalid = { ...operation(1), operation: 'upsert' }
  expect(mutationSchema.safeParse(invalid).success).toBe(false)
})

it('does not rewind a newer remote revision when an old acknowledgement is retried', () => {
  const original = initial()
  const request = requiredBatch(original)
  const current = {
    ...original,
    outbox: [{ ...operation(3), remoteId: remote, expectedRemoteRevision: 4 }]
  }
  const next = applyPushResponse(current, request, response())
  expect(next.outbox[0].expectedRemoteRevision).toBe(4)
  expect(() =>
    applyPushResponse(
      { ...current, outbox: [{ ...current.outbox[0], remoteId: entity }] },
      request,
      response()
    )
  ).toThrow('Remote identifier')
})
