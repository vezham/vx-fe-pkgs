import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'

import { Composer } from './composer'

afterEach(cleanup)

it('removes exactly one same-named attachment and sends the remaining file', async () => {
  const onSend = vi.fn()
  render(
    <Composer
      isStreaming={false}
      isReady
      isOffline={false}
      model="Auto"
      onModelChange={vi.fn()}
      isFastMode={false}
      onFastModeChange={vi.fn()}
      permission="Ask for approval"
      onPermissionChange={vi.fn()}
      avatarSlotRef={createRef()}
      inputRef={createRef()}
      onListeningChange={vi.fn()}
      onSend={onSend}
      onStop={vi.fn()}
    />
  )
  const first = {
    name: 'notes.txt',
    size: 5,
    text: async () => 'first'
  } as File
  const second = {
    name: 'notes.txt',
    size: 6,
    text: async () => 'second'
  } as File
  fireEvent.change(
    screen.getByLabelText('Attach files', { selector: 'input' }),
    { target: { files: [first, second] } }
  )
  const remove = screen.getAllByRole('button', { name: 'Remove notes.txt' })
  expect(remove).toHaveLength(2)
  fireEvent.click(remove[0])
  expect(
    screen.getAllByRole('button', { name: 'Remove notes.txt' })
  ).toHaveLength(1)
  fireEvent.change(screen.getByRole('textbox', { name: 'Message Tamizhi' }), {
    target: { value: 'Read this' }
  })
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
  await waitFor(() =>
    expect(onSend).toHaveBeenCalledWith('Read this\n\nFile: notes.txt\nsecond')
  )
  expect(screen.queryByRole('button', { name: 'Remove notes.txt' })).toBeNull()
})
