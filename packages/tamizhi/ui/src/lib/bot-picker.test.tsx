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

it('keeps Tamizhi first and restores recent choices once each after remounting', async () => {
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
  const search = await openPicker()
  expect(screen.getAllByRole('menuitemradio')[0]).toBe(
    screen.getByRole('menuitemradio', { name: 'Tamizhi' })
  )
  expect(
    within(screen.getByRole('group', { name: 'Recent' })).getAllByRole(
      'menuitemradio'
    )
  ).toHaveLength(2)
  fireEvent.change(search, { target: { value: 'Bug Tracker' } })
  fireEvent.click(
    await screen.findByRole('menuitemradio', { name: 'Bug Tracker' })
  )
  expect(onSelect).toHaveBeenCalledWith('vezham-bug-tracker')
  view.unmount()
  render(<BotPicker {...props} />)
  await openPicker()
  const recent = within(screen.getByRole('group', { name: 'Recent' }))
  expect(recent.getAllByRole('menuitemradio')[0]).toBe(
    recent.getByRole('menuitemradio', { name: 'Bug Tracker' })
  )
  expect(
    screen.getAllByRole('menuitemradio', { name: 'Bug Tracker' })
  ).toHaveLength(1)
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(profiles.length)
  expect(
    screen.getByRole('searchbox', { name: 'Search assistants' })
  ).toHaveValue('')
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
