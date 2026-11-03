import {
  cleanup,
  fireEvent,
  render,
  screen,
  within
} from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { getTamizhiProfiles } from './profiles'
import { WelcomeSuggestions } from './welcome-suggestions'

beforeEach(() => {
  vi.spyOn(Math, 'random').mockReturnValue(0)
})

afterEach(() => {
  vi.restoreAllMocks()
  cleanup()
  localStorage.clear()
})

it('updates suggestions with the selected profile and sends the configured prompt', async () => {
  const profiles = getTamizhiProfiles()
  const crm = profiles.find(profile => profile.id === 'vezham-crm')
  const school = profiles.find(profile => profile.id === 'vezham-school-os')
  if (!crm || !school) throw new Error('Missing profile fixtures')
  const onSuggest = vi.fn()
  const props = {
    profiles,
    onSuggest,
    isDisabled: false
  }
  const view = render(<WelcomeSuggestions {...props} profile={crm} />)
  const sales = within(
    await screen.findByRole('group', { name: 'Suggestions for CRM' })
  )
  fireEvent.click(sales.getByRole('button', { name: 'Draft a follow-up' }))
  expect(onSuggest).toHaveBeenCalledWith(crm.suggestions?.[0].prompt)
  view.rerender(<WelcomeSuggestions {...props} profile={school} />)
  expect(screen.queryByRole('button', { name: 'Draft a follow-up' })).toBeNull()
  fireEvent.click(await screen.findByRole('button', { name: 'Plan a lesson' }))
  expect(onSuggest).toHaveBeenLastCalledWith(school.suggestions?.[0].prompt)
  view.rerender(<WelcomeSuggestions {...props} profile={school} isDisabled />)
  expect(screen.getByRole('button', { name: 'Plan a lesson' })).toBeDisabled()
  fireEvent.click(await screen.findByRole('button', { name: 'Plan a lesson' }))
  expect(onSuggest).toHaveBeenCalledTimes(2)
})

it('lets host profiles inherit default suggestions or hide them explicitly', async () => {
  const profiles = getTamizhiProfiles()
  const profile = {
    id: 'custom',
    name: 'Custom',
    persona: 'helper',
    outfit: 'rest'
  } as const
  const props = {
    profiles,
    onSuggest: vi.fn(),
    isDisabled: false
  }
  const view = render(<WelcomeSuggestions {...props} profile={profile} />)
  expect(
    await screen.findByRole('button', { name: 'Plan my day' })
  ).toBeTruthy()
  view.rerender(
    <WelcomeSuggestions {...props} profile={{ ...profile, suggestions: [] }} />
  )
  expect(
    screen.queryByRole('group', { name: 'Suggestions for Custom' })
  ).toBeNull()
})

it('limits embedded suggestions to two and standalone suggestions to three', async () => {
  const profile = {
    id: 'custom',
    name: 'Custom',
    persona: 'helper',
    outfit: 'rest',
    suggestions: [
      { title: 'First task', prompt: 'First prompt' },
      { title: 'Second task', prompt: 'Second prompt' },
      { title: 'Third task', prompt: 'Third prompt' }
    ]
  } as const
  const onSuggest = vi.fn()
  const view = render(
    <WelcomeSuggestions
      variant="embed"
      profile={profile}
      profiles={[profile]}
      onSuggest={onSuggest}
      isDisabled={false}
    />
  )
  expect(await screen.findAllByRole('button')).toHaveLength(2)
  fireEvent.click(screen.getByRole('button', { name: 'Second task' }))
  expect(onSuggest).toHaveBeenCalledWith('Second prompt')
  view.rerender(
    <WelcomeSuggestions
      variant="app"
      profile={profile}
      profiles={[profile]}
      onSuggest={onSuggest}
      isDisabled={false}
    />
  )
  expect(await screen.findAllByRole('button')).toHaveLength(3)
})

it('keeps a sampled set stable across rerenders and samples again on reopening', async () => {
  const profiles = getTamizhiProfiles()
  const profile = profiles[0]
  const props = { profile, profiles, isDisabled: false, onSuggest: vi.fn() }
  const view = render(<WelcomeSuggestions {...props} />)
  const initial = await screen.findAllByRole('button')
  expect(initial).toHaveLength(3)
  vi.mocked(Math.random).mockReturnValue(0.999)
  view.rerender(<WelcomeSuggestions {...props} onSuggest={vi.fn()} />)
  expect(screen.getAllByRole('button')).toEqual(initial)
  view.unmount()
  render(<WelcomeSuggestions {...props} />)
  const reopened = await screen.findAllByRole('button')
  expect(initial[0]).toHaveTextContent(profile.suggestions?.[0].title ?? '')
  expect(reopened[0]).toHaveTextContent(profile.suggestions?.[9].title ?? '')
  expect(new Set(reopened).size).toBe(3)
})
