import { expect, it } from 'vitest'

import { resolveOutfit } from './resolve-outfit'

it('preserves manual, run, activity, message, then profile outfit precedence', () => {
  const options = {
    manual: 'guard',
    run: 'bug',
    activity: 'money',
    message: 'write',
    profile: 'rest'
  } as const
  expect(resolveOutfit(options)).toBe('guard')
  expect(resolveOutfit({ ...options, manual: null })).toBe('bug')
  expect(resolveOutfit({ ...options, manual: null, run: undefined })).toBe(
    'money'
  )
  expect(
    resolveOutfit({
      ...options,
      manual: null,
      run: undefined,
      activity: undefined
    })
  ).toBe('write')
  expect(resolveOutfit({ manual: null, profile: 'rest' })).toBe('rest')
})
