import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Auth } from '@vezham/react/auth'

import { DemoProvider } from './demo-provider'

const Preview = () => (
  <DemoProvider>
    <Auth.SignIn />
  </DemoProvider>
)

const getAnimations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)
beforeEach(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
})
afterEach(() => {
  if (getAnimations)
    Object.defineProperty(Element.prototype, 'getAnimations', getAnimations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
  vi.restoreAllMocks()
})

describe('auth documentation previews', () => {
  it('signs in through the isolated demo transport and opens security settings', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch')
    render(<Preview />)
    fireEvent.change(screen.getByLabelText('Email', { exact: true }), {
      target: { value: 'ada@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Password', { exact: true }), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }))
    expect(await screen.findByText('Change password')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Sign In' })).toBeNull()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('shows an inline sample failure and keeps the supplied credentials', async () => {
    render(<Preview />)
    const email = screen.getByLabelText('Email', { exact: true })
    fireEvent.change(email, { target: { value: 'other@example.com' } })
    fireEvent.change(screen.getByLabelText('Password', { exact: true }), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }))
    await waitFor(() =>
      expect(screen.getByText(/^Preview response:/)).toBeVisible()
    )
    expect(email).toHaveValue('other@example.com')
  })
})
