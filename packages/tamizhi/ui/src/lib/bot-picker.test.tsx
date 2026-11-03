import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { BotPicker } from './bot-picker'
import { getTamizhiProfiles } from './profiles'

vi.mock('./companion', () => ({
  Companion: ({ previewSize }: { previewSize: number }) => (
    <img alt="" width={previewSize} height={previewSize} />
  )
}))

afterEach(() => {
  cleanup()
  localStorage.clear()
})

const openPicker = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'Choose an assistant' }))
  return screen.findByRole('searchbox', { name: 'Search assistants' })
}

it('searches names and categories, handles empty results, and clears the filter', async () => {
  const profiles = getTamizhiProfiles()
  render(
    <BotPicker
      headingId="welcome"
      profile={profiles[0]}
      profiles={profiles}
      onSelect={vi.fn()}
    />
  )
  expect(screen.queryByRole('group', { name: 'Recent assistants' })).toBeNull()
  const search = await openPicker()
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(profiles.length)
  fireEvent.change(search, { target: { value: ' BuSiNeSs ' } })
  await waitFor(() =>
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(3)
  )
  expect(screen.getByRole('menuitemradio', { name: 'CRM' })).toBeTruthy()
  expect(
    screen.queryByRole('menuitemradio', { name: 'Bug Tracker' })
  ).toBeNull()
  fireEvent.change(search, { target: { value: 'unavailable assistant' } })
  expect(await screen.findByText('No matching assistants.')).toBeTruthy()
  fireEvent.click(
    screen.getByRole('button', { name: 'Clear assistant search' })
  )
  await waitFor(() =>
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(profiles.length)
  )
  fireEvent.keyDown(search, { key: 'Escape' })
  await waitFor(() =>
    expect(screen.queryByRole('menu', { name: 'Assistants' })).toBeNull()
  )
})

it('shows unique recent choices as chips outside the dropdown and excludes the selected profile', async () => {
  localStorage.setItem(
    'tamizhi.recent-profiles',
    JSON.stringify(['missing-app', 'vezham-crm', 'vezham-crm', 'vezham-qa'])
  )
  const profiles = getTamizhiProfiles()
  const onSelect = vi.fn()
  const props = {
    headingId: 'welcome',
    profile: profiles[0],
    profiles,
    onSelect
  }
  const view = render(<BotPicker {...props} />)
  const recent = await screen.findByRole('group', { name: 'Recent assistants' })
  expect(within(recent).getAllByRole('button')).toHaveLength(2)
  expect(within(recent).getByRole('button', { name: 'CRM' })).toBeTruthy()
  expect(
    within(within(recent).getByRole('button', { name: 'CRM' })).getByRole(
      'presentation'
    )
  ).toHaveAttribute('width', '28')
  const search = await openPicker()
  expect(screen.getAllByRole('menuitemradio')[0]).toBe(
    screen.getByRole('menuitemradio', { name: 'Tamizhi' })
  )
  expect(screen.queryByRole('group', { name: 'Recent' })).toBeNull()
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(profiles.length)
  fireEvent.change(search, { target: { value: 'Bug Tracker' } })
  fireEvent.click(
    await screen.findByRole('menuitemradio', { name: 'Bug Tracker' })
  )
  expect(onSelect).toHaveBeenCalledWith('vezham-bug-tracker')
  view.unmount()
  const restored = render(<BotPicker {...props} />)
  const chips = within(
    await screen.findByRole('group', { name: 'Recent assistants' })
  )
  expect(chips.getAllByRole('button')).toHaveLength(3)
  expect(chips.getAllByRole('button')[0]).toHaveTextContent('Bug Tracker')
  fireEvent.click(chips.getByRole('button', { name: 'CRM' }))
  expect(onSelect).toHaveBeenLastCalledWith('vezham-crm')
  const crm = profiles.find(item => item.id === 'vezham-crm')
  if (!crm) throw new Error('Missing CRM profile fixture')
  restored.rerender(<BotPicker {...props} profile={crm} />)
  expect(chips.queryByRole('button', { name: 'CRM' })).toBeNull()
  await openPicker()
  expect(screen.getByRole('menuitemradio', { name: 'CRM' })).toHaveAttribute(
    'aria-checked',
    'true'
  )
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(profiles.length)
})

it('keeps host-defined profiles without categories discoverable', async () => {
  const profiles = getTamizhiProfiles([
    {
      id: 'custom-app',
      name: 'Custom assistant',
      persona: 'helper',
      outfit: 'rest'
    }
  ])
  render(
    <BotPicker
      headingId="welcome"
      profile={profiles[0]}
      profiles={profiles}
      onSelect={vi.fn()}
    />
  )
  const search = await openPicker()
  fireEvent.change(search, { target: { value: 'Other apps' } })
  expect(
    await screen.findByRole('menuitemradio', { name: 'Custom assistant' })
  ).toBeTruthy()
  await waitFor(() =>
    expect(screen.getAllByRole('menuitemradio')).toHaveLength(1)
  )
})
