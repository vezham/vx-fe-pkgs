import { expect, it } from 'vitest'

import { readTextAttachments } from './attachments'

it('includes attached file contents in messages', async () => {
  const file = {
    name: 'notes.md',
    size: 12,
    text: async () => 'meeting notes'
  } as File
  expect(await readTextAttachments([file])).toEqual([
    'File: notes.md\nmeeting notes'
  ])
})
it('rejects unsupported and oversized files instead of discarding them', async () => {
  await expect(
    readTextAttachments([new File(['pdf'], 'report.pdf')])
  ).rejects.toThrow('TXT, Markdown, CSV, or JSON')
  await expect(
    readTextAttachments([new File(['x'.repeat(20_001)], 'notes.txt')])
  ).rejects.toThrow('20 KB')
})
