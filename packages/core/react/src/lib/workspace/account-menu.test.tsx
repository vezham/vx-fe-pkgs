import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, it, vi } from 'vitest'

import { Footer } from '../components/panel/footer'
import { SettingsNavigationContext } from '../pages/settings/navigation'
import { WorkspaceProvider } from './index'

const actions = vi.hoisted(() => ({ logout: vi.fn() }))
vi.mock('../store/users/useUserStore', () => ({
  useUser: () => ({ clearUser: actions.logout })
}))

it.each([
  { id: '', name: '', guest: true },
  { id: 'user', name: 'Arya', guest: false }
])(
  'combines workspace and account actions (guest: $guest)',
  async ({ id, name, guest }) => {
    const openSettings = vi.fn()
    render(
      <WorkspaceProvider
        appId={`combined-menu-${guest}`}
        defaultName="Demo Workspace">
        <SettingsNavigationContext.Provider value={openSettings}>
          <Footer user={{ id, name }} />
        </SettingsNavigationContext.Provider>
      </WorkspaceProvider>
    )
    const trigger = screen.getByRole('button', {
      name: `Open ${name || 'Guest'} menu`
    })
    expect(
      screen.getAllByRole('button', { name: /^Open .* menu$/ })
    ).toHaveLength(1)
    fireEvent.click(trigger)
    await screen.findByRole('menuitem', {
      name: 'Choose workspace'
    })
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Choose workspace' })
      ).not.toHaveAttribute('aria-disabled', 'true')
    )
    fireEvent.click(screen.getByRole('menuitem', { name: 'Choose workspace' }))
    await screen.findByRole('menuitem', { name: 'Create workspace' })
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Create workspace' })
      ).not.toHaveAttribute('aria-disabled', 'true')
    )
    expect(
      screen.getByRole('menuitem', { name: 'Demo Workspace' })
    ).toBeVisible()
    if (guest) {
      expect(screen.getByRole('menuitem', { name: 'Available' })).toBeVisible()
      expect(
        screen.getByRole('menuitem', { name: 'Update your status' })
      ).toBeVisible()
      expect(
        screen.getByRole('button', { name: /Guest.*Available/ })
      ).toBeVisible()
      expect(screen.queryByRole('menuitem', { name: 'Logout' })).toBeNull()
    } else {
      expect(screen.getByRole('menuitem', { name: 'Logout' })).toBeVisible()
      expect(screen.getByRole('menuitem', { name: 'Available' })).toBeVisible()
    }
    fireEvent.click(screen.getByRole('menuitem', { name: 'Preferences' }))
    expect(openSettings).toHaveBeenCalledExactlyOnceWith('Account')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  }
)

it('retains the account menu in apps without workspace support', async () => {
  render(<Footer user={{ id: 'user', name: 'Arya' }} />)
  expect(
    screen.queryByRole('button', { name: /^Switch workspace:/ })
  ).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Open Arya menu' }))
  expect(
    await screen.findByRole('menuitem', { name: 'Preferences' })
  ).toBeVisible()
  expect(
    screen.queryByRole('menuitem', { name: 'Create workspace' })
  ).toBeNull()
})
