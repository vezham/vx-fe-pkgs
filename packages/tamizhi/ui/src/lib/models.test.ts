import { expect, it } from 'vitest'

import { LEO_MODEL_ID, getAvailableModel } from './models'

const catalog = [
  { id: LEO_MODEL_ID, name: 'Leo', provider: 'leo' },
  { id: 'openai/example', name: 'Connected model', provider: 'openai' }
]
it('defaults connected chats to Leo and retains an explicit BYOK selection', () => {
  expect(getAvailableModel('Auto', catalog)).toBe(LEO_MODEL_ID)
  expect(getAvailableModel('openai/example', catalog)).toBe('openai/example')
  expect(getAvailableModel('removed-model', catalog)).toBe(LEO_MODEL_ID)
})
it('uses existing demo or non-Leo catalogs without inventing a connected model', () => {
  expect(getAvailableModel('Auto')).toBe('Auto')
  expect(getAvailableModel('Auto', [])).toBe('Auto')
  expect(getAvailableModel('Auto', catalog.slice(1))).toBe('Auto')
})
