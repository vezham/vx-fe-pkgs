import { fireEvent, render, screen, within } from '@testing-library/react'

import { Bento } from '../bento'
import { CardGallery } from '../card-gallery'

describe('content layouts', () => {
  it('composes Bento content, semantic headings, and resolved action links', () => {
    render(
      <Bento aria-label="Product features">
        <Bento.Card
          id="components"
          eyebrow="Developers"
          title="Components"
          headingAs="h3"
          description="Build with shared parts."
          action={
            <Bento.Action
              href="/cn/docs/ui/react"
              aria-label="Explore components"
              target="_blank"
              rel="noreferrer"
            />
          }>
          <div>Feature visual</div>
        </Bento.Card>
      </Bento>
    )
    expect(
      screen.getByRole('heading', { level: 3, name: 'Components' })
    ).toBeVisible()
    expect(screen.getByText('Build with shared parts.')).toBeVisible()
    expect(screen.getByText('Feature visual')).toBeVisible()
    const action = screen.getByRole('link', { name: 'Explore components' })
    expect(action).toHaveAttribute('href', '/cn/docs/ui/react')
    expect(action).toHaveAttribute('target', '_blank')
    expect(action.closest('#components')).toBeTruthy()
  })

  it('preserves interactive content when a Bento card has no overlay action', () => {
    const onClick = vi.fn()
    render(
      <Bento.Card title="Settings">
        <button onClick={onClick}>Configure</button>
      </Bento.Card>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Configure' }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('renders labeled gallery groups, stacked tiles, and a focusable scroll region', () => {
    render(
      <CardGallery aria-label="Explore products" scrollLabel="Product cards">
        <CardGallery.Group aria-label="Featured">
          <CardGallery.Card title="Components" />
        </CardGallery.Group>
        <CardGallery.Group variant="tiles" aria-label="Resources">
          <CardGallery.Card variant="tile" title="Guides" />
          <CardGallery.Card
            variant="tile"
            title="Tokens"
            action={
              <CardGallery.Action href="/tokens" aria-label="Open tokens" />
            }
          />
        </CardGallery.Group>
      </CardGallery>
    )
    const gallery = screen.getByRole('navigation', { name: 'Explore products' })
    expect(
      within(gallery).getByRole('region', { name: 'Product cards' })
    ).toHaveAttribute('tabindex', '0')
    expect(within(gallery).getAllByRole('listitem')).toHaveLength(2)
    const resources = within(gallery).getByRole('listitem', {
      name: 'Resources'
    })
    expect(
      within(resources).getByRole('heading', { name: 'Guides' })
    ).toBeVisible()
    expect(
      within(resources).getByRole('link', { name: 'Open tokens' })
    ).toHaveAttribute('href', '/tokens')
  })
})
