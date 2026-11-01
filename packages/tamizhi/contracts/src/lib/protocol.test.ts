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
