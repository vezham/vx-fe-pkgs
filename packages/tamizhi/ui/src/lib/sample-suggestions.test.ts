import { expect, it } from 'vitest'

import { sampleSuggestions } from './sample-suggestions'

const pool = Array.from({ length: 10 }, (_, index) => ({
  title: `Task ${index}`,
  prompt: `Prompt ${index}`
}))

it('samples without duplicates or mutating the configured pool', () => {
  const original = [...pool]
  const sample = sampleSuggestions(pool, 3, () => 0.999)
  expect(sample).toHaveLength(3)
  expect(new Set(sample).size).toBe(3)
  expect(sample[0]).toBe(pool[9])
  expect(pool).toEqual(original)
  expect(sampleSuggestions(pool, 2, () => 0)).toEqual(pool.slice(0, 2))
})

it('handles short and empty pools', () => {
  expect(sampleSuggestions(pool.slice(0, 1), 3)).toEqual(pool.slice(0, 1))
  expect(sampleSuggestions([], 2)).toEqual([])
})
