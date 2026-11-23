import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ComponentLinks } from './index'

vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ platform: 'web', _splat: 'components/button' })
}))

describe('component resource links', () => {
  it('shows the in-house source without an unrelated HeroUI chip', () => {
    render(
      <ComponentLinks
        library="react"
        links={{
          source:
            'https://github.com/vezham/vx-fe-pkgs/tree/HEAD/packages/core/react/src/lib-27/auth'
        }}
      />
    )
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com/vezham/')
    )
    expect(screen.queryByRole('link', { name: /HeroUI/ })).toBeNull()
  })

  it('labels an explicit in-house reference independently', () => {
    render(
      <ComponentLinks
        library="react"
        sourceUrl="https://example.com/reference"
      />
    )
    expect(screen.getByRole('link', { name: 'Reference' })).toHaveAttribute(
      'href',
      'https://example.com/reference'
    )
  })

  it.each([
    ['react-v3', 'HeroUI', 'https://heroui.com/docs/react/components/button'],
    [
      'react-pro-v3',
      'HeroUI Pro',
      'https://heroui.pro/docs/react/components/button'
    ]
  ] as const)('keeps the %s upstream resource', (library, label, href) => {
    render(
      <ComponentLinks
        library={library}
        links={{ source: 'button' }}
        sourceUrl={href}
      />
    )
    expect(screen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      href
    )
  })
})
