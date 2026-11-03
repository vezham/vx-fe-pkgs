import {
  cleanup,
  fireEvent,
  render,
  screen,
  within
} from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { getTamizhiProfiles } from './profiles'
import { WelcomeSuggestions } from './welcome-suggestions'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

it('updates suggestions with the selected profile and sends the configured prompt', () => {
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
    screen.getByRole('group', { name: 'Suggestions for CRM' })
  )
  fireEvent.click(sales.getByRole('button', { name: 'Draft a follow-up' }))
  expect(onSuggest).toHaveBeenCalledWith(crm.suggestions?.[0].prompt)
  view.rerender(<WelcomeSuggestions {...props} profile={school} />)
  expect(screen.queryByRole('button', { name: 'Draft a follow-up' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Plan a lesson' }))
  expect(onSuggest).toHaveBeenLastCalledWith(school.suggestions?.[0].prompt)
  view.rerender(<WelcomeSuggestions {...props} profile={school} isDisabled />)
  expect(screen.getByRole('button', { name: 'Plan a lesson' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: 'Plan a lesson' }))
  expect(onSuggest).toHaveBeenCalledTimes(2)
})

it('lets host profiles inherit default suggestions or hide them explicitly', () => {
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
  expect(screen.getByRole('button', { name: 'Plan my day' })).toBeTruthy()
  view.rerender(
    <WelcomeSuggestions {...props} profile={{ ...profile, suggestions: [] }} />
  )
  expect(
    screen.queryByRole('group', { name: 'Suggestions for Custom' })
  ).toBeNull()
})

it('limits embedded suggestions to two without limiting standalone suggestions', () => {
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
  expect(screen.getAllByRole('button')).toHaveLength(2)
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
  expect(screen.getAllByRole('button')).toHaveLength(3)
})
