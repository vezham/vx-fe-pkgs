import { expect, it } from 'vitest'

import { createEventQueue } from './queue'

it('surfaces a producer failure to the waiting consumer', async () => {
  const queue = createEventQueue<{ value: string }>()
  const iterator = queue.stream()
  const next = iterator.next()
  queue.fail(new Error('Producer failed'))
  await expect(next).rejects.toThrow('Producer failed')
})
