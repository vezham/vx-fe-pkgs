import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, expect, it, vi } from 'vitest'

import { seedIndexedDB } from '../../test-setup'
import { TamizhiEmbed } from './embed'
import { TamizhiSessionProvider } from './session'

vi.mock('./companion', () => ({
  Companion: ({ outfit, persona }: { outfit: string; persona?: string }) => (
    <span
      data-testid="test-avatar"
      data-outfit={outfit}
      data-persona={persona}
    />
  )
}))
vi.mock('./playground-panel', () => ({
  PlaygroundPanel: ({
    children,
    isOpen
  }: {
    children: ReactNode
    isOpen: boolean
  }) => (isOpen ? <aside aria-label="Tuning">{children}</aside> : null)
}))

afterEach(() => {
  cleanup()
  localStorage.clear()
})

it('switches embedded test profiles and clears manual avatar overrides', async () => {
  render(
    <TamizhiSessionProvider appId="vezham-crm" storageKey="test:tuning">
      <TamizhiEmbed />
    </TamizhiSessionProvider>
  )
  fireEvent.click(screen.getByRole('button', { name: 'Tamizhi tuning' }))
  fireEvent.click(screen.getByRole('button', { name: 'Choose outfit' }))
  fireEvent.click(await screen.findByRole('menuitemradio', { name: 'Guard' }))
  expect(screen.getAllByTestId('test-avatar')[0]).toHaveAttribute(
    'data-outfit',
    'guard'
  )
  fireEvent.click(screen.getByRole('button', { name: 'Choose test profile' }))
  fireEvent.click(
    await screen.findByRole('menuitemradio', { name: /^School OS/ })
  )
  expect(
    await screen.findByRole('heading', {
      name: 'How can I help with School OS?'
    })
  ).toBeTruthy()
  expect(screen.getAllByTestId('test-avatar')[0]).toHaveAttribute(
    'data-outfit',
    'tutor'
  )
  expect(screen.getAllByTestId('test-avatar')[0]).toHaveAttribute(
    'data-persona',
    'tutor'
  )
  expect(
    screen.queryByRole('button', { name: 'Choose an assistant' })
  ).toBeNull()
})

it('starts a fresh test profile conversation and preserves the previous history', async () => {
  await seedIndexedDB('test:tuning-history.vezham-crm', [
    {
      id: 'saved-chat',
      title: 'Saved conversation',
      messages: [
        {
          id: 'user',
          role: 'user',
          text: 'Previous question',
          persona: 'planner',
          profileId: 'vezham-crm',
          outfit: 'planner'
        },
        {
          id: 'answer',
          role: 'assistant',
          text: 'Previous answer',
          persona: 'planner',
          profileId: 'vezham-crm',
          outfit: 'planner'
        }
      ]
    }
  ])
  render(
    <TamizhiSessionProvider appId="vezham-crm" storageKey="test:tuning-history">
      <TamizhiEmbed />
    </TamizhiSessionProvider>
  )
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Choose a Tamizhi chat' })
    ).toBeEnabled()
  )
  fireEvent.click(screen.getByRole('button', { name: 'Choose a Tamizhi chat' }))
  fireEvent.click(
    await screen.findByRole('menuitem', { name: 'Saved conversation' })
  )
  expect(await screen.findByText('Previous answer')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Tamizhi tuning' }))
  expect(screen.getByText('Changing profile starts a new chat.')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Choose test profile' }))
  fireEvent.click(
    await screen.findByRole('menuitemradio', { name: /^School OS/ })
  )
  expect(
    await screen.findByRole('heading', {
      name: 'How can I help with School OS?'
    })
  ).toBeTruthy()
  expect(screen.queryByText('Previous answer')).toBeNull()
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Choose a Tamizhi chat' })
    ).toBeEnabled()
  )
  fireEvent.click(screen.getByRole('button', { name: 'Choose a Tamizhi chat' }))
  fireEvent.click(
    await screen.findByRole('menuitem', { name: 'Saved conversation' })
  )
  await waitFor(() => expect(screen.getByText('Previous answer')).toBeTruthy())
})
