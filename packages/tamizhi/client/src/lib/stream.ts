import { streamEventSchema } from '@vezham/tamizhi-contracts'
import type { StreamEvent } from '@vezham/tamizhi-contracts'

export const readEventStream = async function* (
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal
): AsyncGenerator<StreamEvent> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  const abort = () => {
    void reader.cancel()
  }
  signal?.addEventListener('abort', abort, { once: true })
  if (signal?.aborted) abort()
  let finished = false
  try {
    for (;;) {
      signal?.throwIfAborted()
      const { value, done } = await reader.read()
      buffer += done
        ? decoder.decode()
        : decoder.decode(value, { stream: true })
      if (buffer.length > 1_000_000)
        throw new Error('Stream event exceeds the maximum size')
      buffer = buffer.replace(/\r\n/g, '\n')
      let boundary = buffer.indexOf('\n\n')
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 2)
        const data = frame
          .split('\n')
          .filter(line => line.startsWith('data:'))
          .map(line => line.slice(5).trimStart())
          .join('\n')
        if (data) {
          const event = streamEventSchema.parse(JSON.parse(data))
          if (event.type === 'finish' || event.type === 'error') finished = true
          yield event
        }
        boundary = buffer.indexOf('\n\n')
      }
      if (done) break
    }
    signal?.throwIfAborted()
    if (!finished)
      throw new Error('The response stream ended before completion')
  } finally {
    signal?.removeEventListener('abort', abort)
    await reader.cancel().catch(() => undefined)
    reader.releaseLock()
  }
}
