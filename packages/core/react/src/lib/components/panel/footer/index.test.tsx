import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'

import { SettingsNavigationContext } from '../../../pages/settings/navigation'
import { Footer } from './index'

vi.mock('../../../store/users/useUserStore', () => ({
  useUser: () => ({ clearUser: vi.fn() })
}))
vi.mock('./user-menu', () => ({
  UserMenu: ({
    onProfile,
    onPreferences
  }: {
    onProfile: () => void
    onPreferences: () => void
  }) => (
    <>
      <button onClick={onProfile}>Profile</button>
      <button onClick={onPreferences}>Preferences</button>
    </>
  )
}))

it.each(['Profile', 'Preferences'])(
  'opens Settings → Account from %s',
  action => {
    const openSettings = vi.fn()
    render(
      <SettingsNavigationContext.Provider value={openSettings}>
        <Footer user={{ id: 'user', name: 'Test user' }} />
      </SettingsNavigationContext.Provider>
    )
    fireEvent.click(screen.getByRole('button', { name: action }))
    expect(openSettings).toHaveBeenCalledExactlyOnceWith('Account')
  }
)
