import { expect, it } from 'vitest'

import { companionURL } from './companion'

it.each([
  'https://remote.example/api/tamizhi',
  'http://192.168.1.2/api/tamizhi',
  'http://user:secret@localhost/api/tamizhi',
  'http://localhost/private',
  'http://localhost/api/tamizhi?token=secret'
])('rejects a non-companion URL: %s', url => {
  expect(() => companionURL(url)).toThrow()
})
