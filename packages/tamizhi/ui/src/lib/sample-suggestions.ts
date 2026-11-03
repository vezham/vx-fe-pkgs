import type { TamizhiSuggestion } from '@vezham/tamizhi-contracts'

export const sampleSuggestions = (
  suggestions: readonly TamizhiSuggestion[],
  limit: number,
  random: () => number = Math.random
): TamizhiSuggestion[] => {
  const pool = [...suggestions]
  const count = Math.min(limit, pool.length)
  for (let index = 0; index < count; index++) {
    const selected = index + Math.floor(random() * (pool.length - index))
    ;[pool[index], pool[selected]] = [pool[selected], pool[index]]
  }
  return pool.slice(0, count)
}
