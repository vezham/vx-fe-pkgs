import { expect, it } from 'vitest'

import { createLinkedAbortController } from './linked-abort'

it('forwards cancellation even when the source is already aborted', () => {
  const source = new AbortController()
  const linked = createLinkedAbortController(source.signal)
  expect(linked.controller.signal.aborted).toBe(false)
  source.abort()
  expect(linked.controller.signal.aborted).toBe(true)
  const late = createLinkedAbortController(source.signal)
  expect(late.controller.signal.aborted).toBe(true)
  linked.cleanup()
  late.cleanup()
})

it('detaches the source listener when a stream finishes', () => {
  const source = new AbortController()
  const linked = createLinkedAbortController(source.signal)
  linked.cleanup()
  source.abort()
  expect(linked.controller.signal.aborted).toBe(false)
  linked.abort()
  expect(linked.controller.signal.aborted).toBe(true)
})
