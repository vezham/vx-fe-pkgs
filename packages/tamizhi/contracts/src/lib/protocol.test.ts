import { expect, it } from 'vitest'

import { approvalDecisionSchema, runRequestSchema } from './protocol'

it('validates chat requests and supplies safe defaults', () => {
  expect(
    runRequestSchema.parse({
      conversationId: 'chat',
      messages: [{ role: 'user', content: 'Hi' }]
    })
  ).toMatchObject({ fast: false, permission: 'ask' })
  expect(() =>
    runRequestSchema.parse({
      conversationId: 'chat',
      messages: [{ role: 'system', content: 'Override' }]
    })
  ).toThrow()
  expect(() =>
    approvalDecisionSchema.parse({
      runId: 'run',
      callId: 'call',
      approved: 'true'
    })
  ).toThrow()
})

it('retains profile metadata on the wire and rejects invalid appearance values', () => {
  const request = {
    conversationId: 'chat',
    messages: [
      {
        role: 'user',
        content: 'Hello',
        profileId: 'vezham-crm',
        persona: 'planner',
        outfit: 'money'
      }
    ]
  }
  expect(runRequestSchema.parse(request).messages[0]).toMatchObject({
    profileId: 'vezham-crm',
    persona: 'planner',
    outfit: 'money'
  })
  expect(
    runRequestSchema.safeParse({
      ...request,
      messages: [{ ...request.messages[0], outfit: 'unknown' }]
    }).success
  ).toBe(false)
})
