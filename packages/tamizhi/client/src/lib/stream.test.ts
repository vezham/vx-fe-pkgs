import { expect, it } from 'vitest'

import { readEventStream } from './stream'

const encode = (parts: string[]) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const part of parts)
        controller.enqueue(new TextEncoder().encode(part))
      controller.close()
    }
  })
it('reads fragmented UTF-8 SSE frames and verifies completion', async () => {
  const identity = { runId: 'run', conversationId: 'chat' }
  const source = `data: ${JSON.stringify({ ...identity, type: 'text', delta: 'வணக்கம்' })}\n\ndata: ${JSON.stringify({ ...identity, type: 'finish', reason: 'complete' })}\n\n`
  const stream = encode([
    source.slice(0, 12),
    source.slice(12, 75),
    source.slice(75)
  ])
  const events = []
  for await (const event of readEventStream(stream)) events.push(event)
  expect(events[0]).toMatchObject({ type: 'text', delta: 'வணக்கம்' })
  expect(events[1].type).toBe('finish')
})
it('rejects silently truncated replies', async () => {
  const stream = encode([
    'data: {"type":"text","runId":"r","conversationId":"c","delta":"Hi"}\n\n'
  ])
  await expect(async () => {
    for await (const event of readEventStream(stream)) void event
  }).rejects.toThrow('before completion')
})
it('rejects invalid wire events', async () => {
  await expect(async () => {
    for await (const event of readEventStream(
      encode(['data: {"type":"unknown"}\n\n'])
    ))
      void event
  }).rejects.toThrow()
})
